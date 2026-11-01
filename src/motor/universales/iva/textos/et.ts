import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosEt: TextosUi<UiIva> = {
  slug: "kaibemaksu-kalkulaator",
  ui: () => ({
    operacion: "Mida tahad arvutada?",
    agregar: "Lisa käibemaks käibemaksuta hinnale",
    quitar: "Eemalda käibemaks käibemaksuga hinnast",
    monto: "Hind",
    montoAyuda: "Käibemaksuta hind, kui lisad käibemaksu, või käibemaksuga hind, kui selle eemaldad.",
    otraTasa: "Muu maksumäär (%)",
    otraTasaAyuda: "Valikuline. Kui tootele või teenusele kehtib vähendatud määr, sisesta see siia. Muidu kasutatakse üldist määra.",
    neto: "Käibemaksuta hind",
    impuesto: "Käibemaks",
    total: "Käibemaksuga hind",
    tasaUsada: "Kasutatud maksumäär",
    errorTasa: "See maksumäär ei sobi.",
  }),
};
