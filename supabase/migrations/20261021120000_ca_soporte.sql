-- Bandeja de soporte@calcular.ar: el webhook de Resend escribe, el agente de soporte (PC de Manuel,
-- scripts/soporte) lee y responde. Sólo service role: los mails de clientes nunca se exponen a anon.
set lock_timeout = '5s';

create table if not exists public.ca_soporte_hilos (
  id bigint generated always as identity primary key,
  email text not null check (char_length(email) between 3 and 254),
  nombre text check (char_length(nombre) <= 200),
  asunto text check (char_length(asunto) <= 500),
  buzon text not null default 'soporte@calcular.ar' check (char_length(buzon) <= 254),
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'en_proceso', 'respondido', 'escalado', 'cerrado', 'ignorado')),
  idioma text check (char_length(idioma) <= 10),
  notas text,
  tomado_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ca_soporte_hilos_estado_idx on public.ca_soporte_hilos (estado, updated_at);
create index if not exists ca_soporte_hilos_email_idx on public.ca_soporte_hilos (email);

create table if not exists public.ca_soporte_mensajes (
  id bigint generated always as identity primary key,
  hilo_id bigint not null references public.ca_soporte_hilos (id) on delete cascade,
  direccion text not null check (direccion in ('entrante', 'saliente', 'interno')),
  resend_id text unique,
  message_id text,
  in_reply_to text,
  referencias text,
  remitente text,
  destinatarios text[],
  asunto text,
  texto text,
  html text,
  adjuntos jsonb not null default '[]'::jsonb,
  autenticacion jsonb,
  automatico boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists ca_soporte_mensajes_hilo_idx on public.ca_soporte_mensajes (hilo_id, created_at);
create index if not exists ca_soporte_mensajes_msgid_idx on public.ca_soporte_mensajes (message_id);

alter table public.ca_soporte_hilos enable row level security;
alter table public.ca_soporte_mensajes enable row level security;
alter table public.ca_soporte_hilos force row level security;
alter table public.ca_soporte_mensajes force row level security;
revoke all on public.ca_soporte_hilos, public.ca_soporte_mensajes from anon, authenticated;
