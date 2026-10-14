import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosDe: TextosUi<UiPropina> = {
  slug: "trinkgeldrechner",
  ui: () => ({
    cuenta: "Rechnungsbetrag",
    porcentaje: "Trinkgeld (%)",
    porcentajeAyuda: "Was üblich ist, hängt vom Land und vom Lokal ab. Wählen Sie, was für Sie passt.",
    personas: "Anzahl der Personen, die zahlen",
    redondear: "Jeden Anteil aufrunden",
    redondearAyuda: "So zahlt jede Person einen glatten Betrag. Der Rest geht ins Trinkgeld.",
    propina: "Trinkgeld",
    total: "Gesamt mit Trinkgeld",
    porPersona: "Pro Person",
    propinaEfectiva: "Trinkgeld nach dem Aufrunden",
    errorPersonas: "Mindestens eine Person muss zahlen.",
    observacionRedondeo: (efectiva) => `Nach dem Aufrunden beträgt das Trinkgeld ${efectiva} % der Rechnung.`,
  }),
};
