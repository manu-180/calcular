---
paths:
  - "src/motor/rankings/**"
  - "src/motor/i18n/rankings.ts"
  - "src/app/(intl)/intl/[mercado]/_rankings/**"
  - "src/app/(intl)/intl/[mercado]/data/**"
  - "scripts/check_rankings.ts"
  - "scripts/rankings/**"
---

# Rankings de países (calcularya)

Historia y porqués: `docs/decisiones/rankings.md`.

- Todo sale de `grillaMundo()`: nunca una lista de países a mano. Un país que entra a la grilla aparece
  solo en los tres rankings, el sitemap, los datos abiertos y check_rankings; uno que sale desaparece.
- `rinde` y `libertad` ordenan igual a un mismo nivel (los dos dependen solo de la tasa efectiva); los
  puestos difieren solo por empates (enteros de dólar contra días). No sumar un ranking «carga» aparte:
  sería el mismo orden.
- Puestos en competición estándar (1, 2, 2, 4) sobre la `clave` = el valor con la precisión que se
  muestra. Si cambia el redondeo de la tabla, cambia la clave, no al revés.
- La frase de posición va en aposición («México, puesto 27 de 41»): sin verbo no hay concordancia que
  romper. El diccionario es impersonal en todos los idiomas: un solo `base`, sin parches de trato.
- La OG vive en `/<m>/<índice>/og?r=&v=` y no debajo de cada ranking: next.config.ts suma las banderas
  al trace de `/intl/*/*/og`. Mover la ruta sin tocar ese trace deja la imagen sin bandera en Vercel.
- `historial/indice.ts` lo escribe `scripts/rankings/foto_mensual.ts`; check_rankings falla si el
  índice y los JSON no coinciden. Sin foto de un mes anterior no se muestra variación.
- Datos abiertos solo en global (`/data/country-rankings.{json,csv}`, regla en hosts.ts). Agregar
  claves, nunca renombrar: hay quien consume el archivo.
- Una función exportada desde `RankingCliente.tsx` ("use client") no se puede llamar en el servidor:
  lo compartido va en módulos puros (`franja.ts`, `vista.ts`).
