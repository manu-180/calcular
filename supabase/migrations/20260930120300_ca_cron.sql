-- calcular.ar · programa ca_mantenimiento cada hora (s124). Re-ejecutable: cron.schedule con
-- el mismo nombre reemplaza el job.
-- Sin pg_cron no hace nada y lo avisa; en ese caso hace falta un cron de Vercel que llame
-- servicio().rpc("ca_mantenimiento"). Sin ninguno de los dos el panel sigue andando (lee el
-- crudo de lo que no está resumido), pero cada vez más lento.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.schedule('ca_mantenimiento', '7 * * * *', 'select public.ca_mantenimiento()');
  else
    raise notice 'pg_cron no está habilitado: ca_mantenimiento no quedó programado';
  end if;
end $$;
