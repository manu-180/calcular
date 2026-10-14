import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosDe: TextosUi<UiIva> = {
  slug: "mehrwertsteuer-rechner",
  ui: () => ({
    operacion: "Was möchten Sie berechnen?",
    agregar: "Netto zu Brutto (Steuer aufschlagen)",
    quitar: "Brutto zu Netto (Steuer herausrechnen)",
    monto: "Betrag",
    montoAyuda: "Netto, wenn Sie die Steuer aufschlagen. Brutto, wenn Sie sie herausrechnen.",
    otraTasa: "Anderer Steuersatz (%)",
    otraTasaAyuda: "Optional. Gilt für Ihren Artikel ein reduzierter Satz, tragen Sie ihn hier ein. Sonst rechnet der Rechner mit dem Normalsatz.",
    neto: "Nettobetrag",
    impuesto: "Mehrwertsteuer",
    total: "Bruttobetrag",
    tasaUsada: "Angewendeter Steuersatz",
    errorTasa: "Dieser Steuersatz ist nicht gültig. Geben Sie einen Wert ab 0 ein.",
  }),
};
