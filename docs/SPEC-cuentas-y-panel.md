# SPEC — Medición propia, cuentas y panel de calcular.ar (s124, 2026-09-30)

Fuente de verdad para los frentes en paralelo. Si algo acá choca con el código, gana este doc
hasta que el coordinador lo cambie.

## Decisiones (y por qué)

1. **Medición propia en Supabase, sin cookies.** Vercel Web Analytics está apagado (cobra por evento)
   y los `track()` de `@vercel/analytics` que hay en el código son no-ops. Se mide en el proyecto
   Supabase `wsmsspeeeujynqornyrj` (el mismo de `revenue_events`). IDs anónimos: `ca_vid` en
   localStorage (visitante) y `ca_sid` en sessionStorage (sesión, 30 min de inactividad). **No se
   guarda IP ni user agent.** País sale de `x-vercel-ip-country`, dispositivo de un parseo mínimo
   del UA en el servidor (que se descarta). Bots se descartan en el servidor.
2. **Una fila por vista de página** (`ca_vistas`), abierta al cargar y cerrada al salir con tiempo
   activo, interacciones y scroll. Los eventos raros (comprar, compartir, buscar, registrarse) van a
   `ca_eventos`. Así el volumen es ~1,2 filas por vista.
3. **"Usó la calculadora"** = hubo al menos un `input`/`change` en un control de formulario dentro
   de `<main>`. Es genérico: no hay que tocar las 90 calculadoras.
4. **El embudo de compra es propio** (`ca_checkouts`): el uuid de `external_reference` pasa a ser
   la PK del checkout. MercadoPago sigue siendo la fuente de verdad del pago.
5. **Cuentas con Supabase Auth, emails propios.** Los mails de confirmación, enlace mágico y
   recuperación los manda calcular.ar por Resend (`auth.admin.generateLink` → `token_hash` →
   `/auth/confirmar` hace `verifyOtp`). No dependemos del SMTP de Supabase ni de su lista de
   redirects. Toda la auth corre en Server Actions: **cero Supabase en el bundle del cliente**.
6. **"Mail verificado" es nuestro, no de Supabase** (`ca_perfiles.verificado_at`, lo escribe solo
   `/auth/confirmar`). Admin y vinculación de compras lo exigen. Motivo: si el proyecto tiene
   autoconfirm prendido, `email_confirmed_at` no prueba que la persona tenga el buzón, y cualquiera
   podría registrarse con el mail de Manuel y ver el panel.
7. **Las compras quedan en la cuenta y además se siguen mandando por mail.** El mail es el recibo y
   el plan B; la cuenta es la biblioteca (siempre la última versión). **No se exige cuenta para
   comprar**: la conversión ya es 1 de 40, no se le agrega fricción al pago.
8. **Las páginas públicas siguen estáticas.** Nada en el layout lee cookies en el servidor. El
   header sabe si hay sesión por una cookie-pista no sensible (`ca_sesion=1`, no HttpOnly).
   `proxy.ts` sólo corre en `/cuenta`, `/dashboard`, `/login`, `/registro`, `/recuperar`, `/auth`.
9. **Panel `/dashboard` sólo para admins**: `ADMIN_EMAILS` (env, coma) con fallback en código a
   `manunv97@gmail.com`, y además `verificado_at`. Triple barrera: proxy (redirect a
   `/login?next=/dashboard`), página (`requireAdmin`) y datos (service role sólo después del chequeo).
10. **La cuenta de Manuel la crea Manuel** en `/registro` (Claude no crea cuentas con contraseña).
11. **Interruptor `NEXT_PUBLIC_CUENTAS_ACTIVAS`** (`src/lib/funciones.ts`, se inlinea en el build). Apagado:
    no hay medición, ni cuentas, ni panel, ni «Guardar» (las rutas privadas dan 404). Se prende en
    Vercel **después** de aplicar las migraciones y ver `get_advisors` limpio.
12. **El panel lee de `ca_resumen`** (una fila por día × dimensión, HyperLogLog de visitantes,
    histograma de tiempos) y del crudo sólo lo que falta. Lo mantiene `ca_mantenimiento()` cada hora
    (pg_cron si existe + `/api/cron/panel-mantenimiento` en Vercel). Visitantes de varios días: ±3 %.
13. **`ca_checkouts.desde` es una ruta limpia** (dónde se abrió la compra). «Qué página vendió» se
    atribuye en SQL por `vid`: la última página con `cta_compra`/`vista_oferta` antes del checkout.
    «Abrió la compra» cuenta sólo `dialogo_compra`.
14. **El CSS va como archivo aparte** (`inlineCss: false`): medido, Lighthouse móvil 83–88 → 94–95.

## Esquema (tablas en `public`, prefijo `ca_`, RLS enable + force)

| Tabla | Columnas clave | Acceso |
|---|---|---|
| `ca_vistas` | `id uuid pk` (lo genera el cliente), `ts`, `vid uuid`, `sid uuid`, `path text` (≤120, sin query), `ref_host`, `utm_source`, `utm_medium`, `utm_campaign`, `dispositivo` ('movil','tablet','escritorio'), `pais` (2 letras), `activo_ms int`, `interacciones int`, `scroll_pct smallint`, `uso_calc bool`, `user_id uuid null`, `cerrada_at` | sólo service role |
| `ca_eventos` | `id bigint identity`, `ts`, `vid`, `sid`, `vista_id`, `tipo` (enum abajo), `path`, `producto`, `valor numeric`, `props jsonb` (≤2 KB), `user_id` | sólo service role |
| `ca_checkouts` | `id uuid pk` (= uuid de `external_reference`), `ts`, `producto`, `email`, `vid`, `user_id`, `desde`, `estado` ('iniciado','pendiente','pagado','rechazado','reembolsado'), `mp_payment_id`, `monto`, `updated_at` | sólo service role |
| `ca_compras` | `id bigint identity`, `mp_payment_id text unique`, `producto`, `email`, `user_id → auth.users on delete set null`, `monto`, `moneda`, `estado` ('aprobado','reembolsado','contracargo'), `legado bool`, `checkout_id uuid`, `pagado_at`, `created_at`, `updated_at` | `select` propio (`user_id = auth.uid()`) |
| `ca_perfiles` | `user_id pk → auth.users on delete cascade`, `email`, `nombre`, `perfil` ('empleado','empleador','contador','monotributista','estudio','otro'), `novedades bool`, `verificado_at`, `created_at`, `updated_at` | `select` propio; `update` propio **sólo** de `nombre`, `perfil`, `novedades` (grants por columna). Alta y `verificado_at`: service role |
| `ca_calculos` | `id uuid pk`, `user_id`, `path`, `titulo` (≤80), `campos jsonb` (≤8 KB), `resumen` (≤200), `created_at`, `updated_at` | CRUD propio; máx 200 por usuario (trigger) |
| `ca_limites` | `clave text`, `ventana timestamptz`, `n int`, pk (clave, ventana) | sólo service role |

**`ca_eventos.tipo`**: `vista_oferta` · `cta_compra` · `dialogo_compra` · `checkout` · `compartir` ·
`copiar_resultado` · `guardar_calculo` · `imprimir` · `suscripcion` · `busqueda` · `registro` ·
`login` · `descarga` · `error`.

**Funciones** (todas `set search_path = ''`):
- `ca_cerrar_vista(p_id, p_activo_ms, p_interacciones, p_scroll, p_uso)` — sólo sube valores (GREATEST), tope 4 h. service role.
- `ca_limite(p_clave text, p_max int, p_ventana_seg int) returns boolean` — true = permitido. service role.
- `ca_vincular_compras() returns int` — security definer; vincula compras cuyo email = email del usuario, sólo si su perfil está verificado. `authenticated`.
- Trigger en `ca_compras` (insert): si hay perfil verificado con ese email, completa `user_id`.
- `ca_panel(p_desde timestamptz, p_hasta timestamptz) returns jsonb` — todo lo del panel en una llamada (ver `src/lib/panel/tipos.ts`). Buckets en `America/Argentina/Buenos_Aires`. `service_role` únicamente.

## Contratos entre frentes (firmas fijas; la implementación es de cada dueño)

| Módulo | Firma | Dueño |
|---|---|---|
| `src/lib/panel/tipos.ts` | tipos de `PanelDatos` | coordinador |
| `src/lib/supabase/servicio.ts` | `servicio()` → cliente supabase-js con service role | coordinador |
| `src/lib/supabase/servidor.ts` | `clienteServidor()` → cliente con la sesión del usuario (cookies) | coordinador → B |
| `src/lib/panel/datos.ts` | `cargarPanel(rango: Rango): Promise<PanelDatos>` | A |
| `src/lib/limite.ts` | `permitido(clave, max, ventanaSeg): Promise<boolean>` (falla abierta si la DB no responde) | A |
| `src/lib/auth/admin.ts` | `esAdminEmail(email)`, `requireAdmin(next: string): Promise<{ email: string }>` | B |
| `src/lib/auth/sesion.ts` | `usuarioActual(): Promise<{ id, email, verificado } \| null>` | B |
| `src/lib/sesion-cliente.ts` | `haySesion(): boolean` (lee la cookie-pista `ca_sesion`) | B |
| `src/components/SesionLink.tsx` | `<SesionLink />` — «Ingresar» / «Mi cuenta» | B |
| `src/lib/rastreo.ts` (cliente) | `rastrear(tipo: TipoEvento, datos?: { producto?, valor?, props? })` | C |
| `src/lib/rastreo-servidor.ts` | `registrarEvento({ tipo, path?, producto?, valor?, props?, userId?, vid? }): Promise<void>` (nunca tira) | C |
| `src/components/Rastreador.tsx` | `<Rastreador />` montado una vez en el layout | C |
| `src/data/navegacion.ts` | `PAGINAS: Pagina[]`, `tituloDeRuta(path): string` | E |

## Dueños de archivos (nadie escribe fuera de lo suyo)

- **A · Datos** — `supabase/migrations/**`, `src/lib/panel/datos.ts`, `src/lib/panel/lecturas.ts`, `src/lib/limite.ts`, `scripts/check_panel_sql.ts`.
- **B · Cuentas** — `src/proxy.ts`, `src/lib/supabase/servidor.ts`, `src/lib/auth/**`, `src/lib/sesion-cliente.ts`, `src/components/SesionLink.tsx`, `src/components/cuenta/**` (menos `MisCalculos.tsx`), `src/app/{login,registro,recuperar,auth,cuenta}/**`, `src/app/api/cuenta/descargar/**`, `src/lib/email.ts`, `src/lib/entrega.ts`, `src/app/planillas/gracias/page.tsx`, `src/app/robots.ts`.
- **C · Rastreo y embudo** — `src/components/Rastreador.tsx`, `src/lib/rastreo.ts`, `src/lib/rastreo-servidor.ts`, `src/app/api/e/**`, `src/app/api/mp/**`, `src/lib/mp.ts`, `src/lib/mp-webhook.ts`, `src/lib/mp-recupero.ts`, `src/components/{CompraDialogo,PlanillaComprarBtn,BarraCompraMovil,CompartirWhatsApp,EmailCapture,TrackEvento,PlanillaCTA,PlanillaComercioCTA,PlanillaUocraCTA,CatalogoPlanillas}.tsx`, `src/app/planillas/{_producto.tsx,comprar/**}`, `scripts/backfill-*.ts`.
- **D · Panel** — `src/app/dashboard/**`, `src/components/panel/**`, `src/lib/panel/fixture.ts`, `src/lib/panel/formato.ts`.
- **E · Sitio público** — `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/components/buscador/**`, `src/data/navegacion.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/components/{RespuestaPrimero,SelloVerificado,FirmaAutor}.tsx`, `src/app/{sobre,contacto,privacidad,terminos}/**`.
- **G · Herramientas del resultado** — `src/components/herramientas/**`, `src/lib/formulario.ts`, `src/app/api/cuenta/calculos/**`, `src/components/cuenta/MisCalculos.tsx`.
- **Coordinador** — `package.json`, `next.config.ts`, `vercel.json`, este doc, y el montaje de `<Rastreador />` y `<HerramientasCalculo />` en el layout.

## Reglas para todos los frentes

- Nada de `next build` ni otro `next dev`: hay uno corriendo en `http://localhost:3107` (lo levanta el coordinador). Verificar con `npx tsc --noEmit -p .` y con `curl` contra ese dev.
- No commitear: integra el coordinador. Nada de archivos temporales dentro del repo.
- Nunca leer `.env*`. Secretos: `envkit run -- <cmd>` (namespace `calcular-ar`).
- Comentarios: casi cero; sólo el **por qué** no obvio (regla de Manuel). Textos de UI en es-AR, voseo, cálidos, sin jerga.
- Vetos de diseño de Manuel: sin sombras teñidas con el color de marca (sombras negras sutiles), sin marquees, sin fondos planos, sin secciones de relleno, `caret-color: transparent` ya está en el CSS base.
