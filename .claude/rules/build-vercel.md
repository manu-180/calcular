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
- **Build con webpack** (`package.json`) con techo de 6 GB para Node. Turbopack pasaba los 8 GB
  compilando los ~146 países. Dev sigue con Turbopack: toda regla de `turbopack.rules` tiene su
  par en `webpack()` de `next.config.ts`.
- **Sin chequeo de tipos dentro del build** (`typescript.ignoreBuildErrors`): lo corre el CI de
  cada PR. Mergear con `tsc` en rojo rompe tipos sin que Vercel avise.
- `next.config.ts` sólo importa módulos livianos: `calendario/rutas.ts` arrastra el registro
  entero, por eso `SLUG_CALENDARIO` vive en `calendario/slugs.ts`.

Build de producción del 29/10: 8,9 min en 4 núcleos, 10.308 páginas. Si vuelve a acercarse al
límite (log de Vercel: "Out of Memory"), el siguiente paso es sacar páginas del prerender
(`generateStaticParams` → `[]`), no la máquina.
