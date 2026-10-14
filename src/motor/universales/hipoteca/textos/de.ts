import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

const textos: TextosUi<UiHipoteca> = {
  slug: "hypothekenrechner",
  ui: () => ({
    precio: "Kaufpreis der Immobilie",
    entradaPorcentaje: "Eigenkapital (% vom Kaufpreis)",
    entradaMonto: "Eigenkapital als Betrag (optional)",
    entradaMontoAyuda: "Wenn Sie hier etwas eintragen, gilt dieser Betrag statt des Prozentsatzes.",
    tasa: "Sollzins pro Jahr (%)",
    anios: "Laufzeit in Jahren",
    gastos: "Monatliche Wohnkosten (optional)",
    gastosAyuda: "Hausgeld, Grundsteuer oder Gebäudeversicherung, die Sie zusätzlich zur Rate zahlen.",
    cuota: "Monatsrate",
    cuotaTotal: "Monatsrate mit Nebenkosten",
    entrada: "Eigenkapital",
    prestado: "Darlehensbetrag",
    intereses: "Zinsen insgesamt",
    total: "Summe aller Raten",
    tabla: "Jahr für Jahr",
    colAnio: "Jahr",
    colIntereses: "Gezahlte Zinsen",
    colCapital: "Getilgt",
    colSaldo: "Restschuld am Jahresende",
    errorPrecio: "Geben Sie den Kaufpreis ein.",
    errorEntrada: "Das Eigenkapital deckt den ganzen Kaufpreis, es gibt also kein Darlehen zu berechnen. Verringern Sie das Eigenkapital.",
    observacionPrestado: (porcentaje) => `Sie finanzieren ${porcentaje} % des Kaufpreises. Je höher dieser Anteil, desto höher sind meist Zins und Anforderungen der Bank.`,
    observacionCostos: "Kaufnebenkosten wie Grunderwerbsteuer, Notar oder Makler sind nicht enthalten. Planen Sie sie zusätzlich zum Eigenkapital ein.",
  }),
};

export const textosDe = textosConSuiza(textos);
