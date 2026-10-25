---
paths:
  - "src/motor/seo.ts"
  - "src/motor/registro.ts"
  - "src/motor/mapa.ts"
  - "src/motor/vigencia.ts"
  - "scripts/check_hreflang.ts"
---

# hreflang de calcularya: un clúster igual en todas las páginas

- Los equivalentes de una página (`registro.pagina().equivalentes`, `alternosEnSitemap` de mapa.ts) se
  evalúan con `fechasDelMismoInstante(mercado, fecha)`: cada mercado con su fecha en el mismo instante.
  Nunca `() => fecha` para todos: cerca de la medianoche, un dato que vence en un país (NI, IPC del INIDE,
  2026-10-25) lo sacaba de los clústeres de las páginas que ya estaban en el día siguiente y no del resto,
  y check_hreflang daba ~1.850 fallas «el clúster no lista las mismas páginas».
- Sitemap y `<head>` usan la misma función: si cambia una, cambia la otra.
