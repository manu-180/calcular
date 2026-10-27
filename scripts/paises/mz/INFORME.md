# Moçambique (mz): informe del agente

- Rama: `claude/pais-mz` (base origin/main). Último commit de código: `2432d0b1`; este informe va en el commit siguiente.
- Mercado: `pt-MZ`, trato `usted` (como Angola y la fila de PAISES.md), MZN con símbolo `MT`, escala 64, estado `interno`.
- 61 calculadoras: 21 locales (19 publicables y 2 en borrador) y 40 universales (`todas: true`, ninguna excluida; la universal de IVA se cae sola porque hay una local).

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| salario-liquido | sueldo-neto | sí | INSS 3 % + tabla de retención del IRPS (art. 65-A), con 0 a 4+ dependientes. Declara `mundo` (12 pagas) |
| calcular-irps | impuesto-renta | sí | tabla del art. 65-A (Lei 11/2025) |
| calcular-iva | iva | sí | 16 %, retirar según art. 34 (÷116 ×100) |
| calcular-ispc | regimen-simplificado | sí | Lei 9/2025: 3/4/5 % comercio, 12 % servicios, 15 % liberales, 20 % sobre el exceso de 4 M, mínimo 500 MT |
| contribuicao-inss | aportes-seguridad-social | sí | TCO 3 % + 4 %, TCP 7 % (páginas del INSS) |
| custo-do-trabalhador | costo-empleador | sí | salario + 4 % INSS |
| dias-de-ferias | vacaciones | sí | art. 108: 12 días el primer año, 30 después, 1/mes en contratos de 3 a 12 meses |
| horas-extraordinarias | horas-extra | sí | art. 125: +50 % hasta las 20 h, +100 % después; límites del art. 99 |
| trabalho-nocturno | propio | sí | art. 125.3: +25 % |
| trabalho-em-feriado | propio | sí | art. 125.2: +100 %; descanso compensatorio del art. 98.4 |
| indemnizacao-por-despedimento | indemnizacion-despido | sí | art. 141.3: 30/15/5 días por año según salarios mínimos del sector (el mínimo lo ingresa la persona) |
| rescisao-com-justa-causa | propio | sí | art. 139: 45 días por año, fracción proporcional, multa de 7 días sin aviso |
| aviso-previo | preaviso | sí | arts. 140 y 142: 15/30 días, 30 a plazo cierto, 30 del empleador |
| licenca-de-maternidade | propio | sí | arts. 14 y 15: 90 días (hasta 20 antes del parto), paternidad 7 |
| periodo-probatorio | propio | sí | art. 48 |
| limite-de-descontos | propio | sí | art. 124.4 (un tercio) y 123.1 (25 % en especie) |
| cambio-metical | tipo-de-cambio | sí | series USD/EUR/ZAR compra y venta del Banco de Moçambique |
| atualizar-valor-inflacao | inflacion | sí | inflación mensual del Banco de Moçambique (abr. 2022 a ago. 2026) |
| calcular-sisa | propio | sí | Decreto 46/2004, art. 10: 2 % (10 % paraísos), sobre el mayor entre precio y valor patrimonial |
| salario-minimo | salario-minimo | no (borrador) | ningún dato verificado: no encontré en fuente oficial los diplomas de 2025 ni los de 2026 (vigentes desde el 1/4/2026) |
| imposto-mais-valias | propio | no (borrador) | dato verificado (art. 54-A), pero la tabla viene sin parcela a abater y no está claro si la tasa va por escalones o sobre el total |

## Datos

Verificados hoy (2026-10-26), 53 de 54, todos en fuente primaria https:
- Boletim da República I Série n.º 248 (29/12/2025, Leis 9, 10 y 11/2025), publicado por la AT en `www.at.gov.mz/api/webdav?...BR_248_I_SERIE_SUPLEMENTO_2025.pdf`: tablas de retención del IRPS (5 escalas, una por cantidad de dependientes), mais-valias, IVA, ISPC.
- Lei n.º 13/2023 (Lei do Trabalho), copia del BR en el sitio del INSS (`inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-...pdf`): 33 datos laborales.
- INSS: `taxa-contributiva-tco`, `-contribuinte`, `-tcp`.
- Código da Sisa (Decreto 46/2004) en el sitio de la AT.

No verificado (1): `mz.salario-minimo`. Cargué como pista los valores de 2025 de un resumen de DLA Piper (secundaria, con `hasta` el 2026-03-31). Los de 2026 se aprobaron el 28/4/2026 con efecto desde el 1/4, pero solo los vi en prensa y sin montos.

Series (Banco de Moçambique, `www.bancomoc.mz/bmapi/...`): `mz.{usd,eur,zar}-{compra,venda}` (diarias, un punto del 26/10/2026) y `mz.inflacao-mensal` (52 meses, variación mensal en %).

## Detectores (7, todos de serie)

- `mz.{usd,eur,zar}-{compra,venda}-bm`: `/bmapi/exchangerates` (JSON, solo el día en curso; la fecha sale de `lastUpdate`). Banda USD 50 a 100, EUR 50 a 120, ZAR 2,5 a 6, salto del 5 %.
- `mz.inflacao-mensal-bm`: `/bmapi/inflation-rates/monthly`. Banda de -5 % a 10 % mensual; el salto relativo (50) no sirve de freno en una serie de variaciones y el comentario lo explica. Descarta filas duplicadas idénticas (el servicio repite julio de 2025) y devuelve null si hay dos valores distintos para el mismo mes.
- Prueba real: `npx tsx scripts/paises/mz/probar_detectores.ts` trae los 7 (USD 63,27/64,54, EUR 70,81/72,23, ZAR 3,81/3,88, inflación 52 puntos hasta ago. 2026 = -0,28). En la primera corrida 3 dieron `fetch failed` transitorio y en la segunda andaban: el servidor del BM es intermitente.

## Checks

- `tsc --noEmit`: OK.
- `check_paises mz`: OK. 54 datos (53 verificados), 7 series, 61 calculadoras. Dos avisos esperables: las series vencen sin cron (cambio a los 10 días, inflación a los 100).
- `check_paises_casos mz`: OK, 57 casos en 19 archivos.
- `check_textos_paises mz`: OK, 881 textos, 0 avisos.
- `check_fronteras`: OK, 12041 archivos. `check_eol`: OK, 13238 archivos.
- Con mz registrado localmente: `check_motor` OK con 3980 pruebas. `check_mundo` OK; con el mercado pasado a `publicado` solo para la prueba, MZ entra declarado con 8,2 % / 20,6 % / 29,4 %.
- `next dev` en el 3102: `/mz`, `/mz/salario-liquido` y `/mz/simulador-de-emprestimo` dan 200, sin marcadores sin resolver.

## Riesgos y dudas para el coordinador

1. **Base del IRPS**: el art. 65-A aplica la tabla al «salário bruto mensal», así que no resto el INSS antes de retener. Si la práctica de la AT es restarlo, cambia el neto.
2. **Horas extra**: el art. 125.1 dice textualmente «50 % se prestado até às 24 horas, e 100 % para além das 20 horas». Las franjas se pisan (es una errata de la ley). Usé 20 h como corte, como en la ley anterior.
3. **Valor de la hora**: la ley no tiene fórmula. Uso salario × 12 ÷ (52 × horas semanales) y lo aclaro en la página.
4. **Indemnización del art. 141**: dice «por cada ano de serviço» sin prorrateo, así que cuento solo los años completos (lo aviso en la página). Un día de salario = salario ÷ 30 (convención, no está en la ley).
5. **Aviso prévio con seis meses o menos**: la ley no fija plazo y la calculadora lo dice así.
6. **Inflación**: el BM no publica noviembre de 2023, y la calculadora rechaza los períodos que lo cruzan. El último mes es agosto de 2026: si el BM no sube septiembre antes del 9/11, la calculadora deja de publicarse.
7. **Fuente del IVA 16 %**: la tasa sale del art. 34 (÷116) de la Lei 10/2025, no de un artículo que diga «16 %».
8. **Salario mínimo**: hace falta el Diploma Ministerial de 2026 en el BR o en el sitio del Ministério do Trabalho. `mitss.gov.mz` no resuelve DNS.
9. **`next dev`**: Turbopack rechaza el `node_modules` en junction; anduvo con `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3102` (el worktree no tiene `.env`).
10. Sin pedidos al motor.
