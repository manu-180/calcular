import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosSk: TextosUi<UiIva> = {
  slug: "kalkulacka-dph",
  ui: () => ({
    operacion: "Čo chcete vypočítať?",
    agregar: "Pripočítať DPH k cene bez DPH",
    quitar: "Odpočítať DPH z ceny s DPH",
    monto: "Cena",
    montoAyuda: "Bez DPH, ak daň pripočítavate. S DPH, ak ju odpočítavate.",
    otraTasa: "Iná sadzba DPH (%)",
    otraTasaAyuda: "Nepovinné. Ak tovar alebo služba spadá do zníženej sadzby, zadajte ju sem. Inak sa použije základná sadzba.",
    neto: "Cena bez DPH",
    impuesto: "DPH",
    total: "Cena s DPH",
    tasaUsada: "Použitá sadzba",
    errorTasa: "Sadzba DPH nie je platná.",
  }),
};
