# Informe de actualización por inflación — research de producto

Consultado el 2026-10-06. Producto: `informe-inflacion`, $3.900, entrega `informe`.

## Quién compra y en qué situación está

Llega a `/inflacion` alguien que ya tiene un monto en la cabeza y una conversación por delante:

| Quién | Situación | Qué tiene que lograr mañana |
|---|---|---|
| Empleado (en blanco, en negro, de un comercio chico) | Su sueldo quedó igual hace meses; va a pedir aumento | Llegar con un número que no sea «una sensación»: cuánto perdió y cuánto tendría que cobrar |
| Profesional / freelancer / docente particular | Cobra lo mismo que hace un año; le da pudor subir | Avisar el valor nuevo con una justificación que el cliente no discuta |
| Comercio / proveedor / oficio | Tiene un presupuesto o lista de precios vieja | Actualizar el presupuesto y explicarlo |
| Particulares con una deuda (préstamo entre familiares, amigos, socios) | Se prestó plata hace meses y hay que devolverla | Proponer cuánto vale hoy esa plata, sin pelear |

Lo que tienen en común: **el número ya lo saben** (la calculadora gratis se lo da). Lo que les falta es **el papel**: algo con la fuente oficial, la cuenta explicada de forma que el otro la pueda revisar, y el texto para mandarlo. Escribir esa carta es justo lo que da vergüenza o pereza.

## Qué le sirve de verdad (qué hace con el entregable al día siguiente)

1. **La carta lista**, con sus números y el nombre del destinatario, para pegar en un mail o WhatsApp o imprimir. Es lo que más valor tiene y lo que ninguna calculadora da.
2. **La cuenta auditable**: monto × (índice de llegada ÷ índice de origen), con los dos índices del INDEC escritos, para que el otro lado la rehaga y le dé lo mismo.
3. **La tabla mes a mes** (o año por año en períodos largos): muestra que no es un número tirado.
4. **Respuestas a las objeciones** que va a escuchar («el IPC es un promedio», «¿por qué desde ese mes?», «eso no es lo que subió lo mío»), dichas con honestidad.
5. Un dato de **último IPC publicado** y cuándo sale el próximo: le sirve para elegir cuándo mandar la carta.

## Mercado: qué hay hoy y el hueco

- Gratis: calculadoras que actualizan un monto por IPC — Chequeado (chequeado.com/inflacionacumulada), Hacé Cuentas, Richify, blogs. Todas dan **un número**; ninguna da un documento ni una carta.
- Pago: informes de un contador o un abogado (consulta), o nada. Para una suba de honorarios o un pedido de aumento nadie paga una consulta.
- **Hueco:** documento sobrio + carta por caso, con el dato oficial y la cuenta explicada, a precio de impulso. $3.900 es menos que un café con factura en CABA y bastante menos que lo que se recupera con un aumento del 1 %.

## Normas y fuentes (con link y fecha de consulta)

- **IPC Nacional, nivel general, base dic-2016 = 100** — INDEC, serie `148.3_INIVELNAL_DICI_M_26` en la API oficial de series de tiempo: https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26 . El repo la embebe en `src/data/ipc-serie.ts` (descargada 2026-09-28, último período agosto 2026). Publicación: «entre el 10 y el 15» del mes siguiente (`src/data/inflacion.ts`).
- **Ley 23.928, arts. 7 y 10** (texto según Ley 25.561, B.O. 7/1/2002), InfoLEG https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/328/texact.htm — consultado 2026-10-06. Art. 7: el deudor de una suma de pesos cumple dando la cantidad nominal; «En ningún caso se admitirá actualización monetaria, indexación por precios…». **Sigue vigente**; el DNU 70/2023 sólo excluyó a los alquileres (art. 1199 CCyC). Hay fallos que la declararon inconstitucional en casos puntuales (p. ej. SCBA), pero eso no la deroga.
- Sueldos: ninguna norma obliga a actualizar el sueldo por IPC; se fija por convenio/paritaria o por acuerdo. Pedir un aumento con un dato es libre.
- Honorarios y precios entre privados: se fijan libremente; actualizar el precio **hacia adelante** no es indexar una deuda ya nacida.

## Límites YMYL (cómo queda en el producto)

- El IPC es un índice **general**: no mide lo que subió el gasto de cada uno. Se dice en el informe, sin esconderlo, como respuesta a la objeción más probable.
- **Deudas entre particulares:** el informe NO dice que el otro esté obligado a pagar el monto actualizado. La carta es una **propuesta** de acuerdo («en poder de compra, eso equivale hoy a…»), y la nota legal cita el art. 7 de la Ley 23.928. Para un reclamo, abogado.
- **Sueldos:** la carta es un pedido, no un reclamo; no promete que corresponda por ley. Remite al convenio si lo hay.
- No es asesoramiento; no recomienda inversiones; no promete resultados.

## Decisiones de producto que salen de acá

- Cuatro cartas (aumento de sueldo · honorarios · precio/presupuesto · deuda, en dos versiones: «presté» y «debo»).
- El caso se elige en la oferta de la calculadora (y cambia la vista previa) y se puede cambiar en la entrega.
- Nombres, destinatario y concepto se escriben en la página del informe y no viajan. En la metadata del pago viajan sólo: monto, mes de origen, mes de llegada (o «último dato»), sueldo actual si lo hay, y el caso.
- Si el mes de llegada es «el último dato», el enlace se actualiza solo cada vez que el INDEC publica un IPC nuevo.
