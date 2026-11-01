import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosSv: TextosUi<UiIva> = {
  slug: "momskalkylator",
  ui: () => ({
    operacion: "Vad vill du räkna ut?",
    agregar: "Lägga på moms på ett pris exklusive moms",
    quitar: "Räkna bort moms från ett pris inklusive moms",
    monto: "Pris",
    montoAyuda: "Exklusive moms om du lägger på den, inklusive moms om du räknar bort den.",
    otraTasa: "Annan momssats (%)",
    otraTasaAyuda: "Valfritt. Har varan eller tjänsten en reducerad momssats, fyll i den här. Annars används normalsatsen.",
    neto: "Pris exklusive moms",
    impuesto: "Moms",
    total: "Pris inklusive moms",
    tasaUsada: "Momssats som används",
    errorTasa: "Momssatsen är inte giltig.",
  }),
};
