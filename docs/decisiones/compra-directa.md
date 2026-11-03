# «Comprar» va derecho a MercadoPago (2026-11-03)

Pedido de Manuel: «veo que varios ven las plantillas para comprar pero no son tantos los que
clickean en comprar; hacé un análisis profesional y tomá acción». El análisis completo, con los
números, está en `docs/medicion/analisis-planillas-2026-11-03.md`.

## Qué se decidió

El botón «Comprar» de planillas e informes manda el POST a `/api/mp/checkout` y lleva a MercadoPago
sin pedir nada antes. Se saca el diálogo que pedía el mail (`CompraDialogo`, vivo del 27/9 al 3/11),
y el mail pasa a ser opcional en el POST y en `/planillas/comprar` (el formulario sin JS).

## Por qué

- De 27 personas que abrieron el diálogo en 30 días (4/10 → 3/11), 13 mandaron el mail: el paso
  perdía a la mitad de gente que ya había tocado «Comprar».
- Las 16 ventas de los 90 días anteriores se pagaron entre 0 y 12 minutos después del checkout.
  El recordatorio de recupero (24 h después) no recuperó ninguna: el mail no compraba nada.
- MercadoPago devolvió `payer.email` en las 16 ventas, incluidas las 3 de antes del diálogo (que
  entraron por el GET sin mail). La entrega por mail no depende del mail que pedíamos.
- La «mejora» que justificó el diálogo (2,5 % → 37 % de checkout a pago) fue sacar bots del
  denominador: 39 de las 43 preferencias de Comercio de septiembre eran un GET diario a las 07:57
  sin página ni visitante. No fue el mail.

## Qué queda igual

- `/api/mp/checkout` POST con el campo trampa `sitio` y el chequeo de Origin: un mail que viene
  de otro origen no se guarda. Un mail inválido vuelve a `/planillas/comprar?error=email`; vacío
  es válido.
- El cron `recuperar-compras` sigue: escribe sólo a quien dejó mail en `/planillas/comprar`.
  Con el flujo directo casi nadie lo deja, así que en la práctica queda dormido.
- Los datos de la calculadora (`datos`) viajan siempre que existan (son valores de cálculo sin
  nombres, lo dice `/privacidad#compras`); en `/planillas/comprar` sigue la casilla para apagarlo.
- El webhook ya contemplaba «MercadoPago no expuso el email»: en ese caso la entrega es el botón
  de la página de gracias, que además captura el mail.

## Cómo se mide

Antes (30 días hasta el 3/11, personas distintas): 2271 vieron una oferta → 128 tocaron un botón
de compra → 27 abrieron el diálogo → 13 llegaron a MercadoPago → 5 ventas/mes (13 en 60 días).
Lo que tiene que subir es **checkouts por toque de Comprar** (13/128 = 10 %) y ventas por mes, con
la misma cantidad de gente que ve la oferta. Se evalúa el 2026-12-01 con `tools/embudo-planillas.ts`
(libre_albedrio) y el informe de fugas. Si la tasa checkout → pago en MP cae por debajo del 25 %
(hoy 37 %) sin que suban las ventas, el flujo directo trajo curiosos y no compradores: se revierte
este commit.

## Piezas

- `src/components/compra/directa.ts`: `comprar(slug, precio)` arma el POST y `useComprar` da el
  estado del botón («Te llevamos a MercadoPago…», liberado con `pageshow` al volver con «atrás»).
- `src/components/compra/FormularioCompra.tsx`: el formulario de `/planillas/comprar`.
- `src/app/api/mp/checkout/route.ts`: mail opcional.
