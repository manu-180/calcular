import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

const textos: TextosUi<UiAumentoDeSueldo> = {
  slug: "gehaltserhoehung-rechner",
  ui: () => ({
    sueldo: "Aktuelles Monatsgehalt",
    sueldoAyuda: "Brutto oder netto, wie Sie möchten. Das Ergebnis bezieht sich auf dieselbe Grundlage.",
    aumentoPorcentaje: "Gehaltserhöhung (%)",
    aumentoMonto: "Erhöhung als Betrag (optional)",
    aumentoMontoAyuda: "Wenn Ihre Erhöhung ein fester Betrag ist, tragen Sie ihn hier ein. Er gilt dann statt des Prozentsatzes.",
    inflacion: "Inflation im Zeitraum (%, optional)",
    inflacionAyuda: "Die Inflation seit Ihrer letzten Erhöhung. So sehen Sie, ob Sie sich mit dem Gehalt mehr oder weniger leisten können als vorher.",
    sueldosAnio: "Gehälter pro Jahr",
    sueldosAnioAyuda: "12 bei monatlicher Zahlung. 13 oder 14, wenn Sie zusätzlich Weihnachts- oder Urlaubsgeld in Höhe eines Monatsgehalts bekommen.",
    nuevo: "Neues Monatsgehalt",
    diferenciaMensual: "Mehr pro Monat",
    diferenciaAnual: "Mehr pro Jahr",
    porcentaje: "Erhöhung in Prozent",
    real: "Reale Erhöhung (nach Inflation)",
    realAyuda: "Wie viel mehr Sie sich mit dem neuen Gehalt leisten können als mit dem alten.",
    errorSueldo: "Geben Sie Ihr aktuelles Gehalt ein.",
    errorSinAumento: "Geben Sie die Erhöhung als Prozentsatz oder als Betrag ein.",
    observacionGana: (puntos) => `Sie liegen über der Inflation: Ihr Gehalt ist real ${puntos} % mehr wert als vorher.`,
    observacionPierde: (puntos) => `Ihre Erhöhung gleicht die Inflation nicht aus: Ihr Gehalt ist real ${puntos} % weniger wert als vorher.`,
    observacionIgual: "Ihre Erhöhung gleicht genau die Inflation aus: Ihr Gehalt ist real so viel wert wie vorher.",
  }),
};

export const textosDe = textosConSuiza(textos);
