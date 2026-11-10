---
paths:
  - "src/paises/*/series.json"
  - "src/paises/**/*.casos.ts"
  - "scripts/datos-paises/**"
  - "scripts/check_paises_casos.ts"
---

# Los casos ven las series como estaban el día del caso (`altas`)

Un punto de serie se fecha por su período, no por cuándo se publicó: el IPC de octubre es
`2026-10-01` y sale en noviembre. Un caso del 8/10 que dice "usa el último, el de setiembre" veía el
de octubre apenas entraba, `check_paises_casos` daba rojo y la puerta de `datos-paises` revertía
todos los datos nuevos del país. Del 27/10 al 09/11 quedaron así 28 países.

- `datos-paises` anota en cada serie `"altas": [["día del alta", "primer punto de la tanda"]]` al
  publicar (`agregarPuntos(..., hoy)`). No borrar ni reordenar altas: son la memoria de qué se sabía.
- `check_paises_casos` resuelve cada caso con `serieConocidaAl(serie, caso.fecha)`: no ve los puntos
  de un alta posterior a la fecha del caso. El sitio en producción no usa `altas`.
- Un punto agregado a mano sin alta vuelve a romper los casos fechados antes: si se carga a mano,
  sumar el alta con la fecha del día.
- Un caso nuevo se escribe contra los datos que hay hoy y con `fecha` de hoy.
