alter table public.ca_eventos drop constraint if exists ca_eventos_tipo_check;
alter table public.ca_eventos add constraint ca_eventos_tipo_check check (tipo in (
  'vista_oferta', 'cta_compra', 'dialogo_compra', 'checkout', 'compartir', 'copiar_resultado',
  'guardar_calculo', 'imprimir', 'suscripcion', 'busqueda', 'registro', 'login', 'descarga', 'error',
  'llegada', 'puente_visto', 'puente_clic', 'afiliado_clic'
)) not valid;
alter table public.ca_eventos validate constraint ca_eventos_tipo_check;
