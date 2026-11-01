import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosSk: TextosUi<UiDescuento> = {
  slug: "vypocet-zlavy",
  ui: () => ({
    precio: "Pôvodná cena",
    descuento: "Zľava (%)",
    segundoDescuento: "Ďalšia zľava (%)",
    segundoDescuentoAyuda: "Ak sa navyše uplatní ešte jedna zľava, zadajte ju sem.",
    ahorro: "Ušetríte",
    final: "Cena po zľave",
    descuentoTotal: "Celková zľava",
    errorMayorA100: "Zľava nemôže byť vyššia ako 100 %.",
    observacionDoble: (efectivo) => `Dve zľavy po sebe sa nesčítavajú: spolu znižujú cenu o ${efectivo} %.`,
  }),
};
