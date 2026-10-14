import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosDe: TextosUi<UiSumarDias> = {
  slug: "datum-plus-tage",
  ui: () => ({
    fecha: "Ausgangsdatum",
    operacion: "Rechnung",
    sumar: "Tage addieren",
    restar: "Tage abziehen",
    dias: "Anzahl der Tage",
    tipo: "Art der Tage",
    corridos: "Kalendertage",
    habiles: "Arbeitstage (Montag bis Freitag)",
    resultado: "Ergebnisdatum",
    diaSemana: "Wochentag",
    diasCorridos: "Kalendertage insgesamt",
    nombresDias: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    errorDias: "Die Anzahl der Tage muss eine ganze Zahl sein, höchstens 100 Jahre.",
    notaHabiles: "Bei Arbeitstagen werden Samstage und Sonntage übersprungen, Feiertage aber nicht. Liegt einer dazwischen, rechnen Sie ihn bitte dazu.",
  }),
};
