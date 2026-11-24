---
paths:
  - "src/paises/**"
  - "scripts/paises/**"
  - "docs/global/**"
  - "docs/paises/**"
---

# No se publica ningún país nuevo en calcularya hasta que Google lo vuelva a indexar

El 2/11/2026 Google sacó del índice casi todo calcularya.com después de publicar 42 países en una
semana (`docs/decisiones/desindexacion-2026-11.md`). Hasta que el informe de los lunes muestre más de
5.000 impresiones por día durante 14 días en «Google, sitio entero»:

- Ningún mercado nuevo pasa a `estado: "publicado"`. Se puede construir y dejar en borrador.
- No se despoda nada de `src/motor/universales/podadas.json`.
- Rankings, horas y mundo se indexan en una edición por idioma (`src/motor/referencia.ts`). No volver a
  recorrer `registro.mercados()` para armar su clúster o su sitemap: va por `clusterDeReferencia`.
- Mantener datos, arreglar locales y corregir textos sigue igual.

Cuando vuelva: un país por semana, y sus universales nacen podadas (se indexan solo si juntan
impresiones por otra vía).
