---
paths:
  - "scripts/**"
  - "src/paises/**"
---

# tsx en Windows: correr con TSX_DISABLE_CACHE=1

En Windows, la caché en disco de tsx 4.23 deja abierto ~1 handle por cada `.ts` importado. Con 113
mercados, `cargarPaises()` importa más de 8.000 módulos y el proceso pasa el tope de ~8.192 handles:
todo check que lee el registro (`check_paises`, `check_paises_casos`, `check_motor`,
`check_medicion_mercados`...) muere con `EMFILE: too many open files`, aunque el código esté bien.

- `scripts/check-all.ts` ya lo pasa a cada suite.
- A mano: `TSX_DISABLE_CACHE=1 npx tsx scripts/<check>.ts` (en PowerShell, `$env:TSX_DISABLE_CACHE='1'`).
- Linux (CI, Vercel) no tiene ese tope; el build de Next no usa tsx.

Descubierto el 27/10/2026 al integrar la tanda 7 de países: con 1.500 módulos de prueba, 3.237 handles
con caché contra 231 sin caché.
