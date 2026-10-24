import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosCs: TextosUi<UiIva> = {
  slug: "kalkulacka-dph",
  ui: () => ({
    operacion: "Co chcete spočítat?",
    agregar: "Přičíst DPH k ceně bez DPH",
    quitar: "Odečíst DPH z ceny s DPH",
    monto: "Cena",
    montoAyuda: "Bez DPH, pokud daň přičítáte. S DPH, pokud ji odečítáte.",
    otraTasa: "Jiná sazba DPH (%)",
    otraTasaAyuda: "Nepovinné. Pokud zboží nebo služba spadá do snížené sazby, zadejte ji sem. Jinak se použije základní sazba.",
    neto: "Cena bez DPH",
    impuesto: "DPH",
    total: "Cena s DPH",
    tasaUsada: "Použitá sazba",
    errorTasa: "Sazba DPH není platná.",
  }),
};
