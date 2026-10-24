---
paths:
  - "src/motor/sueldos/**"
  - "src/lib/sueldos/**"
  - "src/app/api/sueldos/**"
  - "src/motor/i18n/sueldos.ts"
  - "src/app/(intl)/intl/[mercado]/_sueldos/**"
  - "src/app/(ar)/sueldos-reales/**"
  - "supabase/migrations/*_ca_sueldos*.sql"
  - "scripts/check_sueldos.ts"
---

# «Sueldos reales»: aportes anónimos con k-anonimato

Historia y porqués: `docs/decisiones/sueldos.md`. Gate: `npx tsx scripts/check_sueldos.ts` (PGlite).

- Flujo (migración `20261024150000_ca_sueldos_endurecer`): `ca_sueldos_sumar` → `ca_sueldos_pendientes`
  (con el día) → `ca_sueldos_publicar` una vez por día UTC (pg_cron o la primera lectura) pasa lo de días
  anteriores a `ca_sueldos_aportes` (sin fecha) y rehace la foto `ca_sueldos_publicados`. Toda lectura sale
  de la foto (`ca_sueldos_leer`, `ca_sueldos_paises`). Nunca una lectura en vivo de la tabla cruda: es la
  puerta de la diferenciación.
- El POST responde solo `{ ok }`. Devolver la celda, una cuenta o cualquier cosa recalculada con el aporte
  reabre la diferenciación.
- Nunca la cuenta exacta: tramos `lejos`/`cerca` (sin publicar) y `10-19`/`20-49`/`50+`. Las cifras van al
  múltiplo del 5 % de la mediana (paso a una cifra) y a dos cifras.
- `ca_sueldos_aportes` no lleva IP, user agent, vid, texto libre ni día: solo mes. El día vive solo en
  `ca_sueldos_pendientes` hasta la publicación; de los días queda una cuenta por celda y mes
  (`ca_sueldos_dias`). La huella de IP (HMAC con clave diaria, `huellaDeIp`) se borra al cerrar el día.
- K = 10, 3 días, 2 meses y CERCA = 7 viven en `catalogo.ts` y en `ca_sueldos_calcular`; check_sueldos falla
  si difieren. K se cuenta DESPUÉS de sacar atípicos (3 × IQR con piso del 10 % de la mediana).
- Topes en `ca_sueldos_sumar` (P0001): 3 por huella y día, 1 por huella y celda, 30 por celda y día.
- anon y authenticated no ejecutan ninguna función ni leen ninguna tabla de sueldos. La lectura pública es el
  Route Handler cacheado con la service role. Supabase concede EXECUTE a anon en cada función nueva: toda
  función revoca de `public, anon, authenticated`.
- `celdaDe`/`redondearPublicado` (TypeScript) son el espejo de la SQL; si se toca una, se toca la otra.
- El endpoint rechaza todo igual (`{ ok: false }`, 400): nunca decir por qué. Validación cerrada en
  `motor/sueldos/reglas.ts`.
- Países: los de `grillaMundo()`. `OCUPACIONES` es append-only. Nombre en los diez idiomas obligatorio.
- `?e=` solo acepta ediciones del registro, `ar` y `global` (404 si no).
- La página por país va `noindex` y fuera del sitemap hasta que tenga una ocupación publicada; el sitemap lo
  decide con `paisesConSueldos()` (sin base, afuera). Hreflang solo entre ediciones del mismo país.
- `zh` está en chino tradicional: un mercado zh-CN/zh-SG necesita `regional` en `i18n/sueldos.ts`.
- `SUELDOS_APAGADOS=1` apaga todo sin deploy de código. `SUELDOS_SIMULADOS=1` solo en `next dev`.
