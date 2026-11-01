import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosPl: TextosUi<UiIva> = {
  slug: "kalkulator-vat",
  ui: () => ({
    operacion: "Co chcesz policzyć?",
    agregar: "Z netto na brutto (doliczyć VAT)",
    quitar: "Z brutto na netto (odliczyć VAT)",
    monto: "Kwota",
    montoAyuda: "Netto, jeśli doliczasz VAT. Brutto, jeśli go odliczasz.",
    otraTasa: "Inna stawka VAT (%)",
    otraTasaAyuda: "Opcjonalnie. Jeśli towar albo usługa ma obniżoną stawkę, wpisz ją tutaj. W przeciwnym razie liczymy według stawki podstawowej.",
    neto: "Kwota netto",
    impuesto: "Kwota VAT",
    total: "Kwota brutto",
    tasaUsada: "Zastosowana stawka",
    errorTasa: "Stawka VAT jest nieprawidłowa.",
  }),
};
