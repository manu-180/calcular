import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosFr: TextosUi<UiDescuento> = {
  slug: "calcul-remise",
  ui: () => ({
    precio: "Prix initial",
    descuento: "Remise (%)",
    segundoDescuento: "Remise supplémentaire (%)",
    segundoDescuentoAyuda: "Si une deuxième remise s’ajoute à la première, indiquez-la ici.",
    ahorro: "Vous économisez",
    final: "Prix après remise",
    descuentoTotal: "Remise totale",
    errorMayorA100: "Une remise ne peut pas dépasser 100 %.",
    observacionDoble: (efectivo) =>
      `Deux remises successives ne s’additionnent pas : au total, vous payez ${efectivo} % de moins.`,
  }),
};
