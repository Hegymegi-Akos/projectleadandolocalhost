DROP DATABASE IF EXISTS kisallat_webshop;
CREATE DATABASE kisallat_webshop CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE kisallat_webshop;

SET NAMES utf8mb4;

-- --------------------------------------------------------
-- USERS
-- default passwords for seeded users: password
-- --------------------------------------------------------
CREATE TABLE felhasznalok (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  felhasznalonev VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  jelszo_hash VARCHAR(255) NOT NULL,
  keresztnev VARCHAR(100) DEFAULT NULL,
  vezeteknev VARCHAR(100) DEFAULT NULL,
  telefon VARCHAR(30) DEFAULT NULL,
  iranyitoszam VARCHAR(20) DEFAULT NULL,
  varos VARCHAR(100) DEFAULT NULL,
  cim TEXT DEFAULT NULL,
  admin TINYINT(1) NOT NULL DEFAULT 0,
  tiltva TINYINT(1) NOT NULL DEFAULT 0,
  tiltas_oka VARCHAR(255) DEFAULT NULL,
  email_megerositve TINYINT(1) NOT NULL DEFAULT 0,
  regisztralt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  frissitve TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_felhasznalonev (felhasznalonev),
  UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO felhasznalok
(felhasznalonev, email, jelszo_hash, keresztnev, vezeteknev, telefon, iranyitoszam, varos, cim, admin, tiltva, tiltas_oka, email_megerositve)
VALUES
('admin', 'admin@kisallat.local', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', NULL, NULL, 'Budapest', 'Admin utca 1.', 1, 0, NULL, 1),
('demo', 'demo@kisallat.local', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Demo', 'User', '+36301111111', '1111', 'Budapest', 'Demo utca 2.', 0, 0, NULL, 1);

-- --------------------------------------------------------
-- CATEGORIES
-- --------------------------------------------------------
CREATE TABLE kategoriak (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(30) NOT NULL,
  nev VARCHAR(50) NOT NULL,
  kep VARCHAR(255) DEFAULT NULL,
  sorrend TINYINT DEFAULT 0,
  UNIQUE KEY uq_kategoria_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO kategoriak (id, slug, nev, kep, sorrend) VALUES
(1, 'kutya', 'Kutya', 'img/kutya.png', 1),
(2, 'macska', 'Macska', 'img/macska.png', 2),
(3, 'ragcsalo', 'Ragcsalo', 'img/ragcsalo.png', 3),
(4, 'hullo', 'Hullo', 'img/hullo.png', 4),
(5, 'madar', 'Madar', 'img/madar.png', 5),
(6, 'hal', 'Hal', 'img/hal.png', 6);

CREATE TABLE alkategoriak (
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  kategoria_id TINYINT UNSIGNED NOT NULL,
  slug VARCHAR(50) NOT NULL,
  nev VARCHAR(100) NOT NULL,
  kep VARCHAR(255) DEFAULT NULL,
  sorrend TINYINT DEFAULT 0,
  UNIQUE KEY uq_alkategoria_slug (kategoria_id, slug),
  KEY idx_alkat_kategoria (kategoria_id),
  CONSTRAINT fk_alkat_kategoria FOREIGN KEY (kategoria_id) REFERENCES kategoriak(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO alkategoriak (id, kategoria_id, slug, nev, kep, sorrend) VALUES
(1,1,'poraz','Porazok',NULL,1),
(2,1,'talak','Kutya talak',NULL,2),
(3,1,'hamok','Hamok',NULL,3),
(4,1,'bolha','Bolhairto szerek',NULL,4),
(5,1,'nyakorv','Nyakorvek',NULL,5),
(6,1,'tapok','Kutya tapok',NULL,6),
(7,2,'jatek','Jatekok',NULL,1),
(8,2,'talak','Macska talak',NULL,2),
(9,2,'tapok','Macska tapok',NULL,3),
(10,2,'bolha','Bolhairto szerek',NULL,4),
(11,2,'nyakorv','Nyakorvek',NULL,5),
(12,2,'tapm','Macska tapok premium',NULL,6),
(13,3,'tap','Ragcsalo tapok',NULL,1),
(14,3,'ketrec','Ketrec es felszerelesek',NULL,2),
(15,3,'alom','Almok',NULL,3),
(16,3,'jatek','Jatekok',NULL,4),
(17,4,'tap','Hullo tapok',NULL,1),
(18,4,'terrarium','Terrarium es felszerelesek',NULL,2),
(19,4,'lampa','Melegito lampak',NULL,3),
(20,5,'tap','Madar tapok',NULL,1),
(21,5,'ketrec','Kalitkak',NULL,2),
(22,5,'jatek','Jatekok',NULL,3),
(23,6,'tap','Hal tapok',NULL,1),
(24,6,'akvariumok','Akvarium es felszerelesek',NULL,2),
(25,6,'szuro','Szurok es tartozekok',NULL,3);

-- --------------------------------------------------------
-- PRODUCTS
-- --------------------------------------------------------
CREATE TABLE termekek (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  alkategoria_id SMALLINT UNSIGNED NOT NULL,
  nev VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  leiras TEXT DEFAULT NULL,
  rovid_leiras VARCHAR(500) DEFAULT NULL,
  ar INT UNSIGNED NOT NULL,
  akcios_ar INT UNSIGNED DEFAULT NULL,
  keszlet INT UNSIGNED NOT NULL DEFAULT 999,
  fo_kep VARCHAR(255) NOT NULL,
  tobbi_kep LONGTEXT DEFAULT NULL,
  aktiv TINYINT(1) NOT NULL DEFAULT 1,
  letrehozva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  frissitve TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_termek_slug (slug),
  KEY idx_termek_alkategoria (alkategoria_id),
  CONSTRAINT fk_termek_alkategoria FOREIGN KEY (alkategoria_id) REFERENCES alkategoriak(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO termekek (alkategoria_id, nev, slug, leiras, rovid_leiras, ar, akcios_ar, keszlet, fo_kep, tobbi_kep, aktiv) VALUES
(6, 'Royal Canin Mini Adult', 'royal-canin-mini-adult', 'Premium kutya tap kistestu felnott kutyaknak.', 'Premium kutyatap kistestu kutyaknak', 24990, 22490, 47, 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', '[]', 1),
(1, 'Rukka Kotelporaz', 'rukka-kotelporaz', 'Eros, allithato hosszusagu poraz.', 'Allithato poraz nagy kutyaknak', 8990, NULL, 37, 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', '[]', 1),
(9, 'Felix Fantastic', 'felix-fantastic', 'Nedves macska tap valtozatos izekben.', 'Nedves macskatop valogatos cicaknak', 3490, NULL, 199, 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400', '[]', 1),
(13, 'Ragcsalo Mix Tap', 'ragcsalo-mix-tap', 'Komplex ragcsalo tap nyulaknak es horcsogoknek.', 'Ragcsalo tap mindennapra', 2990, 2490, 120, 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400', '[]', 1),
(18, 'Terrarium Starter Kit', 'terrarium-starter-kit', 'Alap terrarium csomag hulloknek.', 'Terrarium kezdokeszlet', 19990, NULL, 20, 'https://images.unsplash.com/photo-1618331835717-801e976710b2?w=400', '[]', 1),
(21, 'Madar Kalitka M', 'madar-kalitka-m', 'Kozepes meretu kalitka hullamos papagajhoz.', 'Kalitka mindennapi hasznalatra', 15990, 13990, 12, 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400', '[]', 1),
(23, 'Tropical Hal Tap', 'tropical-hal-tap', 'Pehelytap diszhalaknak.', 'Altalanos pehelytap', 2490, NULL, 85, 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=400', '[]', 1),
(24, 'Akvarium Szuro 300', 'akvarium-szuro-300', 'Belso szuro kisebb akvariumhoz.', 'Csendes belso szuro', 8990, 7990, 18, 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', '[]', 1);

-- --------------------------------------------------------
-- REVIEWS
-- --------------------------------------------------------
CREATE TABLE termek_velemenyek (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  termek_id INT UNSIGNED NOT NULL,
  felhasznalo_id BIGINT UNSIGNED DEFAULT NULL,
  vendeg_nev VARCHAR(100) DEFAULT 'Nevtelen vasarlo',
  ertekeles TINYINT UNSIGNED NOT NULL,
  cim VARCHAR(150) NOT NULL,
  velemeny TEXT NOT NULL,
  segitett_igen INT UNSIGNED NOT NULL DEFAULT 0,
  segitett_nem INT UNSIGNED NOT NULL DEFAULT 0,
  ellenorzott TINYINT(1) NOT NULL DEFAULT 0,
  elfogadva TINYINT(1) NOT NULL DEFAULT 1,
  datum TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_review_termek (termek_id),
  KEY idx_review_user (felhasznalo_id),
  KEY idx_review_ertekeles (ertekeles),
  CONSTRAINT fk_review_termek FOREIGN KEY (termek_id) REFERENCES termekek(id) ON DELETE CASCADE,
  CONSTRAINT fk_review_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE SET NULL,
  CONSTRAINT chk_ertekeles CHECK (ertekeles IN (1,2,3,4,5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO termek_velemenyek (termek_id, felhasznalo_id, vendeg_nev, ertekeles, cim, velemeny, ellenorzott, elfogadva)
VALUES (1, 2, 'Demo User', 5, 'Nagyon jo termek', 'A kutyam nagyon szereti ezt a tapot.', 1, 1);

-- --------------------------------------------------------
-- CART AND ORDERS
-- --------------------------------------------------------
CREATE TABLE kosar (
  felhasznalo_id BIGINT UNSIGNED NOT NULL,
  termek_id INT UNSIGNED NOT NULL,
  mennyiseg SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  hozzaadva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (felhasznalo_id, termek_id),
  KEY idx_kosar_termek (termek_id),
  CONSTRAINT fk_kosar_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE CASCADE,
  CONSTRAINT fk_kosar_termek FOREIGN KEY (termek_id) REFERENCES termekek(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE rendelesek (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id BIGINT UNSIGNED NOT NULL,
  rendeles_szam VARCHAR(30) NOT NULL,
  statusz ENUM('uj','feldolgozas','fizetve','kesz','storno') DEFAULT 'uj',
  osszeg INT UNSIGNED NOT NULL,
  szallitasi_mod VARCHAR(100) DEFAULT NULL,
  fizetesi_mod VARCHAR(100) DEFAULT NULL,
  megjegyzes TEXT DEFAULT NULL,
  szallitasi_nev VARCHAR(200) DEFAULT NULL,
  szallitasi_cim TEXT DEFAULT NULL,
  szallitasi_varos VARCHAR(100) DEFAULT NULL,
  szallitasi_irsz VARCHAR(20) DEFAULT NULL,
  letrehozva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  frissitve TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_rendeles_szam (rendeles_szam),
  KEY idx_rendeles_user (felhasznalo_id),
  CONSTRAINT fk_rendeles_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE rendeles_tetelek (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rendeles_id BIGINT UNSIGNED NOT NULL,
  termek_id INT UNSIGNED NOT NULL,
  termek_nev VARCHAR(255) NOT NULL,
  ar INT UNSIGNED NOT NULL,
  mennyiseg SMALLINT UNSIGNED NOT NULL,
  KEY idx_tetel_rendeles (rendeles_id),
  KEY idx_tetel_termek (termek_id),
  CONSTRAINT fk_tetel_rendeles FOREIGN KEY (rendeles_id) REFERENCES rendelesek(id) ON DELETE CASCADE,
  CONSTRAINT fk_tetel_termek FOREIGN KEY (termek_id) REFERENCES termekek(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------
-- COUPONS
-- --------------------------------------------------------
CREATE TABLE kuponok (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kod VARCHAR(50) NOT NULL,
  tipus ENUM('szazalek','fix') NOT NULL DEFAULT 'szazalek',
  ertek DECIMAL(10,2) NOT NULL,
  min_osszeg DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  felhasznalasi_limit INT DEFAULT NULL,
  felhasznalva INT NOT NULL DEFAULT 0,
  felhasznalo_id BIGINT UNSIGNED DEFAULT NULL,
  ervenyes_kezdet DATETIME DEFAULT CURRENT_TIMESTAMP,
  ervenyes_veg DATETIME DEFAULT NULL,
  aktiv TINYINT(1) NOT NULL DEFAULT 1,
  letrehozva DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_kupon_kod (kod),
  KEY idx_kupon_user (felhasznalo_id),
  CONSTRAINT fk_kupon_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO kuponok (kod, tipus, ertek, min_osszeg, felhasznalasi_limit, felhasznalva, felhasznalo_id, ervenyes_kezdet, ervenyes_veg, aktiv)
VALUES ('HUSEG05', 'szazalek', 0.50, 0.00, NULL, 0, NULL, NOW(), DATE_ADD(NOW(), INTERVAL 5 YEAR), 1);

CREATE TABLE kupon_hasznalatok (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kupon_id INT NOT NULL,
  felhasznalo_id BIGINT UNSIGNED NOT NULL,
  rendeles_id BIGINT UNSIGNED DEFAULT NULL,
  hasznalva DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_kh_kupon (kupon_id),
  KEY idx_kh_user (felhasznalo_id),
  KEY idx_kh_rendeles (rendeles_id),
  CONSTRAINT fk_kh_kupon FOREIGN KEY (kupon_id) REFERENCES kuponok(id) ON DELETE CASCADE,
  CONSTRAINT fk_kh_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE CASCADE,
  CONSTRAINT fk_kh_rendeles FOREIGN KEY (rendeles_id) REFERENCES rendelesek(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- PASSWORD RESET
-- --------------------------------------------------------
CREATE TABLE jelszo_reset (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id BIGINT UNSIGNED NOT NULL,
  kod VARCHAR(6) NOT NULL,
  lejar DATETIME NOT NULL,
  felhasznalva TINYINT(1) NOT NULL DEFAULT 0,
  letrehozva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_reset_user (felhasznalo_id),
  KEY idx_reset_code (kod),
  CONSTRAINT fk_reset_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------
-- WALL POSTS AND BANNED WORDS
-- --------------------------------------------------------
CREATE TABLE fal_bejegyzesek (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  felhasznalo_id BIGINT UNSIGNED NOT NULL,
  szoveg TEXT NOT NULL,
  letrehozva DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY idx_fal_user (felhasznalo_id),
  CONSTRAINT fk_fal_user FOREIGN KEY (felhasznalo_id) REFERENCES felhasznalok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO fal_bejegyzesek (felhasznalo_id, szoveg)
VALUES (1, 'Udvozlet! Ez egy alap bejegyzes.');

CREATE TABLE tiltott_szavak (
  id INT AUTO_INCREMENT PRIMARY KEY,
  szo VARCHAR(100) NOT NULL,
  hozzaadva DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_tiltott_szo (szo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO tiltott_szavak (szo) VALUES ('spam'), ('scam'), ('fake'), ('reklam');
