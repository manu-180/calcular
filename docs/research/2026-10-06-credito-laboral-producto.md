# Informe de actualización de crédito laboral — research de producto (2026-10-06)

Producto: `informe-credito-laboral` · $6.900 · entrega `informe` (A4 imprimible) · landing
`/informes/credito-laboral` · entrega `/informes/credito-laboral/ver` · vende desde
`/actualizacion-creditos-laborales`.

## Quién compra y en qué situación está

1. **Trabajador con una deuda laboral impaga** (liquidación final, indemnización, diferencias,
   sueldos adeudados), en reclamo extrajudicial, conciliación o juicio. Pregunta: «¿cuánto vale hoy
   lo que me deben?» y, sobre todo, «¿esta propuesta de arreglo es buena?». Al día siguiente lleva el
   papel a su abogado o a la audiencia, o lo compara contra la oferta.
2. **Abogado laboralista / estudio.** Necesita la planilla de liquidación actualizada para la
   demanda, la audiencia o la propuesta, y que la contraparte o el juzgado la puedan controlar. Al
   día siguiente la adjunta o la usa como base, con carátula y firma.

Lo que la calculadora gratis no resuelve y el informe sí: **varios rubros con fechas de
exigibilidad distintas** (el art. 276 manda actualizar «cada suma desde que sea debida»), la
**tabla de índices mes a mes** para verificar, la **carátula**, el método escrito y el
**régimen del art. 55** para juicios anteriores a la reforma.

## Mercado (consultado 2026-10-06)

- Poder Judicial de Río Negro publicó una calculadora de intereses laborales conforme la Ley 27.802
  (nota de Diario Judicial, 13/7/2026: https://www.diariojudicial.com/news-103614-a-calcular-online).
- Calculadoras de estudios (p. ej. https://estudiovilaplana.com.ar/?p=43150) dan un número por monto.
- Hueco: nadie entrega una liquidación multi-rubro imprimible con coeficientes por mes, fuentes con
  fecha, banda del art. 55 y explicación para el trabajador. Precio de impulso frente al costo de
  armarla a mano en Excel con la serie del INDEC.

## Normas (texto leído en la fuente oficial el 2026-10-06)

- **Art. 276 LCT** (texto del art. 54 de la Ley 27.802, B.O. 6/3/2026, vigencia desde su
  publicación): IPC Nivel General del INDEC «con más una tasa de interés del tres por ciento (3%)
  anual, desde que cada suma sea debida y hasta el momento del efectivo pago».
  https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm
- **Art. 55 Ley 27.802** (régimen de juicios en trámite sin sentencia definitiva a la entrada en
  vigencia): intereses moratorios a la tasa pasiva que determine el BCRA; tope = capital histórico +
  IPC + 3% anual (inc. b); piso = 67% de ese cálculo (inc. c); de orden público.
  https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm
- **Art. 277 LCT** (art. 56 Ley 27.802): cuota litis ≤ 20% con ratificación y homologación; costas de
  1.ª instancia ≤ 25%; cuotas 6 (grandes) / 12 (MiPyME).
- **IPC Nacional, INDEC** (serie del repo, `src/data/ipc-serie.ts`, descargada 2026-09-28, último dato
  agosto de 2026).

### Hallazgo que corrige al sitio

El FAQ de `/actualizacion-creditos-laborales` y el comentario de `src/data/actualizacion-creditos.ts`
decían que la ley «no dice qué hacer con los tramos ya corridos». **Es falso**: el art. 55 tiene la
regla. Corregí el FAQ (archivo de mi integración). El comentario del data file es de sólo lectura:
queda reportado.

### Jurisprudencia y doctrina (fuentes secundarias, sólo para respaldar «el criterio lo fija el juez»)

- CNAT Sala I, «Jacinto, Giselle Sabrina c/ Bourbon Café S.R.L. y otro s/ despido», expte.
  74611/2017, 18/8/2026: declaró inconstitucional el art. 55 en el caso y aplicó IPC + 3% anual sobre
  el capital actualizado (reseña: https://siap.blogdelcontador.com.ar/novedades/creditos-laborales-la-justicia-declaro-inconstitucional-el-articulo-55-de-la-ley-27-802/).
  Coincide con la lectura del motor (3% sobre el capital actualizado).
- Gimenez & Gimenez, «Las distintas interpretaciones del nuevo art. 276 de la LCT», Microjuris,
  27/4/2026: tres teorías (si se suma o no un interés moratorio judicial aparte). El motor aplica la
  lectura de régimen completo (IPC + 3%, sin tasa adicional).

## Límites YMYL aplicados

- Referencia de cálculo, no asesoramiento ni liquidación aprobada; el criterio lo fija el juez
  (respaldado por art. 55 + fallo + doctrina divergente).
- No calcula la tasa pasiva del art. 55: muestra tope y piso.
- No calcula cuánto corresponde (eso es la calculadora de indemnización): actualiza montos cargados.
- No descuenta pagos a cuenta: lo dice.
- Carátula, partes, expediente y nombres de rubros no viajan (sólo concepto enumerado, monto, mes).
