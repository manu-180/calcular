# Informe: Surinam (`sr`)

- Rama: `claude/pais-sr` (base origin/main). El último commit es el que agrega este informe; ver `git log -1 origin/claude/pais-sr`.
- Mercado: `sr`, `nl-SR`, trato `tu` (je), SRD con símbolo «SRD» (Intl ponía «$»), `America/Paramaribo`, escala 38, estado `interno`.
- 15 calculadoras locales + 40 universales = **55** (la universal `iva` se cae por la local `btw-berekenen`).

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| bruto-netto-salaris | sueldo-neto | sí | Wet Loonbelasting y Wet AOV; declara `mundo` |
| netto-naar-bruto-berekenen | propio | sí | inversa del neto, mismos datos |
| loonbelasting-berekenen | impuesto-renta | sí | art. 12, 13 y 14 Wet Loonbelasting |
| inkomstenbelasting-berekenen | propio | sí | art. 34 IB 1922 + AOV |
| aov-premie-berekenen | aportes-seguridad-social | sí | art. 19 y 20 Wet AOV (4 % del zuiver loon/inkomen, hasta 60 años) |
| btw-berekenen | iva | sí | Wet BTW 2022 art. 4 (10 %, 0 %, 25 %) y S.B. 2022 no. 148 (5 %) |
| minimumloon-berekenen | salario-minimo | sí | S.B. 2025 no. 33 (52,47) y S.B. 2026 no. 63 (61,25 desde 1/7/2026) |
| overuren-berekenen | horas-extra | sí | Arbeidswet art. 12 y 13 (1,5× y 2×) + art. 17c LB (S.B. 2025 no. 129) |
| vakantiedagen-berekenen | vacaciones | sí | Vacantiewet 1975 art. 7 (12 + 2 por año, máx. 18; 1 por mes el primer año) |
| vakantietoelage-berekenen | propio | sí | Vacantiewet art. 10 (50 %) + exención art. 10 i LB (19.500) |
| bonus-belasting-berekenen | propio | sí | art. 10 j y 17 LB (exención y reparto en 12 períodos) |
| uitkering-ineens-belasting | propio | sí | art. 17a LB (5/15/25/35 %) |
| hypotheekrenteaftrek-berekenen | propio | sí | art. 18 lid 1 g IB (deuda hasta 600.000) |
| huurwaardebelasting-berekenen | propio | sí | Wet Huurwaardebelasting art. 5 y 6 |
| inflatie-berekenen | inflacion | sí | serie `sr.cpi` del ABS |

## Datos (24 datos, 27 tramos, todos verificados el 2026-10-27)

Todo se leyó en el texto oficial: Staatsblad en SRiS (portal de legislación del Ministerio de Justicia), leyes consolidadas en belastingdienst.sr y dna.sr (Asamblea Nacional), IPC en statistics-suriname.org (ABS).

- Loonbelasting: vrije som 108.000/año, aftrek 4 % máx. 4.800, escala 8/18/28/38 (42.000, 84.000, 126.000); 17a; 17c (500/1.100 hasta 30/6/2025, 2.500/7.500 desde 1/7/2025); exención vakantie/bonus 10.016 (2024) y 19.500 (desde 1/1/2025).
- AOV 4 %. IB: escala 0/8/18/28/38 (108.000 … 234.000), hipoteca máx. 600.000.
- BTW 10/5/25 %. Minimumuurloon 52,47 → 61,25. Vacantiewet 12/2/18/50 %. Arbeidswet 1,5 y 2. Huurwaarde 6 %, 1 %, 50.000, mínimo 20.
- Serie `sr.cpi` (base abr-jun 2016 = 100): 123 puntos del GDDS hasta 2026-08 + septiembre 2026 (979,7) del boletín del ABS, que lo marca como voorlopig. El ABS no publicó mayo y junio de 2018: la calculadora avisa si se elige uno de esos meses.
- No verificados: ninguno.

## Detectores (`fuentes.ts`) y prueba real (`scripts/paises/sr/probar_detectores.ts`)

| id | carril | resultado |
|---|---|---|
| sr.cpi-abs | serie (SDMX vía media API del ABS) | ✅ 118 puntos, último 2026-03 = 940,03 |
| sr.sris-loonbelasting | norma (búsqueda SRiS) | ✅ 2 (S.B. 2025 no. 101, S.B. 2026 no. 47) |
| sr.sris-inkomstenbelasting | norma | ✅ 2 |
| sr.sris-minimumloon | norma | ✅ 2 (S.B. 2026 no. 63, 2025 no. 33) |
| sr.sris-arbeid | norma | ✅ 0 |
| sr.belastingdienst-btw | norma (media API) | ✅ 18 |
| sr.belastingdienst-huurwaarde | norma | ✅ 0 |

Los servidores de Surinam cortan la conexión a ratos: en cada corrida fallaron uno o dos detectores distintos por timeout, y los siete devolvieron datos al menos una vez.

## Checks (con sr registrado en local, sin commitear `src/paises/index.ts`)

- `tsc --noEmit`: 0 errores.
- `check_paises sr`: ✅ 24 datos, 27 tramos verificados, 0 pendientes, 55 calculadoras.
- `check_paises_casos sr`: 57 casos en 15 archivos, todo OK.
- `check_textos_paises sr`: 594 textos, 0 avisos.
- `check_fronteras`: 13.272 archivos sin cruces. `check_eol`: todo en LF.
- `check_motor`: 4393 pruebas OK.
- `check_mundo`: TODO OK. Como `interno` no entra a la grilla; con el estado puesto un momento en `publicado`, SR entra como `declarado` con 13,1 % / 33,3 % / 39,1 % (15k/50k/150k dólares PPA). Lo dejé de nuevo en `interno`.
- `next dev` (webpack, puerto 3133): `/sr`, `/sr/bruto-netto-salaris`, `/sr/inflatie-berekenen` y `/sr/hypotheek-berekenen` (universal) devuelven 200 con los marcadores resueltos.

## Riesgos y dudas para el coordinador

1. **AOV sin franquicia**: la Wet AOV (consolidada en belastingdienst.sr, última modificación S.B. 2002 no. 96) dice 4 % del zuiver loon, sin franquicia ni tope. Si hay una franquicia por beschikking, no la encontré.
2. **Pensión (Wet Algemeen Pensioen 2014)**: el texto en SRiS está escaneado y no pude leer el porcentaje de prima. Por eso el neto pide la prima de pensión del empleado como campo opcional (0 por defecto), y no hay calculadora de costo empleador.
3. **Detector del IPC**: el ABS solo subió una vez la serie en XML (03-2026); los meses nuevos salen en xlsx o pdf, que `http.texto` no lee. El detector va a devolver puntos viejos hasta que el ABS publique otro XML. `maxAntiguedadDias` es 100: si nadie actualiza a mano, la inflación sale de lo publicable a principios de enero de 2027. Pedido al motor: un `http.binario` o un lector de xlsx.
4. **Vacantiewet / Arbeidswet**: los textos de dna.sr no indican modificaciones posteriores a 2001 para los artículos usados. Revisé las enmiendas de 2023 (S.B. 2023 no. 123 y no. 125, escaneadas): tocan sanciones y trabajo forzoso, no los días ni los recargos. El cálculo del dagloon de la vakantietoelage (jaarloon / 52 × 5 o 6) es una regla nuestra y la página lo aclara.
5. **Sin opzegtermijn ni ontslagvergoeding**: Surinam está pasando al nuevo Código Civil (Aanpassingswet NBW, S.B. 2024 no. 168) y la Ontslagwet 2018 no estaba en un texto que pudiera leer. No inventé reglas.
6. **CBvS (tipo de cambio)**: el sitio está detrás del desafío de Cloudflare, así que no hay calculadora de wisselkoers.
7. `next dev` con Turbopack no arranca en este worktree (el junction de `node_modules` «apunta fuera del root»); con `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3133` funciona.
