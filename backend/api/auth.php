<?php
/**
 * Autentikáció API - Regisztráció, Bejelentkezés, Felhasználói adatok
 */

require_once '../config/database.php';
require_once '../config/cors.php';
require_once '../config/jwt.php';

$database = new Database();
$db = $database->getConnection();

ensureUserBanColumns($db);

$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];

// Endpoint routing
if (strpos($request_uri, '/register') !== false && $method === 'POST') {
    register($db);
} elseif (strpos($request_uri, '/login') !== false && $method === 'POST') {
    login($db);
} elseif (strpos($request_uri, '/me') !== false && $method === 'GET') {
    getCurrentUserInfo($db);
} elseif (strpos($request_uri, '/me') !== false && ($method === 'PUT' || $method === 'POST')) {
    updateCurrentUser($db);
} elseif (strpos($request_uri, '/check-auth') !== false && $method === 'GET') {
    checkAuth();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint nem található']);
}

/**
 * Regisztráció
 */
function register($db) {
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->felhasznalonev) || empty($data->email) || empty($data->jelszo)) {
        http_response_code(400);
        echo json_encode(['message' => 'Felhasználónév, email és jelszó kötelező']);
        return;
    }

    // Ellenőrzés: létezik-e már a felhasználónév vagy email
    $query = "SELECT id FROM felhasznalok WHERE felhasznalonev = :felhasznalonev OR email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':felhasznalonev', $data->felhasznalonev);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['message' => 'A felhasználónév vagy email már foglalt']);
        return;
    }

    // Jelszó hash
    $jelszo_hash = password_hash($data->jelszo, PASSWORD_BCRYPT);

    // Új felhasználó beszúrása
    $query = "INSERT INTO felhasznalok (felhasznalonev, email, jelszo_hash, keresztnev, vezeteknev, telefon, iranyitoszam, varos, cim) 
              VALUES (:felhasznalonev, :email, :jelszo_hash, :keresztnev, :vezeteknev, :telefon, :iranyitoszam, :varos, :cim)";
    
    $stmt = $db->prepare($query);
    // bindValue: nem kell referencia (&), biztonságosabb opcionális mezőknél
    $stmt->bindValue(':felhasznalonev', $data->felhasznalonev);
    $stmt->bindValue(':email', $data->email);
    $stmt->bindValue(':jelszo_hash', $jelszo_hash);
    $stmt->bindValue(':keresztnev', $data->keresztnev ?? null);
    $stmt->bindValue(':vezeteknev', $data->vezeteknev ?? null);
    $stmt->bindValue(':telefon', $data->telefon ?? null);
    $stmt->bindValue(':iranyitoszam', $data->iranyitoszam ?? null);
    $stmt->bindValue(':varos', $data->varos ?? null);
    $stmt->bindValue(':cim', $data->cim ?? null);

    if ($stmt->execute()) {
        $user_id = $db->lastInsertId();
        $token = generateJWT($user_id, $data->felhasznalonev, 0);

        http_response_code(201);
        echo json_encode([
            'message' => 'Sikeres regisztráció',
            'token' => $token,
            'user' => [
                'id' => $user_id,
                'felhasznalonev' => $data->felhasznalonev,
                'email' => $data->email,
                'admin' => 0
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Regisztráció sikertelen']);
    }
}

function ensureUserBanColumns($db) {
    $hasTiltva = false;
    $hasTiltasOka = false;

    $stmt = $db->query("SHOW COLUMNS FROM felhasznalok LIKE 'tiltva'");
    $hasTiltva = (bool)$stmt->fetch();

    $stmt = $db->query("SHOW COLUMNS FROM felhasznalok LIKE 'tiltas_oka'");
    $hasTiltasOka = (bool)$stmt->fetch();

    if (!$hasTiltva) {
        $db->exec("ALTER TABLE felhasznalok ADD COLUMN tiltva TINYINT(1) NOT NULL DEFAULT 0 AFTER admin");
    }

    if (!$hasTiltasOka) {
        $db->exec("ALTER TABLE felhasznalok ADD COLUMN tiltas_oka VARCHAR(255) NULL AFTER tiltva");
    }
}

/**
 * Bejelentkezés
 */
function login($db) {
    $data = json_decode(file_get_contents("php://input"));

    $identifier = trim((string)($data->identifier ?? $data->felhasznalonev ?? ''));
    $password = (string)($data->password ?? $data->jelszo ?? '');

    if ($identifier === '' || $password === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Azonosító és jelszó kötelező']);
        return;
    }

    // Felhasználó keresése
    $query = "SELECT id, felhasznalonev, email, jelszo_hash, admin, tiltva, tiltas_oka, keresztnev, vezeteknev 
              FROM felhasznalok 
              WHERE felhasznalonev = :identifier OR email = :identifier";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':identifier', $identifier);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        http_response_code(401);
        echo json_encode(['message' => 'Hibás felhasználónév vagy jelszó']);
        return;
    }

    $user = $stmt->fetch();

    // Jelszó ellenőrzése
    if (!password_verify($password, $user['jelszo_hash'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Hibás felhasználónév vagy jelszó']);
        return;
    }

    if (!empty($user['tiltva'])) {
        http_response_code(403);
        $reason = trim((string)($user['tiltas_oka'] ?? ''));
        $msg = 'A fiókod jelenleg tiltva van.';
        if ($reason !== '') {
            $msg .= ' Ok: ' . $reason;
        }
        echo json_encode(['message' => $msg]);
        return;
    }

    // JWT token generálása
    $token = generateJWT($user['id'], $user['felhasznalonev'], $user['admin']);

    echo json_encode([
        'message' => 'Sikeres bejelentkezés',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'felhasznalonev' => $user['felhasznalonev'],
            'email' => $user['email'],
            'admin' => $user['admin'],
            'keresztnev' => $user['keresztnev'],
            'vezeteknev' => $user['vezeteknev']
        ]
    ]);
}

/**
 * Aktuális felhasználó adatainak lekérése
 */
function getCurrentUserInfo($db) {
    $user = requireAuth();

    $query = "SELECT id, felhasznalonev, email, keresztnev, vezeteknev, telefon, iranyitoszam, varos, cim, admin, regisztralt 
              FROM felhasznalok 
              WHERE id = :id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $user['user_id']);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Felhasználó nem található']);
        return;
    }

    echo json_encode($stmt->fetch());
}

/**
 * Aktuális felhasználó adatainak frissítése
 */
function updateCurrentUser($db) {
    $user = requireAuth();
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) { http_response_code(400); echo json_encode(['message' => 'Érvénytelen adat']); return; }

    $allowed = ['keresztnev', 'vezeteknev', 'telefon', 'iranyitoszam', 'varos', 'cim', 'email'];
    $set = [];
    $params = [':id' => $user['user_id']];
    foreach ($allowed as $f) {
        if (array_key_exists($f, $data)) {
            $val = is_string($data[$f]) ? trim($data[$f]) : $data[$f];
            if ($f === 'telefon' && $val !== '' && !preg_match('/^\+?[0-9 ]{7,15}$/', $val)) {
                http_response_code(400); echo json_encode(['message' => 'Érvénytelen telefonszám formátum']); return;
            }
            if ($f === 'iranyitoszam' && $val !== '' && !preg_match('/^[0-9]{4}$/', $val)) {
                http_response_code(400); echo json_encode(['message' => 'Az irányítószám 4 számjegyből álljon']); return;
            }
            if (($f === 'keresztnev' || $f === 'vezeteknev') && mb_strlen((string)$val) > 20) {
                http_response_code(400); echo json_encode(['message' => 'A vezetéknév/keresztnév maximum 20 karakter']); return;
            }
            $set[] = "$f = :$f";
            $params[":$f"] = $val;
        }
    }
    if (!$set) { http_response_code(400); echo json_encode(['message' => 'Nincs frissítendő mező']); return; }

    if (!empty($data['jelszo'])) {
        if (strlen($data['jelszo']) < 6) { http_response_code(400); echo json_encode(['message' => 'A jelszó legalább 6 karakter']); return; }
        $set[] = 'jelszo_hash = :jelszo_hash';
        $params[':jelszo_hash'] = password_hash($data['jelszo'], PASSWORD_BCRYPT);
    }

    $sql = "UPDATE felhasznalok SET " . implode(', ', $set) . " WHERE id = :id";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $stmt = $db->prepare("SELECT id, felhasznalonev, email, keresztnev, vezeteknev, telefon, iranyitoszam, varos, cim, admin, regisztralt FROM felhasznalok WHERE id = :id");
    $stmt->execute([':id' => $user['user_id']]);
    echo json_encode(['message' => 'Adatok frissítve', 'user' => $stmt->fetch()]);
}

/**
 * Autentikáció ellenőrzése
 */
function checkAuth() {
    $user = getCurrentUser();
    
    if ($user) {
        echo json_encode([
            'authenticated' => true,
            'user' => $user
        ]);
    } else {
        echo json_encode(['authenticated' => false]);
    }
}
