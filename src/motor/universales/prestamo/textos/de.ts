import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosDe: TextosUi<UiPrestamo> = {
  slug: "kreditrechner",
  ui: () => ({
    monto: "Kreditbetrag",
    tasa: "Sollzins pro Jahr (%)",
    tasaAyuda: "Der jährliche Sollzins aus dem Angebot. Gebühren sind darin nicht enthalten.",
    meses: "Laufzeit in Monaten",
    extra: "Sondertilgung pro Monat (optional)",
    extraAyuda: "Was Sie jeden Monat zusätzlich zahlen würden, um früher fertig zu sein. Der Betrag geht vollständig in die Tilgung.",
    cuota: "Monatsrate",
    intereses: "Zinsen insgesamt",
    total: "Gesamtbetrag",
    mesesReales: "Laufzeit mit Sondertilgung (Monate)",
    ahorro: "Gesparte Zinsen",
    tabla: "Tilgungsplan",
    colMes: "Monat",
    colPago: "Rate",
    colInteres: "Zinsen",
    colCapital: "Tilgung",
    colSaldo: "Restschuld",
    errorMonto: "Geben Sie einen Betrag über null ein.",
    observacionCostos: "Die Rate enthält keine Versicherungen, Gebühren oder Steuern, die der Kreditgeber aufschlagen kann. Fragen Sie vor der Unterschrift nach den Gesamtkosten.",
    observacionExtra: (meses, ahorro) => `Mit der Sondertilgung sind Sie nach ${meses} Monaten schuldenfrei und sparen ${ahorro} Zinsen.`,
  }),
};
