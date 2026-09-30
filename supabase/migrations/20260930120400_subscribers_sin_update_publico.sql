-- La baja por token pasó a hacerse con service role (/api/unsubscribe). Esta policy dejaba a
-- cualquiera con la anon key modificar cualquier fila de subscribers (using true / with check true).
drop policy if exists "unsubscribe by token" on public.subscribers;
