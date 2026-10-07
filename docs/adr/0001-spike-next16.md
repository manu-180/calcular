# Spike de ruteo por dominio en Next 16.3.7 (ADR 0001, supuestos de la sección 2)

| Campo | Valor |
|---|---|
| Fecha | 2026-10-07 |
| Versiones | `next@16.3.7`, `react@19.2.4`, `react-dom@19.2.4` (las del repo), Turbopack |
| App de prueba | Descartable, fuera del repo (scratchpad de la sesión, carpeta `spike-multidominio`). Mismo esquema que el ADR: `(ar)` y `(intl)/intl/[mercado]` con root layouts distintos |
| Cómo se probó | `next build && next start` (no dev), `curl -H "Host: ..."` y el Browser pane contra `localhost:PUERTO` (AR) y `calcularya.localhost:PUERTO` (intl) |

## Resumen

| # | Supuesto del ADR | Resultado |
|---|---|---|
| 1 | `<Link>` entre páginas de calcularya funciona con rewrite por `host` | **Sí** |
| 2 | El rewrite deja pasar `/_next/*` | **Sí con allowlist de mercados. No con la regex amplia del ADR** |
| 3 | `sitemap.ts` dentro de `[mercado]` | **No.** Plan B con route handler: **sí** |
| 4 | `dynamicParams = false` usa el `not-found.tsx` del grupo intl | **No.** Da 404, pero con el 404 genérico de la raíz. Plan B probado |
| 5 | Build pasa con `generateStaticParams` vacío | **Sí** (con una salvedad sobre las hojas) |
| Extra | Dos root layouts con `lang` distinto, recarga completa al cruzar | **Sí** |

Hay además cuatro hallazgos que el ADR no anticipaba (sección «Hallazgos fuera de las cinco preguntas»), el más importante: **el 404 de URLs inexistentes de Argentina cambia** al mover AR a un route group.

## Configuración que se probó

```ts
const hostIntl = [{ type: "host", value: "calcularya.localhost" }];
rewrites: { beforeFiles: [
  { source: "/intl/:path*", has: hostIntl,     destination: "/intl/intl/:path*" },   // /intl directo da 404 en intl
  { source: "/intl/:path*", missing: hostIntl, destination: "/__no_existe/:path*" }, // y en AR
  { source: "/",            has: hostIntl, destination: "/intl/global" },
  { source: "/robots.txt",  has: hostIntl, destination: "/intl/robots.txt" },
  { source: "/sitemap.xml", has: hostIntl, destination: "/intl/sitemap-ts" },
  { source: "/:mercado(uy|pe)/:path*", has: hostIntl, destination: "/intl/:mercado/:path*" },
]}
redirects: [
  { source: "/aguinaldo",                 has: hostIntl,     destination: "<origen AR>/aguinaldo",           permanent: true },
  { source: "/:mercado(uy|pe)/:path*", missing: hostIntl, destination: "<origen intl>/:mercado/:path*", permanent: true },
]
```

Tabla «Comportamiento por dominio» del ADR, verificada con `curl -H "Host: ..."` sobre el build de producción:

| Pedido | calcular.ar (`localhost`) | calcularya (`calcularya.localhost`) |
|---|---|---|
| `/` | 200, `lang="es-AR"` | 200, rewrite a `/intl/global` |
| `/aguinaldo` | 200 | 308 al origen AR |
| `/uy/aguinaldo` | 308 al origen intl | 200, `lang="es-UY"` |
| `/uy`, `/pe/gratificacion` | 308 | 200 |
| `/intl/uy/aguinaldo` | 404 | 404 |
| `/robots.txt`, `/sitemap.xml` | 404 (en el spike AR no tiene) | 200 (route handlers de `/intl`) |
| `/pixel.svg` (archivo de `public`) | 200 | 200 |
| `/xx/foo` (mercado no publicado) | 404 | 404 |

El tipo `host` compara solo el hostname: `value: "calcularya.localhost"` coincidió con `Host: calcularya.localhost:3401`. No hay que escribir el puerto.

## 1. Navegación con `<Link>` bajo rewrite por host: SÍ

Prueba: build de producción, `http://calcularya.localhost:3401/uy/aguinaldo` en el Browser pane. Una variable `window.__spa` puesta a mano y un `Date.now()` guardado en `window` por un componente cliente sirven de testigo: si hay recarga completa, desaparecen.

| Clic en | Resultado | `window.__spa` | Entradas de navegación |
|---|---|---|---|
| `<Link href="/uy/sueldo">` | URL `/uy/sueldo`, h1 nuevo | sigue | 1 |
| `<Link href="/uy/aguinaldo">` | URL `/uy/aguinaldo` | sigue | 1 |
| `<Link href="/uy">` (home del mercado) | URL `/uy`, h1 y header correctos | sigue | 1 |
| `<Link href="/pe/gratificacion">` (otro mercado) | URL `/pe/gratificacion`, `html lang` pasa a `es-PE`, header `pe` | sigue | 1 |

- Soft navigation sin recarga y sin 404 en los cuatro casos, incluido el cruce uy a pe (mismo root layout, otro valor del segmento dinámico).
- El router pide la URL pública (`/uy/sueldo?_rsc=...`, 200) y el servidor reescribe. En el Network aparecen `fetch /uy/aguinaldo?_rsc=... 200`, `/uy/sueldo?_rsc=... 200`, `/pe/gratificacion?_rsc=... 200`.
- Cruce de dominio con `<Link>` (relativo, p. ej. `<Link href="/uy/aguinaldo">` en una página de AR): el 308 apunta a otro origen, el `fetch` RSC no puede seguirlo, y Next cae a **navegación completa**. Llega bien a destino (`http://calcularya.localhost:3401/uy/aguinaldo`, `lang="es-UY"`, `window.__spa` se pierde). Lo mismo en sentido inverso (`<Link href="/aguinaldo">` desde intl llega a `localhost:3401/aguinaldo`, `lang="es-AR"`). Es el comportamiento esperado y correcto; conviene `<a>` o `prefetch={false}` en links entre dominios para no gastar prefetches que terminan en 308.

El plan B del ADR (`<a>` plano entre calculadoras de intl) **no hace falta**.

## 2. `/_next/*` bajo el rewrite: SÍ con allowlist, NO con la regex amplia

Con la regla por lista de mercados publicados (`/:mercado(uy|pe)/:path*`), en el navegador y en la página de `/uy/aguinaldo`:

- `/_next/static/*.css` 200 (el h1 toma el color del CSS: `rgb(204, 0, 0)`), 7 chunks `/_next/static/*.js` 200, `/pixel.svg` 200, `fetch ?_rsc=` 200. Ningún 404.

Se probó también la regla amplia del ADR, `/:path((?!_next/|api/|og).*)` con `has: host`, y una regla sin exclusión `/:path*`:

| Regla en `beforeFiles` | `/_next/static/*.css` y `.js` | `/pixel.svg` (de `public`) | `/robots.txt` y `/sitemap.xml` ya reescritos |
|---|---|---|---|
| Allowlist `/:mercado(uy\|pe)/:path*` | 200 | 200 | 200 |
| `/:path((?!_next/\|api/\|og).*)` | 200 | **404** | **404** |
| `/:path*` | **404** | 404 | 404 |

Dos causas, ambas del orden de evaluación de Next:

1. `beforeFiles` corre **antes** que `public/` y que `_next/static`, así que una regex amplia se come cualquier archivo de `public` (`pixel.svg`, `ads.txt`, íconos) salvo que se excluya uno por uno.
2. **Los rewrites encadenan**: `/robots.txt` pasa a `/intl/robots.txt`, y esa ruta vuelve a evaluarse contra las reglas que siguen. La regex amplia (y la regla `/intl/:path*` si queda después) la reescribe de nuevo a `/intl/intl/robots.txt` y da 404.

Plan B del ADR («listar solo los prefijos válidos») **es el único válido**: queda como decisión, no como contingencia. La lista de mercados se genera desde el registro (solo publicados). Orden obligatorio: las reglas de `/intl/*` (404 directo) primero, las específicas (`/`, robots, sitemap, páginas globales) después, y la de mercados al final.

## 3. `sitemap.ts` dentro de `[mercado]`: NO. Route handler: SÍ

- `[mercado]/sitemap.ts` compila, pero el build lo lista como `/intl/-/sitemap.xml` (el segmento dinámico se reemplaza por un guion literal, sin expandir `generateStaticParams`).
- En runtime, `/uy/sitemap.xml` y `/pe/sitemap.xml` devolvieron **el mismo XML** (la URL `https://calcularya.com/uy/aguinaldo` en ambos). La función de `sitemap.ts` no recibe el segmento `mercado`; la doc local de `sitemap.md` no documenta ningún `params`. No sirve para un sitemap por mercado.
- Plan B: `src/app/(intl)/intl/[mercado]/sitemap.xml/route.ts` con `GET(_req, { params })` y `export const dynamic = "force-static"`. Resultado con el rewrite por host:
  - `curl -H "Host: calcularya.localhost:3401" /uy/sitemap.xml` devuelve `200`, `content-type: application/xml`, con las URLs de `uy` (`aguinaldo`, `sueldo`).
  - `/pe/sitemap.xml` devuelve solo `https://calcularya.com/pe/gratificacion`.
- Matiz: el build lista solo `/intl/-/sitemap.xml` y los mercados se sirven **en demanda** (sin `Cache-Control` ni `x-nextjs-cache`): el `generateStaticParams` del route handler no se expandió. Para un sitemap que casi nadie pide (los rastreadores, unas pocas veces por día) alcanza; si se quiere cache de CDN, agregar `Cache-Control` explícito en la respuesta del handler.
- Los route handlers de nivel `/intl` (`robots.txt`, `sitemap-ts`) con `export const dynamic = "force-static"` sí salen estáticos (`○` en el build). Sin esa línea salían dinámicos (`ƒ`).

## 4. `dynamicParams = false` y 404: el `not-found.tsx` del grupo NO se usa

Probado en producción, con status siempre **404** (nunca 200):

| Caso | Qué se ve | Status |
|---|---|---|
| `[slug]` con `dynamicParams = false`, slug desconocido (`/uy/zzz`) | **No** el `not-found.tsx` de `[mercado]`. Cae al 404 de la raíz: `app/not-found.tsx` si existe (HTML real con su `<html>`); si no existe, el 404 por defecto de Next sin `lang` ni chrome. Si hay un catch-all en `(ar)`, el 404 con **chrome y `lang` de Argentina**, en el dominio de calcularya | 404 |
| Mercado inexistente con `dynamicParams = false` en el layout | Igual: 404 de la raíz | 404 |
| `notFound()` explícito en una página con params prearmados (`/uy/bloqueada`) | **Sí** el `not-found.tsx` más cercano (el de `[mercado]`: header intl, `lang="es-UY"`) | 404 |
| `dynamicParams = true` en la hoja + `notFound()` si el slug no está en el registro (`/uy/alt/zzz`, `/uy/p/zzz`) | **Sí** el `not-found.tsx` más cercano, con header intl y `lang="es-UY"` | 404 (render en demanda, `x-nextjs-cache: MISS`) |

Hallazgo clave: **`export const dynamicParams = false` en el layout `[mercado]` anula el `dynamicParams = true` de las hojas**. Con ambos, el slug desconocido terminó en el 404 de la raíz (log del servidor: `Error: Internal: NoFallbackError`). Para que funcione el plan B hay que **sacar `dynamicParams = false` del layout**.

Plan B que funcionó, para que un slug inexistente muestre el 404 de intl:

- Layout `[mercado]`: `generateStaticParams` (solo mercados publicados) **sin** `dynamicParams = false`. Como las reglas de `next.config` ya solo dejan pasar mercados publicados y `/intl/*` directo da 404, un mercado inexistente no llega al layout.
- Página `[slug]`: `dynamicParams = true` y `if (!registro.tiene(mercado, slug)) notFound()`.
- Costo: cada URL desconocida de un mercado válido ejecuta una función (el 404 no se cachea). Con `dynamicParams = false` es gratis pero muestra el 404 genérico de la raíz. Decisión de producto: 404 con marca a cambio de una invocación por URL inexistente.

Nota técnica: en las respuestas de `notFound()` lanzado desde un render, el HTML crudo que entrega el servidor es el cascarón `<html id="__next_error__">` y la UI del 404 se pinta en el cliente (en el navegador se ve bien). Se comprobó con una **app de control de un solo root layout** (misma versión de Next): `notFound()` en una página da el mismo cascarón, mientras que una URL que no coincide con ninguna ruta da HTML real. No es un efecto de la arquitectura multi-dominio; el status HTTP es 404 en todos los casos.

## 5. Build con `generateStaticParams` vacío en el layout intl: SÍ

Prueba: `GLOBAL=0 MERCADOS= next build` (el layout `[mercado]` devuelve `[]`, con `dynamicParams = false` en el layout y en `[slug]`) y reglas de rewrite todavía apuntando a `uy|pe`.

- **El build pasa** (exit 0, sin warnings ni errores). Rutas: `/intl/[mercado]` y `/intl/[mercado]/[slug]` quedan como `●` sin ninguna página generada.
- En `next start`: `calcularya` `/`, `/uy`, `/uy/aguinaldo`, `/pe/gratificacion` dan **404**; `localhost` (AR) `/` y `/aguinaldo` dan **200** sin cambios. El log registra `Error: Internal: NoFallbackError` por cada pedido a una ruta no generada (ruido, no falla).
- Salvedad: cada hoja con su propio `generateStaticParams` sigue generando sus rutas aunque el layout devuelva `[]` (`/intl/uy/alt/aguinaldo` salió `200` con el layout vacío). Para «apagar» el árbol, **todos** los `generateStaticParams` (layout y hojas) deben leer el mismo registro filtrado.
- Conclusión: el plan B del ADR («generar siempre `global` y que su página haga `notFound()`») **no hace falta**.

## Extra: dos root layouts con `lang` distinto y recarga completa

- `curl`: `localhost` devuelve `<html lang="es-AR">` con `HEADER-AR`; `calcularya` devuelve `<html lang="es-UY">` / `es-PE` con `HEADER-INTL`.
- Cruzar entre árboles (en la práctica, entre dominios): `<Link>` desde AR a `/uy/aguinaldo` y desde intl a `/aguinaldo` terminan en navegación completa (el marcador `window.__spa` se pierde, cambian `lang` y `data-root`). Es lo esperado entre dos root layouts, y acá se suma que el destino está en otro origen.
- Dentro del árbol intl, cambiar de mercado (uy a pe) **no** recarga: es soft navigation y React actualiza `<html lang>`. Si se quiere recarga completa al cambiar de país, hay que usar `<a>` o `window.location`.

## Hallazgos fuera de las cinco preguntas

1. **El 404 de AR cambia.** Hoy AR no tiene `not-found.tsx` y un URL inexistente se muestra dentro del root layout actual (header, footer, `lang="es-AR"`; la app de control de un solo layout lo confirma). Con dos root layouts no hay un layout común: una URL que no coincide con ninguna ruta usa `app/not-found.tsx` (que debe traer su propio `<html>`; funcionó, HTML real, 404, `noindex`) o el 404 por defecto sin `lang` ni chrome. Dos salidas probadas:
   - `app/not-found.tsx` neutro con su `<html lang>`: estático y gratis, pero **ya no tiene la marca de AR**.
   - Catch-all `(ar)/[...rest]/page.tsx` que llama `notFound()` + `(ar)/not-found.tsx`: conserva el chrome de AR (se ve bien en el navegador, `lang="es-AR"`), pero (a) el build lo marca `ƒ` (cada URL inexistente de AR ejecuta una función, contra el principio de visitante anónimo gratis) y (b) captura también los 404 de intl que no resuelven y los muestra con chrome argentino en calcularya.
   - La alternativa oficial, `global-not-found`, es experimental y el ADR ya la descartó. Hay que **decidir con Manuel** cuál de las dos salidas se acepta; el gate `check_rutas_ar` debería incluir una URL inexistente de AR.
2. **Los rewrites encadenan** (sección 2): el orden en `beforeFiles` es parte del contrato y `check_routing_hosts.ts` debe probar `/robots.txt` y `/sitemap.xml` de calcularya, no solo las páginas.
3. **Hay que declarar `dynamic = "force-static"` en los route handlers de intl** (`robots.txt`, índice de sitemaps), o salen dinámicos.
4. El tipo `host` ignora el puerto, así que las mismas reglas valen para `calcularya.localhost:3000` en local y para `calcularya.com` en producción con solo cambiar `value`.

## Qué obliga a cambiar el ADR

| Dónde | Cambio |
|---|---|
| Sección 2, tabla «No confirmado» | Reemplazar por los resultados de este documento: 1 confirmado; 2 confirmado solo con allowlist; 3 y 4 con plan B; 5 confirmado |
| D2, regla de mercados | La regla de rewrite por host es **allowlist de mercados publicados**, nunca regex amplia. Documentar el orden (404 de `/intl/*`, específicas, mercados) y que los rewrites encadenan |
| D2, estructura de `src/app` | `sitemap` por mercado: `[mercado]/sitemap.xml/route.ts` (con `force-static` en los handlers de `/intl`), no `sitemap.ts` |
| D2, `generateStaticParams` / `dynamicParams` | **No** poner `dynamicParams = false` en el layout `[mercado]`. En `[slug]`, elegir entre `false` (404 genérico, costo cero) o `true` + `notFound()` (404 con marca intl, una función por URL desconocida) |
| D2 / árbol apagado | Quitar el plan B de «generar siempre `global`». Con `generateStaticParams` vacío el build pasa; solo asegurar que layout y hojas lean el mismo registro filtrado |
| D1, atributo «No romper Argentina» | Declarar el cambio del 404 de URLs inexistentes de AR y decidir la salida (neutro estático o catch-all dinámico). Agregar una URL inexistente de AR a `check_rutas_ar` |
| Plan fase 0.3 | Marcar el spike como hecho con la tabla resumen de arriba; sumar a `check_routing_hosts.ts` los pedidos de robots, sitemap, `_next/static` y un archivo de `public` en el host de calcularya |
