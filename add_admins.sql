-- Add martin@martin.hu and dominika@dominika.hu as admin users
-- Password: test1234 (bcrypt hashed)

USE kisallat_webshop;

INSERT INTO felhasznalok (felhasznalonev, email, jelszo_hash, admin, regisztralt)
VALUES
  ('martin', 'martin@martin.hu', '$2y$10$TAHXTKZMcj.5wfsqliZKlOMwHL65CWUICvbwTTs5H9PdBl26gcEb2', 1, NOW()),
  ('dominika', 'dominika@dominika.hu', '$2y$10$TAHXTKZMcj.5wfsqliZKlOMwHL65CWUICvbwTTs5H9PdBl26gcEb2', 1, NOW())
ON DUPLICATE KEY UPDATE
  jelszo_hash = VALUES(jelszo_hash),
  admin = 1;