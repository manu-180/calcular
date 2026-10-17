# Auditoría de producción · 13/10/2026

Rama `claude/program-audit-production-e5007a`. Cinco auditorías (datos, pagos, venta, seguridad, salud
técnica) y seis frentes de arreglos, integrados y revisados (código y seguridad) antes del PR.

## Estado encontrado

- 840 URLs de los dos sitemaps: todas 200, canonical propio, sin noindex, hreflang sin errores, 0 enlaces rotos.
- Pagos: 14 productos en calcular.ar y 125 en calcularya se pueden comprar; ningún comprador quedó sin entrega.
- Datos AR al día al 13/10. Países con tipo de cambio de 4 a 7 días.
- GitHub Actions frenado desde el 12/10 00:41 UTC por un pago fallido de la cuenta `manu-180`:
  datos-vivos, datos-paises, CI y post-deploy no corren.

## Arreglado en esta rama

- **Calculadoras AR:** ~32 calculadoras leían montos con `Number()` y daban $0 o un resultado
  erróneo con "1.500.000". Ahora usan `parseMonto`; negativos y montos absurdos muestran aviso
  (`ErrorCalculo`). Check nuevo: `check_parseo_montos`.
- **Cambio de mes sin deploy:** `revalidate = 3600` en `src/app/(ar)/layout.tsx` y el mes se elige en
  cada render (~40 páginas y los datos previsionales, asignaciones, casas particulares, tope SIPA).
  Check nuevo: `check_mes_en_render`.
- **Datos vivos:** el cron `/api/cron/datos-vivos` compara IPC, TNA, canasta, calendario INDEC y las
  series de los países; manda mail con Resend; falla en voz alta; corre 12:30 y 19:30 UTC; dispara
  `VERCEL_DEPLOY_HOOK_URL` el día que cambia el mes. Casos de PE, UY, HN, NI, SV y VE que frenaban la
  publicación de datos por depender de la fecha; DOF de México sin 406; semáforo por frecuencia.
- **Datos de países:** corrida local del 13/10 (bo cl cr do gt mx py) mientras Actions está frenado.
- **Pagos:** la descarga valida contra el precio con que se creó la compra (subir un precio ya no
  rompe los enlaces viejos); webhook MP responde 200 a los avisos sin firma y la firma tiene que
  cubrir el id que se procesa; reintento de entrega con fallback al mail del formulario y aviso al
  admin; rate limits; GET del webhook solo admin; email enmascarado en logs.
- **Seguridad:** subscribe con cupo y validación; crons con `cronAutorizado` (falla cerrado);
  unsubscribe en dos pasos + one-click RFC 8058; Next 16.3.8; HSTS con includeSubDomains; sin
  X-Powered-By.
- **Venta AR:** oferta de Mi Sueldo en /aguinaldo, descuentos, salario mínimo y asignaciones; monotributo
  con oferta después del resultado y prefill real; fila de precio y botón arriba en mobile (de ~1.255 px
  a 216 px del inicio de la oferta); un solo complemento por afinidad en /gracias; la oferta de
  indemnización ya no desaparece sin aviso. `vista_oferta` ahora se registra en mobile.
- **calcularya:** header sin desborde a 375 px; redirects de un salto; 404 con `%5C`; 29 calculadoras
  de 8 países ya no inventan un neto con sueldo 0; títulos únicos; og:image con medidas; landing de
  planilla con vista previa, FAQ y precio aproximado en moneda local.

## Pendiente de Manuel

1. **Billing de GitHub** (github.com/settings/billing, cuenta manu-180). Sin eso no corre ningún
   workflow: ni los datos de las 16:00 del INDEC, ni el CI de los PR.
2. **Vercel → calcular-ar → Environment Variables (Production):** `RESEND_API_KEY`, `ADMIN_EMAILS`,
   `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (o `SUPABASE_SERVICE_KEY`) si faltan, y
   `VERCEL_DEPLOY_HOOK_URL` (crear un Deploy Hook de `main` en Settings → Git).
3. **Supabase (proyecto wsmsspeeeujynqornyrj, SQL editor):** revisar duplicados con la consulta que
   trae `supabase/migrations/20261013120000_revenue_events_venta_unica.sql` y aplicar la migración.
   Confirmar que `anon` no puede leer ni insertar en `revenue_events` (la nota de AR guarda el mail del
   comprador):
   `select grantee, privilege_type from information_schema.role_table_grants where table_name = 'revenue_events';`
   y `select * from pg_policies where tablename = 'revenue_events';`
4. **Acceso de lectura a esa base para Claude** (conectar su org al MCP de Supabase o un PAT en envkit):
   sin eso no se pudo auditar RLS ni el embudo real.

## Propuestas que no se hicieron (decisión de producto)

- Mail a los 5 días de la compra pidiendo reseña, y mostrar solo opiniones reales con permiso.
- Pack (por ejemplo Mi Sueldo + informe de Ganancias); hoy la entrega admite un solo archivo.
- Vista por ruta del embudo en el panel (usos, oferta vista, click, checkout, compra).
- CSP con `script-src`: necesita nonce desde `proxy.ts` (vuelve dinámicas las páginas) y allowlist de
  AdSense y GTM; arrancar en Report-Only.
- `check-all` depende de que `gen_planilla_todas.ts` haya corrido antes (los `.mapa.json` de intl son
  artefactos del build).
