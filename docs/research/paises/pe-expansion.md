# Perú: expansión de 17 a 41 calculadoras

Fecha de corte: 12 de octubre de 2026. Complementa `pe.md` (research base). Cada valor que usa una
calculadora publicada se leyó en fuente primaria ese día; el detalle de cada tramo está en
`src/paises/pe/datos.json`.

## Cómo se priorizó

Sin Keyword Planner en esta sesión. Orden por: (a) universalidad (todo trabajador en planilla o todo
negocio con RUC), (b) picos legales del calendario peruano, (c) presencia de calculadoras dedicadas
en la competencia que aparece en buscadores (sueldojusto.pe, hacecuentas.com/pe, tramitesperu.com,
modelo.pe: todas tienen gratificación y CTS truncas, AFP u ONP, ITF, intereses SUNAT, alcabala,
subsidio por maternidad). Validar el orden con Keyword Planner (geo Perú) y Search Console cuando
haya tráfico.

## Lista rankeada

| # | Calculadora (slug) | Demanda | Norma | Fuente primaria leída | Estado |
|---|---|---|---|---|---|
| 1 | gratificacion-trunca | Alta (pico jul y dic, toda liquidación) | Ley 27735, Ley 30334 | datos ya verificados (Compendio MTPE, guía de gratificaciones) | Publicada |
| 2 | cts-trunca | Alta | DS 001-97-TR arts. 2 y 3 | Compendio de normas laborales (MTPE) | Publicada |
| 3 | vacaciones-truncas | Alta | DL 713 art. 22 | Compendio MTPE | Publicada |
| 4 | asignacion-familiar | Alta (subió con la RMV) | Ley 25129 | Compendio MTPE + DS 015-2026-TR | Publicada |
| 5 | afp-o-onp | Alta | TUO SPP, DL 19990 | SBS (comisiones de octubre 2026), gob.pe ONP | Publicada |
| 6 | gastos-deducibles | Alta (feb a abr, devolución) | LIR art. 46 | SUNAT Personas "Gastos deducibles para el año 2026" | Publicada |
| 7 | retiro-de-cts | Alta hasta el 31/12/2026 | Ley 32322, DL 650 art. 42 | El Peruano | Publicada |
| 8 | utilidades | Alta (mar a may) | DL 892, DL 677, DS 009-98-TR | Compendio MTPE | Publicada |
| 9 | detracciones | Alta (empresas) | R. S. 183-2004/SUNAT anexo 3 | Cartilla de detracciones (orientacion.sunat.gob.pe) | Publicada |
| 10 | regimen-mype-tributario | Media alta | DL 1269 | SUNAT legislación | Publicada |
| 11 | rer | Media | LIR arts. 117 a 124-A | SUNAT legislación | Publicada |
| 12 | impuesto-a-la-renta-empresas | Media | LIR arts. 55 y 85 | SUNAT legislación | Publicada |
| 13 | renta-de-primera-categoria | Media alta | LIR arts. 36, 52-A y 84 (Ley 32541) | SUNAT legislación | Publicada |
| 14 | impuesto-venta-de-inmueble | Media | LIR arts. 2, 36, 84-A | SUNAT legislación | Publicada |
| 15 | itf | Media | TUO Ley 28194 arts. 10 y 13 | SUNAT legislación | Publicada |
| 16 | intereses-moratorios-sunat | Media | Código Tributario art. 33, Ley 31962 | SUNAT (índices y tasas, TUO del Código) | Publicada |
| 17 | feriado-trabajado | Media (picos en feriados) | DL 713 arts. 3, 8 y 9 | Compendio MTPE | Publicada |
| 18 | trabajo-nocturno | Media | DS 007-2002-TR art. 8 | Compendio MTPE | Publicada |
| 19 | sueldo-por-hora | Media | DS 007-2002-TR art. 1 | Compendio MTPE | Publicada |
| 20 | essalud | Media | Ley 26790 | guía MTPE de trabajadoras del hogar (ya verificada) | Publicada |
| 21 | periodo-de-prueba | Media | DS 003-97-TR art. 10 | Compendio MTPE | Publicada |
| 22 | preaviso-de-renuncia | Media | DS 003-97-TR art. 18 | Compendio MTPE | Publicada |
| 23 | plazo-fijo | Media | FSD (Ley 26702) | fsd.org.pe/cobertura | Publicada |
| 24 | impuesto-a-los-dividendos | Baja media | LIR arts. 52-A y 73-A | SUNAT legislación | Publicada |
| 25 | alcabala | Media alta | TUO Ley de Tributación Municipal arts. 21 a 25 | No: el PDF del MEF está detrás de Incapsula y el de El Peruano no tiene texto legible | Pendiente |
| 26 | impuesto-predial | Media alta | TUO LTM art. 13 | Igual que alcabala | Pendiente |
| 27 | subsidio-por-maternidad | Media | Ley 26790 art. 12, Ley 30367 | No se abrió el texto vigente (solo prensa y resoluciones de terceros) | Pendiente |
| 28 | subsidio-por-incapacidad | Media | Ley 26790 art. 12 | Igual | Pendiente |
| 29 | pension-de-alimentos / embargo | Media | CPC art. 648 | No se abrió | Pendiente |
| 30 | jubilacion-onp / retiro AFP 95.5 % | Media | DL 19990, Ley 30425, Ley 32123 | Reforma 2024 sin texto vigente leído | Pendiente |
| 31 | construccion-civil | Baja media | Convenio anual | Acta 2026-2027 no leída | Pendiente |
| 32 | regimen-agrario | Baja | Ley 31110 | No leída | Pendiente |
| 33 | licencia-de-paternidad | Baja | Ley 30807 (el compendio trae la Ley 29409 vieja) | No leída | Pendiente |

Las pendientes no tienen archivo: se arman cuando haya fuente primaria legible, para no sumar
borradores vacíos al registro.

## Datos nuevos (todos verificados el 12/10/2026)

Sobretasa nocturna 35 %, sobretasa de feriado o descanso trabajado 100 %, porcentajes de utilidades
por actividad, tope de 18 remuneraciones y mínimo de 20 trabajadores, período de prueba (3, 6 y 12
meses), preaviso de 30 días, libre disposición de CTS (100 % hasta el 31/12/2026 y 50 % desde 2027),
tasa de rentas del capital 6.25 %, deducción 20 %, dividendos 5 %, ITF 0.005 %, TIM (0.9 % soles,
0.5 % dólares desde el 1/4/2021), RER 1.5 % y límite S/ 525,000, RMT (escala 10 % / 29.5 %, pago a
cuenta 1 %, límites 300 y 1,700 UIT), renta de empresas 29.5 % y pago a cuenta mínimo 1.5 %,
porcentajes de gastos deducibles 2026 (15 / 30 / 30 / 30 / 100), detracciones de servicios del anexo 3
y monto mínimo de S/ 700. Serie nueva: cobertura del Fondo de Seguro de Depósitos (S/ 123,000 de
setiembre a noviembre de 2026), con detector propio.

## Trampas encontradas

- La CTS trunca no va a la cuenta CTS: el empleador la paga directo dentro de las 48 horas
  (DS 001-97-TR art. 3). Varios sitios dicen lo contrario.
- El ITF no se redondea al céntimo: se suprime el tercer decimal y el segundo pasa a 0 o a 5
  (TUO Ley 28194 art. 13).
- Desde 2024 la TIM no se aplica a multas (Ley 31962): solo a tributos.
- El RER sí presenta una declaración jurada anual (inventario, art. 124-A), aunque la cuota sea
  cancelatoria.
- Desde 2026 el pago mensual del alquiler se calcula sobre lo cobrado (Ley 32541).
- La deducción de restaurantes es 15 % para 2026: el tramo vence el 31/12/2026 y hay que releer la
  página de SUNAT para 2027.
- `gob.pe`, `personas.sunat.gob.pe` y `mef.gob.pe` bloquean lectores automáticos (Cloudflare o
  Incapsula). La página de gastos deducibles se leyó con un navegador.
