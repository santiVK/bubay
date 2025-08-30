-- Usuarios
create table profiles (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique
);

-- Mensajes
create table messages (
  id bigserial primary key,
  sender text,
  receiver text,
  content text,
  created_at timestamp default now()
);
