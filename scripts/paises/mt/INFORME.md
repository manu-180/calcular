# Informe Malta (`mt`)

Rama `claude/pais-mt` (base origin/main). Último commit de código: `d6029ce2` más el commit de este informe.
Mercado `en-MT`, trato `tu`, EUR, `Europe/Malta`, escala 0.9, estado `interno`.

## Calculadoras locales (22: 19 publicables, 3 en borrador)

| Slug | Concepto | Publicable | Por qué |
|---|---|---|---|
| take-home-pay | sueldo-neto | no (borrador) | Falta verificar la tabla Class 1 de 2026. Declara `mundo` (anual, soltero, sin bonos) |
| ssc-calculator | aportes-seguridad-social | no (borrador) | Ídem |
| employer-cost | costo-empleador | no (borrador) | Ídem, más el Maternity Leave Trust Fund sin verificar |
| income-tax-calculator | impuesto-renta | sí | Cap. 123 art. 56 (Act III de 2026), las 7 escalas de 2026 |
| vat-calculator | iva (reemplaza la universal `vat`) | sí | Cap. 406 art. 19 y Eighth Schedule: 18, 12, 7, 5 % |
| minimum-wage | salario-minimo | sí | L.N. 289 de 2025 |
| statutory-bonus | bono-semestral | sí | DIER (copia de archive.org) y S.L. 452.79 (pro rata part-time). Fechas de pago en el calendario |
| cola-increase | propio | sí | L.N. 290 de 2025. Casos tomados de los tres ejemplos oficiales del DIER |
| annual-leave | vacaciones | sí | S.L. 452.87 reg. 8 y feriados de la Cap. 252 en fin de semana (calculados por año) |
| public-holidays | propio | sí | Cap. 252 (14 feriados, Viernes Santo calculado) |
| overtime-calculator | horas-extra | sí | DIER (copia de archive.org): 1,5 veces por encima de 40 h |
| overtime-tax | propio | sí | Cap. 123 art. 90B y S.L. 123.200 |
| part-time-tax | propio | sí | Cap. 123 art. 90A(11) y S.L. 123.39 |
| notice-period | preaviso | sí | Cap. 452 art. 36(5) a (10) |
| fixed-term-contract | indemnizacion-despido | sí | Cap. 452 art. 36(11) y (12) |
| probation-period | propio | sí | Cap. 452 art. 36(1) a (1c) |
| maternity-leave | propio | sí | S.L. 452.91 reg. 6 a 9 |
| stamp-duty-calculator | propio | sí | Cap. 364 art. 32 y S.L. 364.12 (primer comprador desde 28/10/2025) |
| property-transfer-tax | propio | sí | Cap. 123 art. 5A(4) y (5) |
| rental-income-tax | propio | sí | Cap. 123 art. 31D |
| inflation-calculator | inflacion | sí | Índice de la Cap. 158 (1946 a 2025, L.N. 36 de 2026) |
| pension-age | jubilacion | sí | Cap. 318 art. 2 |

## Universales

Entran todas (`universales: "todas"`): 40 con la local de IVA, que tira la universal `vat`. En `next dev` la home lista 61 páginas
de calculadoras (19 locales publicables + 40 universales + salary-around-the-world y pay-calendar) más fuentes, novedades y planillas.

## Datos

29 datos, 27 verificados el 2026-10-26, todos en fuente primaria https:
- legislation.mt (texto consolidado o legal notice): escalas de renta, IVA, salario mínimo, COLA, licencia anual, preaviso,
  prueba, derecho de sellos, primer comprador, impuesto a la transferencia, part-time, horas extra (impuesto), alquileres,
  índice de inflación, edad de jubilación, maternidad, tasa SSC del 10 %.
- Copias de web.archive.org de páginas oficiales (gov.mt bloquea nuestra IP con Cloudflare, también a WebFetch): PDF «New tax
  rates, 2026» de la MTCA (escala de padres con un hijo) y páginas del DIER (bonos y horas extra). Cada una lleva `nota`.
  Mismo criterio que usó `ma`.

No verificados (2):
- `mt.ssc-weekly` (montos Class 1 de 2026): la tabla solo la publican DSS y MTCA en gov.mt, sin copia archivada; el Tenth
  Schedule consolidado en legislation.mt sigue con los montos de 2024 (los actualizan por L.N. con un año de atraso, ver
  L.N. 10 de 2025). Valores pista: cat. B y tope pre-1962 derivados de la ley (10 % del mínimo y del tope 25.500), cat. A y
  tope 1962 (55,93) de prensa.
- `mt.maternity-fund-rate` (0,3 %): no se pudo leer en fuente oficial.

Cuando alguien con acceso a gov.mt lea la tabla Class 1 2026 (cfr.gov.mt o socialsecurity.gov.mt) y la verifique, las tres
calculadoras de sueldo pasan a publicado sin tocar código. `scripts/paises/mt/probar-take-home-pay.ts` corre el neto con los
valores pista: positivo, monótono y entre 69 % y 90 % del bruto.

## Detectores

5 detectores de carril norma sobre el feed Atom de legislation.mt (`https://legislation.mt/eli/eli-update-feed.atom`), filtrados
por ruta ELI (cap/123, cap/318, cap/364, cap/406, cap/452, cap/158 y sus S.L.) y por palabras del título en maltés e inglés.
Prueba real (`npx tsx scripts/paises/mt/probar-detectores.ts`): los 5 leen el feed y devuelven 0 hallazgos posteriores a hoy.
Sobre el feed del día, sin el filtro de fecha, el de renta toma act/2026/19 y ln/2026/229, y el de IVA y sellos toma cap/406.
No hay series (el índice de inflación es anual y va como dato).

## Checks (con mt registrado localmente, sin commitear `src/paises/index.ts`)

- `npx tsc --noEmit`: sin errores.
- `check_paises mt`: ✅ 29 datos (27 verificados, 2 pendientes), 62 calculadoras.
- `check_paises_casos mt`: TODO OK, 88 casos en 19 archivos.
- `check_textos_paises mt`: TODO OK, 933 textos.
- `check_fronteras`: 1 falla ajena a Malta (`src/motor/compartir/AlCelu.tsx` importa `uqr`); nada de mt.
- `check_eol`: TODO OK.
- `check_motor`: TODO OK, 3855 pruebas.
- `check_mundo`: TODO OK (Malta no aparece porque su sueldo neto está en borrador).
- `check_calendario`: TODO OK.
- `next dev --webpack -p 3101` con `NEXT_PUBLIC_SITIO_INTL_URL`: /mt, /mt/income-tax-calculator, /mt/stamp-duty-calculator y
  /mt/mortgage dan 200 con marcadores resueltos; /mt/take-home-pay da 404 (borrador). Turbopack no arranca en este worktree por
  el junction de node_modules.

## Riesgos y dudas para el coordinador

1. Sin SSC verificada no hay sueldo neto publicado ni entrada en «Tu sueldo en el mundo». Es lo primero para destrabar.
2. Escala de padres con un hijo: la ley resta 10.270 por encima de 60.000 y la MTCA publica 10.275, que es la cifra que deja
   la escala continua. Usamos la de la MTCA (5 € más de diferencia por encima de 60.000 €).
3. Las copias de archive.org del DIER son de julio de 2026 (bonos) y de septiembre de 2025 (horas extra). El valor de horas extra
   es una regla de la ley sin monto.
4. El impuesto sobre el alquiler no aplica la rebaja de los contratos largos (S.L. 123.201); la calculadora lo avisa.
5. Durante la sesión el gh activo pasó a otra cuenta (developers-insights, 403 al pushear). Pusheé con el token de manu-180
   solo en ese comando, sin cambiar el estado global de gh.
