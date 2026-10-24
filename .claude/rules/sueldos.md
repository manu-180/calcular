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

- `ca_sueldos_aportes` no lleva IP, user agent, vid, texto libre ni fecha exacta: solo mercado, moneda,
  ocupación, rango de experiencia, bruto mensual a dos cifras y mes. El `id` es la idempotencia que
  manda el navegador (uuid por envío, se descarta al guardarse). Sumar una columna que identifique o
  ordene en el tiempo (identity, created_at) rompe la promesa de la política de privacidad.
- K = 10 vive en dos lados: `catalogo.ts` y `ca_sueldos_agregados` (`when c.n >= 10`). check_sueldos
  falla si difieren. K se cuenta DESPUÉS de sacar atípicos (3 × IQR por celda), también por experiencia.
- La lectura pública es solo `ca_sueldos_agregados` (security definer, anon). Nunca un grant ni una
  policy sobre la tabla para anon o authenticated. La carga es `ca_sueldos_aportar`, solo service_role.
- Supabase concede EXECUTE a anon en cada función nueva de public por default privileges: toda función
  que no sea pública revoca de `public, anon, authenticated`, no solo de `public`.
- `cifrasDe` (TypeScript) es el espejo de la SQL; si se toca una, se toca la otra (check_sueldos compara).
- El endpoint rechaza todo igual (`{ ok: false }`, 400): nunca decir por qué. Validación cerrada en
  `motor/sueldos/reglas.ts` (claves exactas, consentimiento `ok: true`, país de la grilla, ocupación de la
  lista, monto entre 100 y 150.000 dólares PPA por mes).
- Países: los de `grillaMundo()`. Nada por país a mano: un país nuevo en la grilla acepta aportes solo.
- `OCUPACIONES` es append-only (la base guarda el código). Nombre en los diez idiomas obligatorio.
- El navegador no conoce el trato de la edición: el GET `/api/sueldos/<m>?e=<edición>` lo devuelve. Si
  el GET falla, el módulo no se muestra (y el aporte tampoco: sin base no hay a dónde mandarlo).
- La página por país va `noindex` hasta que tenga una ocupación publicada. El sitemap todavía no la
  lista (ver la decisión).
- `zh` está en chino tradicional: un mercado zh-CN/zh-SG necesita `regional` en `i18n/sueldos.ts`.
- `SUELDOS_APAGADOS=1` apaga todo sin deploy de código. `SUELDOS_SIMULADOS=1` solo en `next dev`.
