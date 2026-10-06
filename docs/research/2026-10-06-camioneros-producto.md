# Planilla de sueldos Camioneros 2026 — research de producto (2026-10-06)

## Quién compra y en qué situación está

1. **Empresa de transporte chica o mediana** (5 a 40 choferes) que liquida en casa o le pasa los números al
   contador. Todos los meses tiene que armar básico + antigüedad + kilómetros + comidas + pernoctadas por
   chofer, con valores que cambian con cada planilla de FADEEAC. Hoy lo hace con un Excel heredado que
   alguien actualiza a mano (y se atrasa), o paga un sistema de sueldos.
2. **Estudio contable** que liquida varias transportistas: necesita la escala vigente sin buscar el PDF
   escaneado de cada mes, y un recibo que el cliente pueda imprimir.
3. **Chofer** que quiere controlar su recibo: «¿me pagaron bien los kilómetros? ¿la antigüedad se calcula
   sobre qué?». Busca «sueldo camionero 2026» y llega a la calculadora.

Qué hace con el entregable al día siguiente: carga la flota en la hoja Nómina, cambia el mes cuando sale
la planilla nueva, imprime el recibo de cada chofer y saca el aguinaldo de diciembre.

## Qué le sirve de verdad (y qué ya da el motor del sitio)

| Necesidad | Fuente | En la planilla |
|---|---|---|
| Básico por categoría y mes (9 categorías, mar–ago 2026) | `src/data/convenios/camioneros.ts` (planillas firmadas FADEEAC) | Escala 2026 + Liquidador + Nómina |
| Antigüedad 1% por año | Motor `calcularCamioneros` (1% del básico); ítem 6.1.5 de la planilla firmada: «1% sobre todos los conceptos remunerativos» | Sobre básico + horas extra por km (con km en 0 da exacto el motor) |
| Aportes 11% + 3% + 3% | Motor (17%) y `src/data/aguinaldo.ts` (desglose) | Desglosados en el Liquidador y el Recibo |
| Kilómetros, comida, viático especial, pernoctada | Planilla FADEEAC 8/26, hoja 2 «Viáticos y otros adicionales» | Valores de agosto 2026 embebidos y editables, coeficiente 1,20 / 1,40 por zona |
| Carácter no remunerativo de los viáticos | CCT 40/89 ítem 4.2.11 + art. 106 LCT; Plenario CNAT 247 «Aiello c/ Chevallier» | No suman aportes ni SAC; el 4.2.3 (horas extra por km) sí es remunerativo |
| SAC | Ley 23.041 / motor `calcularAguinaldo` | Hoja SAC con el mejor mes del semestre y proporcional |
| Recibo | — | Hoja imprimible A4; nombres y CUIL se escriben en la PC y no viajan |

Valores leídos del PDF firmado «Planillas de escalas salariales agosto 2026 OK» (FADEEAC, hoja 2, consultado
2026-10-06): comida (4.1.12) $16.463,15 · viático especial (4.1.13) $8.261,18 · pernoctada (4.1.14) $19.175,00 ·
horas extraordinarias por km (4.2.3) $86,07469 por km · viático por km (4.2.4) $86,07469 por km, mínimo 350 km por
día de viaje · al sur del Río Colorado +20% y al sur del Río Santa Cruz +40% (4.1.12/13/14) y coeficiente 1,20 / 1,40
en 4.2.3 y 4.2.4.

## Mercado y hueco

- Gratis: la escala circula como PDF escaneado (FADEEAC, fedcam) y en resúmenes de blogs contables que
  repiten porcentajes (justo el error que el repo pisó el 20/9: julio estaba 2,68% abajo). Nadie entrega
  la escala ya cargada en una hoja que liquide.
- Pago: sistemas de sueldos con suscripción mensual (pensados para estudios grandes) y planillas sueltas
  de foros sin fuente ni actualización.
- Hueco: una planilla de compra única con la escala firmada, los viáticos del convenio, la nómina de la
  flota, el recibo y el aguinaldo, que da los mismos números que la calculadora gratis y se actualiza sola
  cuando sale la planilla siguiente.

## Normas (con fecha de consulta)

- CCT 40/89 — planillas salariales firmadas mar–ago 2026, FADEEAC: https://www.fadeeac.org.ar/departamento-legislacion-legales-y-seguros/ (consultado 2026-10-06).
- Planilla agosto 2026 (básicos y viáticos): https://www.fadeeac.org.ar/wp-content/uploads/2026/08/Planillas-de-escalas-salariales-agosto-2026-OK.pdf (consultado 2026-10-06).
- Acuerdo 13/3/2026 y homologación Disp. DNRyRT 455/2026 (ya en el repo).
- **Novedad**: FADEEAC publicó la «Disp. 1277/26 — Homolog. paritaria sep26-Feb27»
  (https://www.fadeeac.org.ar/wp-content/uploads/2026/10/Disp.-1277-26-Homolog.-paritaria-sep26-Feb27.pdf),
  pero al 2026-10-06 **todavía no están las planillas mensuales firmadas** de septiembre en adelante. La
  escala del repo llega hasta agosto, y la planilla lo dice: «la actualizamos cuando sale, el enlace no vence».
- Ítem 4.2.11 del CCT 40/89 (régimen de viáticos, art. 106 LCT): texto citado en
  https://abogados.com.ar/el-caracter-remuneratorio-o-no-de-los-rubros-viaticos-y-comida-en-el-cct-4089/36101 (17/2/2025, consultado 2026-10-06).
  Falta el texto del CCT en un sitio oficial (InfoLEG no lo publica): se cita el ítem, no se transcribe.
- Ley 23.041 (SAC) y aportes 11/3/3 — ya en `src/data/aguinaldo.ts`.

## Límites YMYL

- Es una referencia de cálculo con fuentes, no un recibo oficial ni asesoramiento.
- Fuera de alcance (dicho en la planilla): contribuciones patronales, ART, cuota sindical y aportes
  solidarios del convenio, Ganancias, adicionales por rama (combustibles, sustancias peligrosas, larga
  distancia, etc.: se cargan en «Otros»), permanencia fuera de residencia y cruce de frontera (monto manual).
- Los valores de viáticos son los de **agosto 2026**: si se liquida otro mes, se reemplazan por los de esa
  planilla (son celdas amarillas, con el aviso al lado).
- Antigüedad: el motor del sitio la calcula sobre el básico; la planilla firmada dice «sobre todos los
  conceptos remunerativos». Con km en cero coinciden; con horas extra por km la planilla aplica el texto
  del convenio. Reportado al coordinador para que el motor lo contemple si se suma km a la calculadora.
