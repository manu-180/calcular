import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosDe: TextosUi<UiConversorSueldo> = {
  slug: "stundenlohn-rechner",
  ui: () => ({
    monto: "Lohn oder Gehalt",
    periodo: "Der Betrag gilt pro",
    hora: "Stunde",
    dia: "Tag",
    semana: "Woche",
    quincena: "Halbmonat (24-mal im Jahr)",
    mes: "Monat",
    anio: "Jahr",
    horasSemana: "Arbeitsstunden pro Woche",
    diasSemana: "Arbeitstage pro Woche",
    semanasAnio: "Bezahlte Wochen pro Jahr",
    semanasAnioAyuda: "52, wenn Ihr Urlaub bezahlt ist. Werden Sie nur für gearbeitete Wochen bezahlt, ziehen Sie die anderen ab.",
    porHora: "Pro Stunde",
    porDia: "Pro Tag",
    porSemana: "Pro Woche",
    porQuincena: "Pro Halbmonat",
    porMes: "Pro Monat",
    porAnio: "Pro Jahr",
    errorHoras: "Geben Sie ein, wie viele Stunden Sie pro Woche arbeiten.",
    errorSemanas: "Die bezahlten Wochen pro Jahr müssen über null liegen.",
    observacionBruto: "Es ist derselbe Betrag, umgerechnet auf andere Zeiträume. Sonderzahlungen sind nicht dazugerechnet und Steuern nicht abgezogen.",
  }),
};
