-- calcular.ar + calcularya.com · proveedor de pago genérico en ca_compras y ca_checkouts.
-- Re-ejecutable. mp_payment_id queda como está (NOT NULL UNIQUE en ca_compras): las ventas de otro
-- proveedor lo llenan con '<proveedor>:<id>', así el código anda antes y después de correr esto.

set lock_timeout = '5s';

do $$
declare
  t text;
begin
  foreach t in array array['ca_compras', 'ca_checkouts'] loop
    execute format('alter table public.%I add column if not exists proveedor text not null default %L', t, 'mercadopago');
    execute format('alter table public.%I add column if not exists pago_id text', t);
    if not exists (select 1 from pg_constraint where conrelid = format('public.%I', t)::regclass and conname = t || '_proveedor_check') then
      execute format(
        'alter table public.%I add constraint %I check (proveedor in (''mercadopago'', ''paypal'', ''stripe'') and (pago_id is null or char_length(pago_id) between 1 and 80)) not valid',
        t, t || '_proveedor_check'
      );
    end if;
  end loop;
end $$;

-- Las compras de Mercado Pago ya tienen su id: se copia una sola vez para que pago_id sea la llave
-- de todas. Los checkouts no: su mp_payment_id es el último pago visto y puede repetirse.
update public.ca_compras set pago_id = mp_payment_id where pago_id is null and proveedor = 'mercadopago';

-- El webhook de MP (src/lib/mp-webhook.ts) no conoce pago_id: el trigger lo completa para que las
-- compras nuevas de calcular.ar también queden con la llave genérica.
create or replace function public.ca_compras_pago_id()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.pago_id is null and new.proveedor = 'mercadopago' then
    new.pago_id := new.mp_payment_id;
  end if;
  return new;
end;
$$;

revoke execute on function public.ca_compras_pago_id() from public, anon, authenticated;

drop trigger if exists ca_compras_pago_id on public.ca_compras;
create trigger ca_compras_pago_id before insert or update of mp_payment_id, proveedor, pago_id on public.ca_compras
  for each row execute function public.ca_compras_pago_id();

create unique index if not exists ca_compras_proveedor_pago_key on public.ca_compras (proveedor, pago_id) where pago_id is not null;
create unique index if not exists ca_checkouts_proveedor_pago_key on public.ca_checkouts (proveedor, pago_id) where pago_id is not null;

notify pgrst, 'reload schema';
