import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosEs: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "punto-de-equilibrio",
  ui: (trato) => ({
    fijos: "Costos fijos por mes",
    fijosAyuda: "Lo que se paga aunque no se venda nada: alquiler, sueldos fijos, servicios, software.",
    precio: "Precio de venta por unidad",
    variable: "Costo variable por unidad",
    variableAyuda: "Lo que cuesta cada unidad que se vende: materiales, mercadería, comisiones, envío.",
    objetivo: segunTrato(trato, {
      tu: "Ganancia que buscas por mes (opcional)",
      usted: "Ganancia que busca por mes (opcional)",
      vos: "Ganancia que buscás por mes (opcional)",
    }),
    objetivoAyuda: "Para saber cuánto vender, además de cubrir los costos.",
    unidades: "Unidades para cubrir los costos",
    facturacion: "Ventas para cubrir los costos",
    contribucion: "Margen de contribución por unidad",
    contribucionAyuda: "Lo que deja cada venta para pagar los costos fijos: precio menos costo variable.",
    contribucionPct: "Margen de contribución (%)",
    unidadesObjetivo: "Unidades para la ganancia buscada",
    facturacionObjetivo: "Ventas para la ganancia buscada",
    errorPrecio: segunTrato(trato, {
      tu: "Escribe el precio de venta de una unidad.",
      usted: "Escriba el precio de venta de una unidad.",
      vos: "Escribí el precio de venta de una unidad.",
    }),
    errorMargen: segunTrato(trato, {
      tu: "El costo variable es igual o mayor que el precio: cada venta pierde dinero y nunca llegas al equilibrio. Revisa el precio o el costo.",
      usted: "El costo variable es igual o mayor que el precio: cada venta pierde dinero y nunca llega al equilibrio. Revise el precio o el costo.",
      vos: "El costo variable es igual o mayor que el precio: cada venta pierde dinero y nunca llegás al equilibrio. Revisá el precio o el costo.",
    }),
    observacionRedondeo: "Las unidades se redondean hacia arriba, porque no se puede vender una fracción.",
  }),
};
