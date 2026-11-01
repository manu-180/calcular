---
paths:
  - "next.config.ts"
  - "package.json"
  - "vercel.json"
  - "src/motor/secciones.ts"
  - "src/app/(intl)/**"
---

# El build entra en la máquina standard de Vercel (8 GB)

Manuel no usa máquinas turbo ni enhanced (29/10/2026: turbo costó US$36 en 4 días). Si el build
no entra en 8 GB se achica el build, nunca se agranda la máquina. Lo que hoy lo hace entrar:

- **Una ruta por sección, no una carpeta por idioma.** Horas, mundo, rankings, sueldos y
  calendario viven en `src/app/(intl)/intl/[mercado]/i/<seccion>/[seccion]/` y `next.config.ts`
  reescribe ahí cada slug localizado (`src/motor/secciones.ts`, rewrites afterFiles). Una sección
  nueva con slug por idioma se suma a `SECCIONES`; nunca 28 carpetas.
- **Build con webpack** (`package.json`) con techo de 3 GB para Node (`--max-old-space-size=3072`). Con 6 GB, V8 no
  apuraba el GC, la memoria nativa sumaba unos 2 GB más y el contenedor moría con SIGKILL en "Creating an optimized
  production build" desde la tanda 4 (1/11/2026, deploys f4e8e669, 57fee561 y 1d142789). Medido en Windows, sin tope de
  contenedor: pico de 5,02 GB con heap de 3072 y 1 worker; 5,83 GB con 4096 o 6144 y 2 workers. No subir este número. Turbopack pasaba los 8 GB
  compilando los ~146 países. Dev sigue con Turbopack: toda regla de `turbopack.rules` tiene su
  par en `webpack()` de `next.config.ts`.
- **Dos workers en el build** (`BUILD_CPUS=2`, variable de entorno del proyecto en Vercel, production
  y preview): con los 3 que Next elige solo, "Collecting page data" se quedó sin memoria el 31/10/2026
  (SIGKILL) en un build que el día anterior había pasado. Tarda un poco más y entra siempre.
- **Sin chequeo de tipos dentro del build** (`typescript.ignoreBuildErrors`): lo corre el CI de
  cada PR. Mergear con `tsc` en rojo rompe tipos sin que Vercel avise.
- `next.config.ts` sólo importa módulos livianos: `calendario/rutas.ts` arrastra el registro
  entero, por eso `SLUG_CALENDARIO` vive en `calendario/slugs.ts`.

Build de producción del 29/10: 8,9 min en 4 núcleos, 10.308 páginas. Si vuelve a acercarse al
límite (log de Vercel: "Out of Memory"), el siguiente paso es sacar páginas del prerender
(`generateStaticParams` → `[]`), no la máquina.
