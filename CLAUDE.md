@AGENTS.md

# calcular.ar y calcularya.com van juntos

Este repo sirve los dos sitios: calcular.ar (Argentina, `src/app/(ar)`) y calcularya.com (el resto del
mundo, `src/app/(intl)` + `src/motor` + `src/paises`). Todo lo que Manuel pida para uno vale para el otro
aunque nombre solo uno: un arreglo, una mejora de diseño, un texto corregido o una función nueva se lleva
también al otro sitio y a todos sus idiomas, con la misma calidad. Si algo de verdad no aplica al otro
sitio, decirlo en el cierre con el porqué. (Pedido de Manuel, 2026-10-26: «Donde más te rendiría» se
corrigió primero solo en calcular.ar.)

- Países nuevos frenados (`.claude/rules/paises-freno.md`): Google desindexó calcularya el 2/11/2026 por
  publicar 42 países en una semana. Ninguno pasa a publicado hasta que vuelva la señal.
- Costo de Vercel (`.claude/rules/costo-vercel.md`): `revalidate` 86400 y nunca 3600, el mes cambia con
  `/api/cron/mes-nuevo`. Cada deploy son 10-13 min de build que se cobran: los commits se juntan y se
  mergean a la noche para compartir el deploy diario de `datos-paises`; ningún workflow nuevo commitea
  a `main`. Previews sólo con `[preview]`. Máquina de build `basic` fija, sin add-ons pagos.
