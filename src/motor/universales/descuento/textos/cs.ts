import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosCs: TextosUi<UiDescuento> = {
  slug: "vypocet-slevy",
  ui: () => ({
    precio: "Původní cena",
    descuento: "Sleva (%)",
    segundoDescuento: "Další sleva (%)",
    segundoDescuentoAyuda: "Pokud se navíc uplatní ještě jedna sleva, zadejte ji sem.",
    ahorro: "Ušetříte",
    final: "Cena po slevě",
    descuentoTotal: "Celková sleva",
    errorMayorA100: "Sleva nemůže být vyšší než 100 %.",
    observacionDoble: (efectivo) => `Dvě slevy po sobě se nesčítají: dohromady snižují cenu o ${efectivo} %.`,
  }),
};
