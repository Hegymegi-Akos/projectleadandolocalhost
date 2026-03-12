<?php
/**
 * Admin API - Felhasználók kezelése
 */

require_once '../../config/database.php';
require_once '../../config/cors.php';
require_once '../../config/jwt.php';

$database = new Database();
$db = $database->getConnection();

ensureUserBanColumns($db);

$method = $_SERVER['REQUEST_METHOD'];

// CORS preflight
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Admin jogosultság ellenőrzése
$admin_user = requireAdmin();

// Routing
if ($method === 'GET') {
    getAllUsers($db);
} elseif ($method === 'POST') {
    handleUserUpdate($db, $admin_user);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Metódus nem engedélyezett']);
}

/**
 * Egyszerű migráció: tiltás mezők létrehozása, ha hiányoznak
 */
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

function handleUserUpdate($db, $admin_user) {
    $data = json_decode(file_get_contents('php://input'));

    if (!$data || empty($data->id)) {
        http_response_code(400);
        echo json_encode(['message' => 'Hiányzó felhasználó ID']);
        return;
    }

    $methodOverride = strtoupper(trim((string)($data->_method ?? '')));
    if ($methodOverride !== 'PUT') {
        http_response_code(400);
        echo json_encode(['message' => 'Csak _method=PUT támogatott ennél a végpontnál']);
        return;
    }

    updateUserBanStatus($db, $admin_user, (int)$data->id, $data);
}

function updateUserBanStatus($db, $admin_user, $userId, $data) {
    if (!isset($data->tiltva)) {
        http_response_code(400);
        echo json_encode(['message' => 'Hiányzik a tiltva mező']);
        return;
    }

    $tiltva = (int)((bool)$data->tiltva);
    $tiltasOka = isset($data->tiltas_oka) ? trim((string)$data->tiltas_oka) : null;
    if ($tiltasOka === '') {
        $tiltasOka = null;
    }

    if ((int)$admin_user['user_id'] === $userId && $tiltva === 1) {
        http_response_code(400);
        echo json_encode(['message' => 'Saját magadat nem tilthatod ki']);
        return;
    }

    $exists = $db->prepare('SELECT id FROM felhasznalok WHERE id = :id');
    $exists->bindValue(':id', $userId, PDO::PARAM_INT);
    $exists->execute();
    if ($exists->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Felhasználó nem található']);
        return;
    }

    $query = "UPDATE felhasznalok
              SET tiltva = :tiltva,
                  tiltas_oka = :tiltas_oka
              WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':tiltva', $tiltva, PDO::PARAM_INT);
    $stmt->bindValue(':tiltas_oka', $tiltasOka, $tiltasOka === null ? PDO::PARAM_NULL : PDO::PARAM_STR);
    $stmt->bindValue(':id', $userId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode([
            'message' => $tiltva ? 'Felhasználó sikeresen kitiltva' : 'Felhasználó sikeresen visszaállítva',
            'id' => $userId,
            'tiltva' => $tiltva,
            'tiltas_oka' => $tiltasOka
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Felhasználó frissítése sikertelen']);
    }
}

/**
 * Összes felhasználó listázása
 */
function getAllUsers($db) {
    $query = "SELECT 
                id,
                felhasznalonev,
                email,
                keresztnev,
                vezeteknev,
                telefon,
                iranyitoszam,
                varos,
                cim,
                admin,
                tiltva,
                tiltas_oka,
                email_megerositve,
                regisztralt,
                frissitve
              FROM felhasznalok 
              ORDER BY id DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $users = $stmt->fetchAll();
    
    echo json_encode($users);
}
