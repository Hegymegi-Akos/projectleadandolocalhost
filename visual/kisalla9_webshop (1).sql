-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2026. Már 22. 17:23
-- Kiszolgáló verziója: 10.11.16-MariaDB-cll-lve
-- PHP verzió: 8.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `kisalla9_webshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `alkategoriak`
--

CREATE TABLE `alkategoriak` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `kategoria_id` tinyint(3) UNSIGNED NOT NULL,
  `slug` varchar(50) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `sorrend` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `alkategoriak`
--

INSERT INTO `alkategoriak` (`id`, `kategoria_id`, `slug`, `nev`, `kep`, `sorrend`) VALUES
(1, 1, 'poraz', 'Pórázok', NULL, 1),
(2, 1, 'tal', 'Tálak', NULL, 2),
(3, 1, 'ham', 'Hámok', NULL, 3),
(4, 1, 'bolha', 'Bolha- és kullancsírtók', NULL, 4),
(5, 1, 'nyakorv', 'Nyakörvek', NULL, 5),
(6, 1, 'tap', 'Tápok', NULL, 6),
(7, 2, 'jatek', 'Játékok', NULL, 1),
(8, 2, 'tal', 'Tálak', NULL, 2),
(10, 2, 'bolha', 'Bolhaírtó szerek', NULL, 4),
(12, 2, 'tapm', 'Macska tápok', NULL, 6),
(13, 3, 'tap', 'Rágcsáló tápok', NULL, 1),
(14, 3, 'ketrec', 'Ketrec és felszerelések', NULL, 2),
(15, 3, 'alom', 'Almok', NULL, 3),
(16, 3, 'jatek', 'Játékok', NULL, 4),
(17, 4, 'tap', 'Hüllő tápok', NULL, 1),
(18, 4, 'terrarium', 'Terrárium és felszerelések', NULL, 2),
(19, 4, 'lampa', 'Melegítő lámpák', NULL, 3),
(20, 5, 'tap', 'Madár tápok', NULL, 1),
(21, 5, 'ketrec', 'Kalitkák', NULL, 2),
(22, 5, 'jatek', 'Játékok', NULL, 3),
(23, 6, 'tap', 'Hal tápok', NULL, 1),
(24, 6, 'akvariumok', 'Akvárium és felszerelések', NULL, 2),
(25, 6, 'szuro', 'Szűrők és tartozékok', NULL, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fal_bejegyzesek`
--

CREATE TABLE `fal_bejegyzesek` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `szoveg` text NOT NULL,
  `letrehozva` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fal_bejegyzesek`
--

INSERT INTO `fal_bejegyzesek` (`id`, `felhasznalo_id`, `szoveg`, `letrehozva`) VALUES
(1, 9, 'Ez egy teszt bejegyzes a falon!', '2026-01-01 19:38:44'),
(2, 9, 'Remek üzlet csak ajánlani tudom.', '2026-01-01 19:43:21');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo_hash` varchar(255) NOT NULL,
  `keresztnev` varchar(100) DEFAULT NULL,
  `vezeteknev` varchar(100) DEFAULT NULL,
  `telefon` varchar(30) DEFAULT NULL,
  `iranyitoszam` varchar(20) DEFAULT NULL,
  `varos` varchar(100) DEFAULT NULL,
  `cim` text DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `tiltva` tinyint(1) NOT NULL DEFAULT 0,
  `tiltas_oka` varchar(255) DEFAULT NULL,
  `email_megerositve` tinyint(1) DEFAULT 0,
  `regisztralt` timestamp NOT NULL DEFAULT current_timestamp(),
  `frissitve` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `felhasznalonev`, `email`, `jelszo_hash`, `keresztnev`, `vezeteknev`, `telefon`, `iranyitoszam`, `varos`, `cim`, `admin`, `tiltva`, `tiltas_oka`, `email_megerositve`, `regisztralt`, `frissitve`) VALUES
(1, 'teszt_user_999', 'teszt999@example.com', '$2y$10$CIYycBAxXpK5sEm2nizFR.hw6j/SaPiQNt3eYe/Y2PMnwXbNVzN3.', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, '2025-12-27 19:39:17', '2026-03-12 20:21:04'),
(2, 'e2e_20251228_135002', 'e2e_20251228_135002@example.com', '$2y$10$CIYycBAxXpK5sEm2nizFR.hw6j/SaPiQNt3eYe/Y2PMnwXbNVzN3.', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, '2025-12-28 12:50:02', '2026-03-17 20:39:37'),
(5, 'order_20251228_135749', 'order_20251228_135749@example.com', '$2y$10$CIYycBAxXpK5sEm2nizFR.hw6j/SaPiQNt3eYe/Y2PMnwXbNVzN3.', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, 0, '2025-12-28 12:57:49', '2026-03-12 20:21:04'),
(9, 'akos@akos.hu', 'akos@akos.hu', '$2y$10$CIYycBAxXpK5sEm2nizFR.hw6j/SaPiQNt3eYe/Y2PMnwXbNVzN3.', 'akos@akos.hu', 'akos@akos.hu', 'akos@akos.hu', 'akos@akos.hu', 'akos@akos.hu', 'akos@akos.hu', 1, 0, NULL, 0, '2025-12-28 15:14:51', '2026-03-12 20:21:04'),
(10, 'test_admin_20260101143216', 'test_admin_20260101143216@test.hu', '$2y$10$CIYycBAxXpK5sEm2nizFR.hw6j/SaPiQNt3eYe/Y2PMnwXbNVzN3.', 'Test', 'Admin', NULL, NULL, NULL, NULL, 0, 0, NULL, 0, '2026-01-01 13:32:16', '2026-03-12 20:21:04'),
(16, 'nubsos123@gmail.com', 'nubsos123@gmail.com', '$2y$10$yuuu/4xRzLCZDVuBnZZV6eT.Zfv9tT1qOPN64StwuG5FC4.9kNVFS', 'Lajos', 'Lajos', '06701234567', 'qq', 'qq', 'qq', 0, 0, NULL, 0, '2026-03-18 06:47:22', '2026-03-18 06:49:02'),
(17, 'DominikaProba', 'peterffyd@kkszki.hu', '$2y$10$BkOEKQR/3mdf89.eZ4.7KuzsynVjVH80twWjhJX9uw6B/VtbG7TVe', 'Dominika', 'P', '654523', '65415352', 'dfghjkléá', 'fghjkl 852', 0, 0, NULL, 0, '2026-03-18 14:27:13', '2026-03-18 14:27:13');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jelszo_reset`
--

CREATE TABLE `jelszo_reset` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `kod` varchar(6) NOT NULL,
  `lejar` datetime NOT NULL,
  `felhasznalva` tinyint(4) DEFAULT 0,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `jelszo_reset`
--

INSERT INTO `jelszo_reset` (`id`, `felhasznalo_id`, `kod`, `lejar`, `felhasznalva`, `letrehozva`) VALUES
(6, 9, '719427', '2026-01-02 18:04:47', 0, '2026-01-02 16:49:47'),
(19, 16, '213166', '2026-03-18 08:03:40', 1, '2026-03-18 06:48:40');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `slug` varchar(30) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `sorrend` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `slug`, `nev`, `kep`, `sorrend`) VALUES
(1, 'kutya', 'Kutya', 'img/kutya.png', 1),
(2, 'macska', 'Macska', 'img/macska.png', 2),
(3, 'ragcsalo', 'Rágcsáló', 'img/ragcsalo.png', 3),
(4, 'hullo', 'Hüllő', 'img/hullo.png', 4),
(5, 'madar', 'Madár', 'img/madar.png', 5),
(6, 'hal', 'Hal', 'img/hal.png', 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kosar`
--

CREATE TABLE `kosar` (
  `felhasznalo_id` bigint(20) UNSIGNED NOT NULL,
  `termek_id` int(10) UNSIGNED NOT NULL,
  `mennyiseg` smallint(5) UNSIGNED NOT NULL DEFAULT 1,
  `hozzaadva` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kuponok`
--

CREATE TABLE `kuponok` (
  `id` int(11) NOT NULL,
  `kod` varchar(50) NOT NULL,
  `tipus` enum('szazalek','fix') DEFAULT 'szazalek',
  `ertek` decimal(10,2) NOT NULL,
  `min_osszeg` decimal(10,2) DEFAULT 0.00,
  `felhasznalasi_limit` int(11) DEFAULT NULL,
  `felhasznalva` int(11) DEFAULT 0,
  `felhasznalo_id` int(11) DEFAULT NULL,
  `ervenyes_kezdet` datetime DEFAULT current_timestamp(),
  `ervenyes_veg` datetime DEFAULT NULL,
  `aktiv` tinyint(1) DEFAULT 1,
  `letrehozva` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kuponok`
--

INSERT INTO `kuponok` (`id`, `kod`, `tipus`, `ertek`, `min_osszeg`, `felhasznalasi_limit`, `felhasznalva`, `felhasznalo_id`, `ervenyes_kezdet`, `ervenyes_veg`, `aktiv`, `letrehozva`) VALUES
(1, 'HUSEG05', 'szazalek', 0.51, 0.00, 1, 0, NULL, '2026-01-02 13:49:03', '2026-01-04 13:16:00', 0, '2026-01-02 13:49:03'),
(4, 'nyar', 'fix', 1500.00, 2000.00, NULL, 0, NULL, '2026-03-18 07:57:14', '2026-03-22 11:56:00', 1, '2026-03-18 07:57:14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kupon_hasznalatok`
--

CREATE TABLE `kupon_hasznalatok` (
  `id` int(11) NOT NULL,
  `kupon_id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `rendeles_id` int(11) DEFAULT NULL,
  `hasznalva` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendelesek`
--

CREATE TABLE `rendelesek` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `felhasznalo_id` bigint(20) UNSIGNED NOT NULL,
  `rendeles_szam` varchar(30) NOT NULL,
  `statusz` enum('uj','feldolgozas','fizetve','kesz','storno') DEFAULT 'uj',
  `osszeg` int(10) UNSIGNED NOT NULL,
  `szallitasi_mod` varchar(100) DEFAULT NULL,
  `fizetesi_mod` varchar(100) DEFAULT NULL,
  `megjegyzes` text DEFAULT NULL,
  `szallitasi_nev` varchar(200) DEFAULT NULL,
  `szallitasi_cim` text DEFAULT NULL,
  `szallitasi_varos` varchar(100) DEFAULT NULL,
  `szallitasi_irsz` varchar(20) DEFAULT NULL,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `frissitve` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendelesek`
--

INSERT INTO `rendelesek` (`id`, `felhasznalo_id`, `rendeles_szam`, `statusz`, `osszeg`, `szallitasi_mod`, `fizetesi_mod`, `megjegyzes`, `szallitasi_nev`, `szallitasi_cim`, `szallitasi_varos`, `szallitasi_irsz`, `letrehozva`, `frissitve`) VALUES
(5, 9, 'ORD-20260101-9A5EAE', 'uj', 35960, 'Hazhozszallitas', 'Utanvet', '', 'anya', 'anyaanya', 'anya', 'anyaanya', '2026-01-01 18:04:41', '2026-01-01 18:04:41'),
(6, 9, 'ORD-20260102-3BB8BB', 'uj', 8990, 'Szemelyes atvetel', 'Bankkartya', 'lol', 'anya', 'anya', 'anya', 'anya', '2026-01-02 14:02:59', '2026-02-06 16:50:46'),
(9, 9, 'ORD-20260206-5B2A42', 'uj', 2500, 'Házhozszállítás', 'Utánvét', '', 'anya', 'anya', 'anya', 'ANYA', '2026-02-06 17:11:17', '2026-02-06 17:11:17'),
(13, 9, 'ORD-20260312-69A314', 'uj', 8888, 'GLS futar', 'Bankkartya', '', 'sfgsds', 'sgsdgs', 'sdgsg', 'gds', '2026-03-12 20:44:06', '2026-03-12 20:44:06'),
(14, 9, 'ORD-20260312-B0FFD1', 'uj', 8990, 'GLS futar', 'Bankkartya', '', 'dfhdfd', 'dhhdf', 'hdhdh', 'hdhdhdfdf', '2026-03-12 21:28:43', '2026-03-12 21:28:43'),
(17, 9, 'ORD-20260317-017760', 'uj', 5678, 'GLS futar', 'Bankkartya', '', 'ewsdgsd', 'sgsg', 'gsdsdg', 'gsdgsdgsd', '2026-03-17 21:30:40', '2026-03-17 21:30:40'),
(18, 9, 'ORD-20260318-A3F277', 'kesz', 5678, 'GLS futar', 'Bankkartya', '', 'eteg', '852', 'wefghj', '132', '2026-03-18 06:26:50', '2026-03-18 06:54:36'),
(19, 17, 'ORD-20260318-864CA0', 'uj', 8990, 'GLS futar', 'Bankkartya', '', 'P Dominika', 'sdefrgt456', 'asdfghjkl', '32143', '2026-03-18 14:27:52', '2026-03-18 14:27:52'),
(20, 17, 'ORD-20260318-F78CDB', 'uj', 26970, 'GLS futar', 'Bankkartya', '', 'P Dominika', 'Utca 12', 'Miskolc', '1234', '2026-03-18 14:31:27', '2026-03-18 14:31:27'),
(21, 9, 'ORD-20260321-67B71A', 'uj', 69488, 'Foxpost', 'Bankkartya', '', 'Ggh', 'Sz', 'Budapest ', '7uiz', '2026-03-21 11:09:58', '2026-03-21 11:09:58');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles_tetelek`
--

CREATE TABLE `rendeles_tetelek` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rendeles_id` bigint(20) UNSIGNED NOT NULL,
  `termek_id` int(10) UNSIGNED NOT NULL,
  `termek_nev` varchar(255) NOT NULL,
  `ar` int(10) UNSIGNED NOT NULL,
  `mennyiseg` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles_tetelek`
--

INSERT INTO `rendeles_tetelek` (`id`, `rendeles_id`, `termek_id`, `termek_nev`, `ar`, `mennyiseg`) VALUES
(5, 5, 4, 'Rukka Kötélpóráz', 8990, 4),
(6, 6, 4, 'Rukka Kötélpóráz', 8990, 1),
(15, 14, 4, 'Rukka Kötélpóráz', 8990, 1),
(19, 17, 10, 'Teszt Termek 5', 5678, 1),
(20, 18, 10, 'Teszt Termek 5', 5678, 1),
(21, 19, 4, 'Rukka Cord Tec póráz', 8990, 1),
(22, 20, 7, 'KONG Kickeroo', 3990, 2),
(23, 20, 2, 'bosch Maxi Adult', 18990, 1),
(24, 21, 61, 'Smilla Sterilised gabonamentes lazac', 13000, 2),
(25, 21, 38, 'flexi New Classic szalagpóráz', 10100, 1),
(26, 21, 10, 'flexi Giant szalagpóráz', 12199, 2),
(27, 21, 4, 'Rukka Cord Tec póráz', 8990, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(10) UNSIGNED NOT NULL,
  `alkategoria_id` smallint(5) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `leiras` text DEFAULT NULL,
  `rovid_leiras` varchar(500) DEFAULT NULL,
  `ar` int(10) UNSIGNED NOT NULL,
  `akcios_ar` int(10) UNSIGNED DEFAULT NULL,
  `keszlet` int(10) UNSIGNED DEFAULT 999,
  `fo_kep` varchar(255) NOT NULL,
  `tobbi_kep` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tobbi_kep`)),
  `aktiv` tinyint(1) DEFAULT 1,
  `letrehozva` timestamp NOT NULL DEFAULT current_timestamp(),
  `frissitve` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `alkategoria_id`, `nev`, `slug`, `leiras`, `rovid_leiras`, `ar`, `akcios_ar`, `keszlet`, `fo_kep`, `tobbi_kep`, `aktiv`, `letrehozva`, `frissitve`) VALUES
(1, 6, 'Royal Canin Mini Adult', 'royal-canin-mini-adult', NULL, 'Prémium kutyatáp kistestű felnőtt kutyáknak', 6290, 4490, 46, 'https://media.zooplus.com/bilder/2/400/rc_shn_miniadult_mv_1_2.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-20 18:13:14'),
(2, 6, 'bosch Maxi Adult', 'bosch-adult-menue', NULL, 'Kiváló ár-érték arányú kutyatáp.', 18990, 0, 99, 'https://media.zooplus.com/bilder/1/400/70115_pla_bosch_maxiadult_15kg_2_1.jpg', '[]', 1, '2025-12-27 16:22:32', '2026-03-18 14:31:27'),
(3, 3, 'JULIUS-K9 Erőhám', 'julius-k9-eroharm', NULL, 'Profi kutyahám erős kutyáknak.', 15990, 13990, 30, 'https://media.zooplus.com/bilder/1/400/536296_pla_juliusk9_idc_hs_01_1.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-18 15:05:10'),
(4, 1, 'Rukka Cord Tec póráz', 'rukka-kotelpraz', NULL, 'Állítható kötélpóráz nagy kutyáknak', 8990, 0, 33, 'https://media.zooplus.com/bilder/9/400/598996_pla_rukka_cord_tec_lash_hs_01_9.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-21 11:09:58'),
(5, 2, 'Trixie kerámiatál, fekete', 'trixie-keramia-tal-szett', NULL, 'Elegáns kerámia tál kutyáknak. 400 ml, Ø 13 cm.', 1490, 0, 25, 'https://media.zooplus.com/bilder/4/400/611352_611353_pla_trixie_keramik_napf_schwarz_hs_01_4.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-18 15:02:04'),
(6, 12, 'Felix Fantastic Junior', 'felix-fantastic', NULL, 'Nedves macskatáp kölyök cicáknak.', 9160, 8560, 199, 'https://media.zooplus.com/bilder/9/400/171105_pla_nestlegermaindc_felix_sogut_junior_pouches_48x85g_hs_01_9.jpg', '[]', 1, '2025-12-27 16:22:32', '2026-03-20 18:41:06'),
(7, 7, 'KONG Kickeroo', 'kong-kickeroo', NULL, 'Népszerű macskajáték.', 4990, 3990, 58, 'https://media.zooplus.com/bilder/2/400/26806_PLA_Kong_Kickeroo_Giraffe_136111_kong_kickeroo_1_2.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-18 15:05:55'),
(8, 4, 'Frontline Combo', 'frontline-tri-act', NULL, 'Frontline Combo spot-on kullancs, bolha és tetvek ellen kutyáknak L 20-40kg 3db.', 8590, 0, 80, 'https://www.fressnapf.hu/img/86560/1396896/1396896.webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-20 17:34:48'),
(9, 15, 'Petlife Safebed alom papírpehely', 'petlife-safebed-papirpehely', NULL, 'Alom növényi rostokból bármely rágcsálónak.', 3390, 0, 3, 'https://media.zooplus.com/bilder/6/400/64250_PLA_petlife_safebed_paper_shavings_6.jpg?width=400&format=webp', '[]', 1, '2025-12-27 16:22:32', '2026-03-18 14:42:01'),
(10, 1, 'flexi Giant szalagpóráz', 'teszt-termek-5', NULL, 'L, fekete/neonsárga, 8 m. Automata szalagpóráz max 50kg testtömegű kutyáknak.', 12199, 0, 110, 'https://media.zooplus.com/bilder/5/400/347496_pla_hundeleine_flexi_giantl_8m_hs_02_5.jpg?width=400&format=webp', '[]', 1, '2025-12-28 17:15:33', '2026-03-21 11:09:58'),
(11, 3, 'Feel Free puha kutyahám', 'we4twe', NULL, 'Hám kutyáknak kicsi önsúllyal, fényvisszaverő csíkokkal, optimális illeszkedési formával, enyhe nyúlású, nagyon stabil és lélegző, állítható tépőzárakkal, könnyű ráadni a kutyára; anyaga poliészter.', 4200, 0, 150, 'https://media.zooplus.com/bilder/4/400/46438_PLA_Hunde_Softgeschirr_Feel_Free___schwarz_M_FG_DSC8526_4.jpg?width=400&format=webp', '[]', 1, '2025-12-28 18:01:11', '2026-03-18 13:34:06'),
(12, 2, 'TIAKI Functional rozsdamentes acéltál', '222', NULL, 'Strapabíró etetőtál kutyáknak, fényes rozsdamentes acélból.', 1100, 0, 19, 'https://media.zooplus.com/bilder/9/400/348296_tiaki_feeding_bowl_1600_ml_functional_fg_2323_9.jpg?width=400&format=webp', '[]', 1, '2025-12-28 18:20:39', '2026-03-18 15:00:32'),
(13, 3, 'Trixie autós kutyahám', '2', NULL, 'Övhám kutyáknak, ideális autóban való biztonságos rögzítésre, vezetőhámként is használható, nyaknál-hasnál állítható, biztonsági övvel együtt (állítható), a legtöbb biztonsági öv csatjához illeszkedik.', 3600, 2499, 22, 'https://media.zooplus.com/bilder/3/400/839_840_12145_pla_trixie_auto_geschirr_f_r_hunde_hs1_3.jpg?width=400&format=webp', '[]', 1, '2025-12-28 18:21:45', '2026-03-18 13:37:24'),
(32, 4, 'Frontline Tri-Act', 'ham', NULL, 'L-es kutyáknak 20-40 kg között. A doboz 3 rácsepegetőt tartalmaz.', 9400, 0, 24, 'https://www.fressnapf.hu/img/86560/1245691/1000x1000/1245691.webp?time=1748602997', '[]', 1, '2026-03-17 20:39:14', '2026-03-20 17:35:46'),
(33, 15, 'Hugro RODIFLAX len alom', 'hugro-rodiflax-len-alom', NULL, 'Környezetbarát natúr alom kisállatoknak, 100% natúr lenből.', 5099, 4799, 16, 'https://media.zooplus.com/bilder/6/400/436096_pla_hugro_rodiflax_flachsstreu_leinenstreu_hs_01_6.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:43:21', '2026-03-18 14:43:21'),
(34, 15, 'Hugro kókuszalom', 'hugro-kokuszalom', NULL, 'Kiváló minőségű alom kisállatok és hüllők számára.', 9300, 0, 107, 'https://media.zooplus.com/bilder/4/400/504496_pla_hugro_kokosstreu_hs_01_4.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:45:13', '2026-03-18 14:45:13'),
(35, 13, 'Versele-Laga Cuni Adult Complete', 'versele-laga-cuni-adult-complete', NULL, 'Extrudált teljes értékű nyúleledel a Versele-Laga-tól őröletlen rostokkal.', 4299, 0, 120, 'https://media.zooplus.com/bilder/6/400/63357_pla_versele_laga_cuni_adult_complete_kaninchen_1_75kg_hs_1_1_6.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:46:42', '2026-03-18 14:46:42'),
(36, 13, 'Versele-Laga Crispy müzli nyulaknak', 'versele-laga-crispy-muzli-nyulaknak', NULL, 'Teljes értékű müzli törpenyulaknak magas rosttartalommal, minőségi magvakkal, zöldséggel, pelletekkel gazdagítva.', 3299, 2699, 45, 'https://media.zooplus.com/bilder/5/400/54014_PLA_Versele_Laga_Crispy_Muesli_Kaninchen_2_75kg_5.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:48:13', '2026-03-18 14:48:13'),
(37, 13, 'Vitakraft Menü Vital törpehörcsögeledel', 'vitakraft-menu-vital-torpehorcsogeledel', NULL, 'Fajnak megfelelő, komplett eledel törpehörcsögöknek, értékes, természetes alapanyagokból.', 1090, 0, 23, 'https://media.zooplus.com/bilder/2/400/513596_pla_vitakraft_menu_vital_zwerghamster_hs_01_2.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:50:16', '2026-03-18 14:54:12'),
(38, 1, 'flexi New Classic szalagpóráz', 'flexi-new-classic-szalagporaz', NULL, 'L, fekete, 8 m. Hosszú szalagpóráz kutyáknak, maximum 50 kg testsúlyig.', 10100, 0, 119, 'https://media.zooplus.com/bilder/4/400/198005_pla_flexi_newclassic_gurtleine_l_schwarz_hs_02_4.jpg?width=400&format=webp', '[]', 1, '2026-03-18 14:56:32', '2026-03-21 11:09:58'),
(39, 2, 'TIAKI Duo etetőállvány 2 kerámiatállal', 'tiaki-duo-etetoallvany-2-keramiatallal', NULL, 'Etetőpult kistestű kutyáknak, két higiénikus kerámiatállal, megemelt pozíció a kényelmes táplálkozásért.', 9300, 0, 130, 'https://media.zooplus.com/bilder/0/400/302496_pla_tiaki_napf_duo_grau_fg_6145_0.jpg?width=400&format=webp', '[]', 1, '2026-03-18 15:03:56', '2026-03-18 15:03:56'),
(40, 4, 'Advantix spot-on (4-10kg) x4', 'advantix-spot-on', NULL, 'Hatásos a bolhák, kullancsok, igazi szúnyogok, lepkeszúnyogok, szuronyos istállólegyek és szőrtetvek ellen.', 12990, 0, 15, 'https://www.fressnapf.hu/img/86560/1245257/496x496,r/1245257.webp?time=1744010996', '[]', 1, '2026-03-20 17:38:07', '2026-03-20 17:41:17'),
(41, 4, 'Advantix spot-on (<4kg) x4', 'advantix-spot-on-4kg-x4', NULL, 'Hatásos a bolhák, kullancsok, igazi szúnyogok, lepkeszúnyogok, szuronyos istállólegyek és szőrtetvek ellen.', 12000, 0, 24, 'https://www.fressnapf.hu/img/86560/1266255/1000x1000/1266255.webp?time=1743751473', '[]', 1, '2026-03-20 17:40:00', '2026-03-20 17:41:58'),
(42, 4, 'Advantix spot-on (10-25kg) 4x', 'advantix-spot-on-10-25kg-4x', NULL, 'Hatásos a bolhák, kullancsok, igazi szúnyogok, lepkeszúnyogok, szuronyos istállólegyek és szőrtetvek ellen.', 13900, 0, 8, 'https://www.fressnapf.hu/img/86560/1245258/1000x1000/1245258.webp?time=1744010996', '[]', 1, '2026-03-20 17:43:17', '2026-03-20 17:43:17'),
(43, 4, 'Advantix spot-on (25-40kg) 4x', 'advantix-spot-on-25-40kg-4x', NULL, 'Hatásos a bolhák, kullancsok, igazi szúnyogok, lepkeszúnyogok, szuronyos istállólegyek és szőrtetvek ellen.', 15100, 0, 10, 'https://www.fressnapf.hu/img/86560/1245259/1000x1000/1245259.webp?time=1744010996', '[]', 1, '2026-03-20 17:44:46', '2026-03-20 17:44:46'),
(44, 4, 'Advantix spot-on (40-60kg) 4x', 'advantix-spot-on-40-60kg-4x', NULL, 'Hatásos a bolhák, kullancsok, igazi szúnyogok, lepkeszúnyogok, szuronyos istállólegyek és szőrtetvek ellen.', 17000, 0, 5, 'https://www.fressnapf.hu/img/86560/1295842/1000x1000/1295842.webp?time=1744010997', '[]', 1, '2026-03-20 17:46:01', '2026-03-20 17:46:01'),
(45, 10, 'Advantage spot-on <4kg 1x', 'advantage-bolha-elleni-spot-on-4kg-1x', NULL, 'Rácsepegtető oldat macskák és nyulak bolhásságának megelőzésére és kezelésére.', 2500, 0, 13, 'https://www.fressnapf.hu/img/86560/1266258/1000x1000/1266258.webp?time=1744010997', '[]', 1, '2026-03-20 17:49:52', '2026-03-20 17:52:03'),
(46, 10, 'Advantage spot-on 4-8kg 1x', 'advantage-spot-on-4-8kg-1x', NULL, 'Rácsepegtető oldat macskák és nyulak bolhásságának megelőzésére és kezelésére.', 2700, 0, 24, 'https://www.fressnapf.hu/img/86560/1266259/1000x1000/1266259.webp?time=1744010997', '[]', 1, '2026-03-20 17:51:48', '2026-03-20 17:51:48'),
(47, 10, 'AdTab  12mg (0,5-2kg)', 'adtab-12mg', NULL, 'Kullancs, bolha és tetvek elleni rágótabletta macskák részére 1 hónapos védelem.', 3200, 0, 26, 'https://www.fressnapf.hu/img/86560/1658250/1000x1000/1658250.webp?time=1732196945', '[]', 1, '2026-03-20 17:55:35', '2026-03-20 18:00:41'),
(48, 10, 'AdTab 48mg (2-8kg)', 'adtab-48mg-2-8kg', NULL, 'Kullancs, bolha és tetvek elleni rágótabletta macskák részére 1 hónapos védelem.', 3600, 0, 26, 'https://www.fressnapf.hu/img/86560/1658251/496x496,r/1658251.webp?time=1732196944', '[]', 1, '2026-03-20 18:00:30', '2026-03-20 18:00:30'),
(49, 5, 'Trixie Premium fojtó nyakörv, fekete', 'trixie-premium-fojto-nyakorv-fekete', NULL, 'S–M méret: 30–40 cm nyakkörfogat, Sz 15 mm.', 1890, 0, 20, 'https://media.zooplus.com/bilder/2/400/200318_pla_trixie_premium_zugstopp_halsband_schwarz_hs_01_2.jpg', '[]', 1, '2026-03-20 18:03:28', '2026-03-20 18:03:28'),
(50, 5, 'Nomad Tales Calma nyakörv, sand', 'nomad-tales-calma-nyakorv-sand', NULL, 'S méret: 30 - 46 cm nyakerület, Sz 15 mm', 5390, 0, 10, 'https://media.zooplus.com/bilder/9/400/pla_326198_326200_326201_325903_326096_326097_nomad_tales_calma_halsbaender_fg_1609_9.jpg', '[]', 1, '2026-03-20 18:05:43', '2026-03-20 18:05:43'),
(51, 5, 'TIAKI Soft & Safe nyakörv, piros', 'tiaki-soft-safe-nyakorv-piros', NULL, 'XS méret: 25 - 35 cm nyakkörfogat, 40 mm széles', 2890, 0, 10, 'https://media.zooplus.com/bilder/7/400/323200_pla_soft_safe_fg_1209_7.jpg', '[]', 1, '2026-03-20 18:07:00', '2026-03-20 18:07:00'),
(52, 5, 'HUNTER London nyakörv, olívazöld', 'hunter-london-nyakorv-olivazold', NULL, 'L méret: 34-56 cm nyakkörfogat, Sz 20 mm', 1390, 0, 25, 'https://media.zooplus.com/bilder/3/400/164399_164197_pla_hunter_halsband_london_olivgruen_hs_01_3.jpg', '[]', 1, '2026-03-20 18:09:35', '2026-03-20 18:09:35'),
(53, 6, 'Brit Premium by Nature Adult Large', 'brit-premium-by-nature-adult-large', NULL, 'Fehérjében gazdag, teljes értékű eledel nagy méretű felnőtt kutyáknak. 15kg.', 13890, 0, 50, 'https://media.zooplus.com/bilder/5/400/82042_pla_brit_premiumbynature_adult_l_15kg_5.jpg', '[]', 1, '2026-03-20 18:14:43', '2026-03-20 18:16:32'),
(54, 6, 'Briantos Adult lazac & rizs 14kg', 'briantos-adult-lazac-rizs-14kg', NULL, 'Csemege lazac könnyen emészthető rizzsel prémium minőségben.', 10790, 0, 25, 'https://media.zooplus.com/bilder/0/400/briantos_adult_salmonrice_14kg_1000x1000_0.jpg', '[]', 1, '2026-03-20 18:15:39', '2026-03-20 18:15:39'),
(55, 7, 'Tollas játékpálca', 'tollas-jatekpalca', NULL, 'A hajlékony nyelű játékbot színes tollaival és a zörgős fóliával nagyon népszerű macskajáték.', 450, 0, 999, 'https://media.zooplus.com/bilder/3/400/59841_pla_katzenfederspiel_fg_4943_3.jpg', '[]', 1, '2026-03-20 18:18:32', '2026-03-20 18:18:32'),
(56, 7, 'Macskapeca tollboával', 'macskapeca-tollboaval', NULL, 'Garantált játékélmény macskának és gazdájának egyaránt.', 590, 0, 40, 'https://media.zooplus.com/bilder/5/400/58521_PLA_Katzenangel_Federboa_FG_DSC0755_5.jpg', '[]', 1, '2026-03-20 18:20:17', '2026-03-20 18:20:17'),
(57, 7, 'Trixie plüss egérke macskamentával', 'trixie-pluss-egerke-macskamentaval', NULL, 'Kedves kis szürke plüss játékegér macskamentával (catnip).', 490, 0, 50, 'https://media.zooplus.com/bilder/2/400/26383_PLA_Trixie_Plueschmaus_mit_Catnip_Katzenspielzeug_7_cm_2.jpg', '[]', 1, '2026-03-20 18:21:43', '2026-03-20 18:21:43'),
(58, 8, 'Macska etetőtál csúszásgátló aljzattal', 'macska-etetotal-csuszasgatlo-aljzattal', NULL, '200 ml, Ø 15 cm. Kis rozsdamentes acél tál aljzattal, tökéletes macska etetőtál.', 890, 0, 15, 'https://media.zooplus.com/bilder/2/400/28923_PLA_Rutschfester_Fressnapf_mit_Katzenmotiv_FG30_DSC2044_2.jpg', '[]', 1, '2026-03-20 18:25:23', '2026-03-20 18:25:23'),
(59, 8, 'Trixie talpas kerámiatál', 'trixie-talpas-keramiatal', NULL, '150 ml, Ø 13 cm. Elegáns kerámiatál macskáknak, kerek állólábbal.', 2390, 0, 13, 'https://media.zooplus.com/bilder/5/400/98398_pla_trixie_keramiknapf_mit_fur_katze_5.jpg', '[]', 1, '2026-03-20 18:26:38', '2026-03-20 18:26:38'),
(60, 8, 'TIAKI hármas tál vízadagolóval', 'tiaki-harmas-tal-vizadagoloval', NULL, 'Praktikus hármas tál macskák számára, két kivehető rozsdamentes acél tállal.', 3390, 0, 11, 'https://media.zooplus.com/bilder/4/400/486196_pla_tiaki_triple_feeder_fg_4762_4.jpg', '[]', 1, '2026-03-20 18:28:00', '2026-03-20 18:28:00'),
(61, 12, 'Smilla Sterilised gabonamentes lazac', 'smilla-sterilised-gabonamentes-lazac', NULL, 'Teljes értékű száraztáp speciális receptúrával az ivartalanított macskák anyagcsere-szükségleteinek megfelelően.', 13000, 0, 8, 'https://media.zooplus.com/bilder/6/400/2025_05_smilla_special_sterilised_gf_board_01_appversion_salmon_1000x1000_10kg_6.jpg', '[]', 1, '2026-03-20 18:33:42', '2026-03-21 11:09:58'),
(62, 12, 'Josera Nature Cat gabonamentes', 'josera-nature-cat-gabonamentes', NULL, 'Gabonamentes száraztáp érzékeny macskáknak sok szárnyassal, lazaccal, gyógynövény-kivonatokkal, zöldséggel, gyümölccsel.', 5590, 0, 10, 'https://media.zooplus.com/bilder/0/400/97904_pla_foodforplanet_josera_naturecat_2kg_0.jpg', '[]', 1, '2026-03-20 18:38:01', '2026-03-20 18:38:01');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek_velemenyek`
--

CREATE TABLE `termek_velemenyek` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `termek_id` int(10) UNSIGNED NOT NULL,
  `felhasznalo_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vendeg_nev` varchar(100) DEFAULT 'Névtelen vásárló',
  `ertekeles` tinyint(3) UNSIGNED NOT NULL CHECK (`ertekeles` in (1,2,3,4,5)),
  `cim` varchar(150) NOT NULL,
  `velemeny` text NOT NULL,
  `segitett_igen` int(10) UNSIGNED DEFAULT 0,
  `segitett_nem` int(10) UNSIGNED DEFAULT 0,
  `ellenorzott` tinyint(1) DEFAULT 0,
  `elfogadva` tinyint(1) DEFAULT 1,
  `datum` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek_velemenyek`
--

INSERT INTO `termek_velemenyek` (`id`, `termek_id`, `felhasznalo_id`, `vendeg_nev`, `ertekeles`, `cim`, `velemeny`, `segitett_igen`, `segitett_nem`, `ellenorzott`, `elfogadva`, `datum`) VALUES
(1, 1, NULL, 'Kovács Béla', 5, 'Szuper táp, a kutyám imádja!', 'A Royal Canin Mini Adult óta sokkal szebb a szőre a törpe uszkárnak, és végre nem válogatós többé. Nagyon ajánlom!', 0, 0, 1, 1, '2025-01-15 13:22:33'),
(2, 1, NULL, 'Szabó Anita', 4, 'Jó, de kicsit drága', 'Minősége kiváló, a kutyusom egészségesen tartja, de az árért több akció is elférne. Ettől függetlenül újra veszem.', 0, 0, 1, 1, '2025-03-22 08:11:45'),
(3, 3, NULL, 'Nagy István', 5, 'A legjobb hám, amit valaha vettem', 'A JULIUS-K9 erőhám piros XL tökéletesen illeskedik a németjuhászomra, végre nem húz annyira séta közben. Kötelező darab!', 0, 0, 1, 1, '2025-02-28 17:47:12'),
(4, 6, NULL, 'Kiss Eszter', 5, 'A macskám rajong érte', 'A Felix Fantastic duplán finom az egyetlen nedves táp, amit maradéktalanul megeszik a perzsa cicám. 10/10!', 0, 0, 1, 1, '2025-04-10 09:30:55'),
(5, 5, NULL, 'Tóth Gábor', 3, 'Elmegy, de van jobb is', 'A Trixie kerámia tálak szépek, de az állvány kicsit billeg. Közepes méretű kutyánál még oké, de nagyobbnál nem ajánlom.', 0, 0, 0, 1, '2025-05-19 18:05:21'),
(6, 8, NULL, 'Horváth Lili', 5, 'Végre nem vakarózik!', 'A Frontline Tri-Act után eltűntek a bolhák a spánielről, és még most, hónapok múlva sem jöttek vissza. Köszönöm!', 0, 0, 1, 1, '2025-06-30 14:18:44'),
(7, 2, NULL, 'Varga Tamás', 5, 'Ár-érték bajnok', 'Bosch Adult Menue 15 kg-os zsákot vettem, és a golden retrieverem szőre még sosem volt ilyen fényes. Profi választás!', 0, 0, 1, 1, '2025-07-12 11:55:19'),
(8, 7, NULL, 'Papp Réka', 2, 'Nem érte meg az árát', 'A KONG Kickeroo macskajátékot 2 nap alatt széttépte a maine coonom. Vártam tőle többet ennyi pénzért.', 0, 0, 1, 1, '2025-08-25 08:42:33'),
(9, 4, NULL, 'Molnár Péter', 5, 'Tökéletes póráz nagy kutyának', 'Rukka állítható kötélpóráz fekete – végre nem szakad el, és kényelmes a fogása is. 70 kg-os kaukázusi pásztorommal is bírja.', 0, 0, 1, 1, '2025-09-05 17:27:58'),
(10, 9, NULL, 'Fekete Zsanett', 5, 'A nyuszik imádják!', 'Petlife Safebed papírpehely alom a legjobb döntés volt a törpenyulaimnak. Pormentes, szagtalan, és nem eszik meg. Tökéletes!', 0, 0, 1, 1, '2025-11-28 07:19:07'),
(11, 1, NULL, 'Balogh Andrea', 5, 'Minden kutyának ajánlom!', 'Már a harmadik zsakot veszem ebből a tápból. A kutyám energikus és egészséges. Köszönöm!', 0, 0, 1, 1, '2025-12-10 14:30:22'),
(12, 3, NULL, 'Lakatos György', 4, 'Jó minőség, kicsit drága', 'A hám kiváló minőségű, de az ára elég magas. Viszont megéri, mert tartós.', 0, 0, 1, 1, '2025-12-15 09:45:11');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tiltott_szavak`
--

CREATE TABLE `tiltott_szavak` (
  `id` int(11) NOT NULL,
  `szo` varchar(100) NOT NULL,
  `hozzaadva` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tiltott_szavak`
--

INSERT INTO `tiltott_szavak` (`id`, `szo`, `hozzaadva`) VALUES
(1, 'spam', '2026-01-01 20:05:57'),
(2, 'szar', '2026-01-01 20:05:57'),
(3, 'reklam', '2026-01-01 20:08:40'),
(4, 'scam', '2026-01-01 20:08:40'),
(5, 'fake', '2026-01-01 20:08:40'),
(6, 'hamis', '2026-01-01 20:08:40');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `alkategoriak`
--
ALTER TABLE `alkategoriak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `egyedi_slug` (`kategoria_id`,`slug`);

--
-- A tábla indexei `fal_bejegyzesek`
--
ALTER TABLE `fal_bejegyzesek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `jelszo_reset`
--
ALTER TABLE `jelszo_reset`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- A tábla indexei `kosar`
--
ALTER TABLE `kosar`
  ADD PRIMARY KEY (`felhasznalo_id`,`termek_id`),
  ADD KEY `termek_id` (`termek_id`);

--
-- A tábla indexei `kuponok`
--
ALTER TABLE `kuponok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kod` (`kod`);

--
-- A tábla indexei `kupon_hasznalatok`
--
ALTER TABLE `kupon_hasznalatok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rendeles_szam` (`rendeles_szam`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`);

--
-- A tábla indexei `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rendeles_id` (`rendeles_id`),
  ADD KEY `termek_id` (`termek_id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `egyedi_slug` (`slug`),
  ADD KEY `alkategoria_id` (`alkategoria_id`);

--
-- A tábla indexei `termek_velemenyek`
--
ALTER TABLE `termek_velemenyek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `idx_termek` (`termek_id`),
  ADD KEY `idx_ertekeles` (`ertekeles`);

--
-- A tábla indexei `tiltott_szavak`
--
ALTER TABLE `tiltott_szavak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `szo` (`szo`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `alkategoriak`
--
ALTER TABLE `alkategoriak`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `fal_bejegyzesek`
--
ALTER TABLE `fal_bejegyzesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `jelszo_reset`
--
ALTER TABLE `jelszo_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `kuponok`
--
ALTER TABLE `kuponok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `kupon_hasznalatok`
--
ALTER TABLE `kupon_hasznalatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT a táblához `termek_velemenyek`
--
ALTER TABLE `termek_velemenyek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `tiltott_szavak`
--
ALTER TABLE `tiltott_szavak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `alkategoriak`
--
ALTER TABLE `alkategoriak`
  ADD CONSTRAINT `alkategoriak_ibfk_1` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `kosar`
--
ALTER TABLE `kosar`
  ADD CONSTRAINT `kosar_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kosar_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `rendelesek`
--
ALTER TABLE `rendelesek`
  ADD CONSTRAINT `rendelesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`);

--
-- Megkötések a táblához `rendeles_tetelek`
--
ALTER TABLE `rendeles_tetelek`
  ADD CONSTRAINT `rendeles_tetelek_ibfk_1` FOREIGN KEY (`rendeles_id`) REFERENCES `rendelesek` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rendeles_tetelek_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`);

--
-- Megkötések a táblához `termekek`
--
ALTER TABLE `termekek`
  ADD CONSTRAINT `termekek_ibfk_1` FOREIGN KEY (`alkategoria_id`) REFERENCES `alkategoriak` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `termek_velemenyek`
--
ALTER TABLE `termek_velemenyek`
  ADD CONSTRAINT `termek_velemenyek_ibfk_1` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `termek_velemenyek_ibfk_2` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
