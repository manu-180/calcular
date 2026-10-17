import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosEn: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "What do you want to do?",
    agregar: "Add tax to a price before tax",
    quitar: "Remove tax from a price that includes it",
    monto: "Price",
    montoAyuda: "Before tax if you're adding it; including tax if you're removing it.",
    otraTasa: "Different tax rate (%)",
    otraTasaAyuda: "Optional. If your item has a reduced rate, enter it here. Otherwise the standard rate is used.",
    neto: "Price before tax",
    impuesto: "Tax (VAT or sales tax)",
    total: "Price including tax",
    tasaUsada: "Rate applied",
    errorTasa: "The tax rate isn't valid.",
  }),
};
