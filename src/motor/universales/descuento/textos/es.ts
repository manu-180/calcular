import { segunTrato, type TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosEs: TextosUi<UiDescuento> = {
  slug: "descuento",
  ui: (trato) => ({
    precio: "Precio original",
    descuento: "Descuento (%)",
    segundoDescuento: "Segundo descuento (%)",
    segundoDescuentoAyuda: segunTrato(trato, {
      tu: "Si hay otro descuento encima del primero, ponlo aquí.",
      usted: "Si hay otro descuento encima del primero, póngalo aquí.",
      vos: "Si hay otro descuento encima del primero, ponelo acá.",
    }),
    ahorro: segunTrato(trato, { tu: "Cuánto ahorras", usted: "Cuánto ahorra", vos: "Cuánto ahorrás" }),
    final: "Precio final",
    descuentoTotal: "Descuento total",
    errorMayorA100: "Un descuento no puede pasar del 100 %.",
    observacionDoble: (efectivo) => `Dos descuentos seguidos no se suman: en total es un ${efectivo} % menos.`,
  }),
};
