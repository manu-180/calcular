import { segunTrato, type TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosEs: TextosUi<UiMargenDeGanancia> = {
  slug: "margen-de-ganancia",
  ui: (trato) => ({
    modo: segunTrato(trato, { tu: "¿Qué quieres calcular?", usted: "¿Qué quiere calcular?", vos: "¿Qué querés calcular?" }),
    modoPrecio: "El margen, a partir del costo y el precio",
    modoMargen: "El precio para un margen",
    modoMarkup: "El precio para un recargo sobre el costo (markup)",
    costo: "Costo unitario",
    costoAyuda: "Lo que cuesta comprar o producir una unidad, sin impuestos que se trasladan al cliente.",
    precio: "Precio de venta",
    precioAyuda: segunTrato(trato, {
      tu: "Solo si eliges calcular el margen. Sin impuestos.",
      usted: "Solo si elige calcular el margen. Sin impuestos.",
      vos: "Solo si elegís calcular el margen. Sin impuestos.",
    }),
    objetivo: "Margen o markup buscado (%)",
    objetivoAyuda: segunTrato(trato, {
      tu: "Solo si eliges calcular el precio.",
      usted: "Solo si elige calcular el precio.",
      vos: "Solo si elegís calcular el precio.",
    }),
    precioResultado: "Precio de venta",
    margen: "Margen de ganancia",
    margenAyuda: "La ganancia como porcentaje del precio de venta.",
    markup: "Markup (recargo sobre el costo)",
    markupAyuda: "La ganancia como porcentaje del costo.",
    ganancia: "Ganancia por unidad",
    errorCosto: segunTrato(trato, {
      tu: "Escribe el costo de una unidad.",
      usted: "Escriba el costo de una unidad.",
      vos: "Escribí el costo de una unidad.",
    }),
    errorFaltaPrecio: segunTrato(trato, {
      tu: "Escribe el precio de venta para calcular el margen.",
      usted: "Escriba el precio de venta para calcular el margen.",
      vos: "Escribí el precio de venta para calcular el margen.",
    }),
    errorFaltaObjetivo: segunTrato(trato, {
      tu: "Escribe el margen o markup que buscas.",
      usted: "Escriba el margen o markup que busca.",
      vos: "Escribí el margen o markup que buscás.",
    }),
    errorMargen100: "Un margen tiene que ser menor que 100 %: sería ganar todo el precio sin costo.",
    observacionPerdida: segunTrato(trato, {
      tu: "Con ese precio vendes por debajo del costo: pierdes dinero en cada venta.",
      usted: "Con ese precio vende por debajo del costo: pierde dinero en cada venta.",
      vos: "Con ese precio vendés por debajo del costo: perdés dinero en cada venta.",
    }),
  }),
};
