-- Seed the initial Super Admin (same account as prisma/seed.cjs).
-- Password is Admin123! — change it after first login.
INSERT INTO "User" ("email", "name", "password", "role")
VALUES ('ned.uz07@gmail.com', 'Chizzywizzy', '$2b$10$/0SSAT82amhkbEkRembWHOHEzC4nDMMDqL9GQNsQrs1GTl1K3/4QK', 'Super Admin')
ON CONFLICT ("email") DO NOTHING;
