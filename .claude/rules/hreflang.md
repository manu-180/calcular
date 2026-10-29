---
paths:
  - "src/motor/seo.ts"
  - "src/motor/registro.ts"
  - "src/motor/mapa.ts"
  - "src/motor/vigencia.ts"
  - "scripts/check_hreflang.ts"
  - "scripts/check_poda.ts"
  - "scripts/poda-universales.ts"
  - "src/motor/universales/poda.ts"
---

# hreflang de calcularya: un clúster igual en todas las páginas

- Los equivalentes de una página (`registro.pagina().equivalentes`, `alternosEnSitemap` de mapa.ts) se
  evalúan con `fechasDelMismoInstante(mercado, fecha)`: cada mercado con su fecha en el mismo instante.
  Nunca `() => fecha` para todos: cerca de la medianoche, un dato que vence en un país (NI, IPC del INIDE,
  2026-10-25) lo sacaba de los clústeres de las páginas que ya estaban en el día siguiente y no del resto,
  y check_hreflang daba ~1.850 fallas «el clúster no lista las mismas páginas».
- Sitemap y `<head>` usan la misma función: si cambia una, cambia la otra.
- Universales podadas (`src/motor/universales/podadas.json`, `registro.podada`): siguen publicadas pero
  `equivalentes()` las saltea y su propia `pagina().equivalentes` sale vacía. Así el clúster sigue
  recíproco sin ellas; por eso `check_hreflang` las deja fuera y `check_poda` revisa sitemap, `<head>` y
  `noindex, follow`. No filtrarlas en `calculadorasPublicables`: daría 404 a quien llega por un link.
