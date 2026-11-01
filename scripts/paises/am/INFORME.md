# Informe del país Armenia (am)

Rama `claude/pais-am`, creada desde `origin/claude/mundo-motor-hy`. **Depende de `claude/mundo-motor-hy`** (idioma `hy`, ADR 0002, D30, `hy` en universales y reglas): hay que integrar antes el motor. Estado del mercado: `interno`. `src/paises/index.ts` no se commiteó.

Mercado: `am`, `AM`, `hy`, `hy-AM`, AMD, `Asia/Yerevan`, escala 400, Հայաստան. Dram sin decimales: `redondeo` 0 y `decimales: 0` en todas las filas locales de moneda.

## Calculadoras locales (21, todas publicables)

| Slug | Concepto | Publicable | Fuente principal |
|---|---|---|---|
| ashkhatavardzi-hashvich | sueldo-neto | sí | Tax Code art. 150, ՀՕ-244-Ն art. 6, ՀՕ-245-Ն art. 12, ՀՕ-459-Ն |
| zut-hamakhar-ashkhatavardz | propio | sí | las mismas (neto a bruto, tramo por tramo) |
| gortatui-tsakhs | costo-empleador | sí | las mismas, ՀՕ-459-Ն art. 14 parte 9 |
| nvazaguyn-ashkhatavardz | salario-minimo | sí | ՀՕ-66-Ն arts. 1, 2, 4 |
| yekamtayin-hark | impuesto-renta | sí | Tax Code art. 150 |
| kutakayin-vchar | aportes-seguridad-social | sí | ՀՕ-244-Ն arts. 5, 6 |
| droshmanishayin-vchar | propio | sí | ՀՕ-245-Ն art. 12, ՀՕ-477-Ն |
| aroghjutyan-apahovagravchar | propio | sí | ՀՕ-459-Ն arts. 13, 14, 45, 46 |
| shrjanarutyan-hark | regimen-simplificado | sí | Tax Code arts. 254, 258 |
| mikrodzernarkatirutyun | propio | sí | Tax Code arts. 267, 269 |
| shahabazhni-hark | propio | sí | Tax Code arts. 125, 149, 150 |
| vardzakalutyan-hark | propio | sí | Tax Code art. 150 parte 7 |
| sepakanutyan-hark | propio | sí | Tax Code art. 229 |
| ardzakurdayin-hashvich | vacaciones | sí | Labour Code arts. 159, 169, 195 |
| hivandutyan-npast | propio | sí | ՀՕ-160-Ն arts. 6, 8, 22 |
| mayrutyan-npast | propio | sí | ՀՕ-160-Ն arts. 6, 11, 22, Labour Code art. 172 |
| artazhamya-ashkhatank | horas-extra | sí | Labour Code arts. 139, 144, 146, 184, 185 |
| ardzakman-npast | indemnizacion-despido | sí | Labour Code arts. 113, 129, 195 |
| tsanutsman-zhamket | preaviso | sí | Labour Code arts. 112, 115 |
| pokharzheki-hashvich | tipo-de-cambio | sí | CBA, CSV oficial |
| gnachi-hashvich | inflacion | sí | Armstat, informes mensuales de IPC |

Universales: las 41, con `iva` ajustada a `am.aah` (20 %). ԱԱՀ queda como universal `aah-hashvich`, no local. Total 62.

## Datos

Todos verificados en fuente primaria el 01/11/2026 (53 tramos, 6 series). No queda ningún dato no verificado. Las leyes se leyeron en la incorporación oficial vigente de ARLIS (`https://www.arlis.am/hy/acts/<id>/latest`), con cambios hasta agosto de 2026. Los `desde` de 2026-01-01 significan «leído en el texto vigente», no fecha de entrada en vigor (salvo el seguro de salud y la estampilla, que sí se leyeron). Por eso los textos no usan `#desde` para esos datos.

- cba.am sigue cortando la conexión, pero `api.cba.am` responde: el tipo de cambio quedó verificado, no en borrador.
- welfare.gov.am y minfin.am no se consultaron para datos (minfin.am falló por TLS en la prueba) y src.am abrió pero no hizo falta: el mínimo y los impuestos se leyeron en la ley misma.
- Salario medio (387 612 dram, sept. 2026): Armstat NSDP, preliminar, es dato de contexto.

## Decisiones y riesgos

1. **Estampilla.** Las cifras que circulaban (1500 a 15 000) ya no rigen: ՀՕ-477-Ն (17/12/2025) dejó 1000 dram hasta 1 000 000 y 15 000 desde 1 000 001.
2. **Seguro de salud universal (ՀՕ-459-Ն), no estaba en el encargo.** Cambia el neto, así que entró: 2026, 0 hasta 200 000, 4800 de 200 001 a 500 000, 10 800 desde 500 001; desde 2027-01-01, 10 800 para todos. La ley dice que en 2026 lo paga el «agente fiscal» y no va en el cálculo mensual, y que el empleador puede asumirlo: no está claro si en 2026 se descuenta siempre del sueldo. Por eso es un si-no con el descuento activado por defecto. **Revisar con ՊԵԿ.** El estatus se mantiene 12 meses aunque baje el sueldo: la calculadora no lo modela.
3. **Mínimo salarial.** ՀՕ-66-Ն art. 4: los 75 000 no incluyen impuestos ni aportes. La calculadora muestra además el bruto que deja 75 000 netos (lectura literal).
4. **Mínimo en la ley de prestaciones.** ՀՕ-160-Ն art. 22 parte 1 lo define como 75 000 más el impuesto «calculado sobre» el mínimo. Se tomó literal: 90 000 (tope por enfermedad 900 000, por maternidad 1 350 000, piso 45 000). Podría ser 93 750 con otra lectura. No afecta a sueldos dentro de los topes; al aplicarse sale una observación. **Riesgo principal de cálculo.**
5. **Empleador.** No hay aporte patronal en las leyes leídas: el costo es el bruto (más el seguro si lo asume).
6. **Deducciones no modeladas:** exenciones del art. 147 y art. 149, beneficios por zona, hipoteca y dependientes; las exenciones de impuesto inmobiliario. Lo dicen los textos.
7. **Art. 150 tiene cambios futuros** (ՀՕ-391-Ն desde 2027-06-01, ՀՕ-385-Ն desde 2027-02-01, y otros por entrar en 2027) que no se leyeron en detalle: `proximaRevision` 2027-01-01 en los datos del artículo. Revisar a principios de 2027.
8. **El sufijo de los slugs** sigue D30. `pokharzheki-hashvich`, `sepakanutyan-hark` (el término legal es «անշարժ գույքի հարկ», el title lo usa). La demanda se estimó por el vocabulario de las fuentes; **no se pudo verificar en Google de Armenia** (WebSearch es de EE. UU.).
9. **Sin revisión de hablante nativo** (igual que el motor, D30): hace falta antes de publicar. El registro de ՊԵԿ quedó por confirmar en D30.

## Pedido al motor

`formatearMoneda` toma los decimales de Intl: el AMD sale con «,00». Las filas locales lo evitan con `decimales: 0`, pero **las universales y `TablaResultado` muestran «75 000,00 ֏»**. Sugerencia: que `mercado.redondeo.decimales` mande en la moneda principal, o un `Mercado.decimalesMoneda`. No lo toqué porque está fuera de mi carpeta.

## Detectores

13 en total, corridos contra las fuentes con `scripts/paises/am/probar_detectores.ts`:

- Serie: USD, EUR, RUB, GBP, GEL por CSV de `api.cba.am` (21 puntos, último 30/10/2026). IPC por `armstat.am/nsdp` (septiembre 2026, encadenado con diciembre).
- Norma: siete leyes de ARLIS; vigilan que siga la cifra cargada y abren hallazgo si cambia. 0 hallazgos.

## Checks

Con el país registrado localmente, el 01/11/2026:

- `tsc --noEmit -p .`: sin errores.
- `check_paises am`: OK, 52 datos, 53 tramos verificados, 0 pendientes, 6 series, 62 calculadoras, 2 avisos.
- `check_paises_casos am`: OK, 74 casos en 21 archivos.
- `check_textos_paises am`: OK, 944 textos, 0 avisos.
- `check_seo_pais am`: OK, 1 aviso (pokharzheki-hashvich, 217 palabras contra el objetivo de 220).
- `check_ofertas_intl am`, `check_fronteras` y `check_eol`: OK.
- `check_motor`: OK, 5111 pruebas.
- `check_mundo`: 1 falla ajena a este país (Bélgica, neto de 24 000 €; no toqué ese país). Armenia no aparece en la salida, ni incluida ni excluida, porque el mercado está en `interno`: hay que volver a correrlo al publicarlo.

Avisos esperables de `check_paises`: el tipo de cambio y el IPC dejan de ser publicables si no corre el cron (series con 10 y 70 días de antigüedad).

No se miró en `next dev`: pide `npm ci` real en el worktree y no aporta sobre los checks; queda para la integración.

La calculadora de sueldo neto declara `mundo` (mensual, con aportes y seguro descontados), pero esa declaración aún no pasó por `check_mundo`.
