-- calcular.ar + calcularya.com · una sola venta y una sola devolución por pago en revenue_events.
-- Re-ejecutable. revenue_events no tiene columna de id de pago: la idempotencia vive en la marca que
-- el webhook escribe en note (src/lib/mp-webhook.ts y src/lib/pagos/ventas-intl.ts):
--   venta       [mp:<payment_id>] · [<proveedor>:<huella>]            amount > 0
--   devolución  [mp-devuelto:<id>] · [<proveedor>-devuelto:<huella>]  amount < 0
-- La nota de una devolución intl también nombra la marca de su venta: por eso cada índice filtra por
-- el signo del monto y no choca la devolución con su venta.
--
-- ANTES DE APLICAR: si ya hay marcas repetidas (el incidente del 25/8/2026 dejó dos filas del pago
-- 175627733834), el create unique index falla. Revisar con:
--   select substring(note from '\[(?:mp|mercadopago|paypal|stripe):[0-9A-Za-z]+\]') as marca, count(*), array_agg(id order by id)
--   from public.revenue_events
--   where amount > 0 and note ~ '\[(?:mp|mercadopago|paypal|stripe):[0-9A-Za-z]+\]'
--   group by 1 having count(*) > 1;
-- y dejar la fila de id más bajo de cada marca (la misma regla que aplica asentarUnaVez).

set lock_timeout = '5s';

-- revenue_events la creó el panel compartido, no una migración de este repo: en una base armada sólo
-- con estas migraciones (los checks sobre PGlite) no existe y el índice no tiene sobre qué crearse.
do $$
begin
  if to_regclass('public.revenue_events') is null then
    raise notice 'revenue_events no existe: no se crean los índices de venta única';
    return;
  end if;

  execute $sql$
    create unique index if not exists revenue_events_venta_por_pago_key
      on public.revenue_events ((substring(note from '\[(?:mp|mercadopago|paypal|stripe):[0-9A-Za-z]+\]')))
      where amount > 0 and note ~ '\[(?:mp|mercadopago|paypal|stripe):[0-9A-Za-z]+\]'
  $sql$;

  execute $sql$
    create unique index if not exists revenue_events_devolucion_por_pago_key
      on public.revenue_events ((substring(note from '\[(?:mp|mercadopago|paypal|stripe)-devuelto:[0-9A-Za-z]+\]')))
      where amount < 0 and note ~ '\[(?:mp|mercadopago|paypal|stripe)-devuelto:[0-9A-Za-z]+\]'
  $sql$;
end
$$;
