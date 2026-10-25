# Universales en danés (da): las 41 calculadoras

Depende de la rama del motor `claude/mundo-motor-eu` (sin mergear): ahí está el danés en IDIOMAS,
sitio, venta, inicio y el mercado de prueba `dk` en `scripts/check_universales.ts`. Mergear esta rama
después del motor.

## Qué incluye

- `src/motor/universales/<id>/textos/da.ts` (`textosDa`) y `contenido/da.ts` (`contenidoDa`) para las
  41 universales, registro «du», vocabulario de Dinamarca (boliglån, ydelse, afdrag, ÅOP, moms,
  avance, dækningsgrad, nulpunktsomsætning, timeløn, termin, ægløsning, fliser).
- Cableado de los 41 `index.ts` con `npx tsx scripts/gen_idiomas_universales.ts`.
- Slugs ASCII (æ → ae, ø → oe, å → aa), sin repetirse: laaneberegner, effektiv-rente,
  boliglaansberegner, leje-eller-koebe, renters-rente, renteberegner, opsparingsberegner,
  pensionsopsparing, afbetal-kreditkortgaeld, budget-50-30-20, bufferopsparing, biludgifter,
  afkastberegner, avanceberegner, nulpunktsberegner, beregn-timepris, timeloen-til-maanedsloen,
  loenstigning, beregn-arbejdstimer, momsberegner, procentberegner, procentvis-aendring, reguladetri,
  rabatberegner, drikkepenge, del-udgifter, vaegtet-gennemsnit, aldersberegner, dage-mellem-datoer,
  laeg-dage-til-dato, bmi-beregner, kalorieberegner, terminsberegner, aegloesningsberegner,
  loebetempo, braendstofberegner, beregn-elforbrug, hvor-meget-maling, kvadratmeterberegner,
  fliseberegner, betonberegner.
- «lønberegner» y «løn efter skat» quedan libres para la calculadora local de sueldo neto de Dinamarca.

## Decisiones

- Sin «kroner» en textos visibles: el mercado de prueba danés con XCD usa las mismas páginas.
- Propina: en `dk` dice que es voluntaria (servicio incluido en el precio); fuera de DK, texto neutro.
- Combustible: la cuenta sigue en l/100 km; el texto explica km/l, que es como se da en Dinamarca.
- Ejemplos de sueldo con 37 horas semanales; la cuenta por defecto de `definicion.ts` no cambia.
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, con la oración de que no reemplaza
  la consulta (læge, diætist, jordemoder).
- No hizo falta tocar `scripts/check_universales.ts`: el motor ya trae los mercados de prueba `dk` y
  `vc` en danés.

## Checks

- `npx tsx scripts/check_universales.ts`: 41 universales, 4330 casos probados, verde.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsx scripts/check_eol.ts`: 8184 archivos en LF, OK.
- `npx tsc --noEmit -p .`: 0 errores en universales. Quedan 10 errores del núcleo a medio armar en la
  rama del motor (gramatica.ts sin `da`, nb sin registrar, mundo.ts y rutas.ts sin pl/sv/da,
  compartir.ts, embed.ts, `informe-calculo` en pagos/textos da/pl/sv). No son de este frente.

## Pendientes y riesgos

- Los errores de `tsc` del núcleo se resuelven en `claude/mundo-motor-eu`.
- Al mergear junto con otras ramas de traducción, los `index.ts` van a chocar: se resuelve corriendo
  `npx tsx scripts/gen_idiomas_universales.ts`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
