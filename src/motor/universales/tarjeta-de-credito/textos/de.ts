import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosDe: TextosUi<UiTarjetaDeCredito> = {
  slug: "kreditkarte-abbezahlen",
  ui: () => ({
    saldo: "Offener Betrag auf der Karte",
    tasa: "Sollzins pro Jahr (%)",
    tasaAyuda: "Der Zins für Teilzahlungen. Er steht auf Ihrer Kreditkartenabrechnung.",
    modo: "Wie möchten Sie zurückzahlen?",
    modoFijo: "Jeden Monat einen festen Betrag",
    modoMinimo: "Nur die Mindestrate",
    pagoFijo: "Fester Betrag pro Monat",
    minimoPorcentaje: "Mindestrate (% vom offenen Betrag)",
    minimoPorcentajeAyuda: "Was die Bank jeden Monat mindestens verlangt. Wenn Sie unsicher sind: 5 % sind üblich.",
    minimoPiso: "Mindestrate nie unter",
    meses: "Monate bis zur Rückzahlung",
    intereses: "Zinsen, die Sie zahlen",
    total: "Gesamt gezahlt",
    primerPago: "Erste Mindestrate",
    tabla: "Plan Monat für Monat",
    colMes: "Monat",
    colPago: "Zahlung",
    colInteres: "Zinsen",
    colCapital: "Tilgung",
    colSaldo: "Offen",
    errorSaldo: "Geben Sie den offenen Betrag auf der Karte ein.",
    errorFaltaPago: "Geben Sie ein, wie viel Sie jeden Monat zahlen.",
    errorNoCubre: (interes) => `Mit dieser Zahlung sinkt der Betrag nie: Allein die Zinsen im ersten Monat sind ${interes}. Erhöhen Sie die Zahlung.`,
    errorMuyLargo: "Mit dieser Zahlung würde die Rückzahlung mehr als 50 Jahre dauern. Erhöhen Sie die Zahlung.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 Jahr" : `${anios} Jahre`;
      const m = meses === "0" ? "" : meses === "1" ? " und 1 Monat" : ` und ${meses} Monate`;
      return `Das sind ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Zahlen Sie immer ${pago}, also so viel wie die erste Mindestrate, sind Sie nach ${meses} Monaten fertig und sparen ${ahorro} Zinsen.`,
    observacionNoGastar: "Angenommen ist, dass Sie während der Rückzahlung nichts Neues mit der Karte bezahlen.",
  }),
};
