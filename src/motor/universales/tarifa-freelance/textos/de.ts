import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosDe: TextosUi<UiTarifaFreelance> = {
  slug: "stundensatz-rechner",
  ui: () => ({
    ingreso: "Gewünschtes Nettoeinkommen pro Jahr",
    ingresoAyuda: "Nach Steuern und Betriebsausgaben. Das ist Ihr Gehalt als Selbstständige oder Selbstständiger.",
    gastos: "Betriebsausgaben pro Jahr",
    gastosAyuda: "Technik, Software, Internet, Weiterbildung, Steuerberatung, Krankenversicherung und Altersvorsorge.",
    impuestos: "Geschätzte Steuern und Abgaben (%)",
    impuestosAyuda: "Was an Steuern auf Umsatz minus Ausgaben anfällt. Wenn Sie unsicher sind, fragen Sie Ihre Steuerberatung. 25 % sind ein Startwert.",
    diasLibres: "Freie Tage pro Jahr",
    diasLibresAyuda: "Urlaub, Feiertage und Krankheitstage. Die bezahlt Ihnen niemand, also muss Ihr Stundensatz sie abdecken.",
    diasSemana: "Arbeitstage pro Woche",
    horasSemana: "Abrechenbare Stunden pro Woche",
    horasSemanaAyuda: "Nur die Stunden, die Sie in Rechnung stellen. Akquise, Verwaltung und Weiterbildung zählen nicht. Üblich sind 20 bis 30 von 40.",
    tarifaHora: "Stundensatz",
    tarifaDia: "Tagessatz",
    facturacionMensual: "Nötiger Umsatz pro Monat",
    facturacionAnual: "Nötiger Umsatz pro Jahr",
    horasAnio: "Abrechenbare Stunden pro Jahr",
    errorIngreso: "Geben Sie ein, wie viel Sie im Jahr verdienen möchten.",
    errorImpuestos: "Steuern und Abgaben müssen unter 100 % liegen.",
    errorDias: "Mit so vielen freien Tagen bleibt im Jahr kein Arbeitstag übrig.",
    errorHoras: "Geben Sie ein, wie viele Stunden pro Woche Sie abrechnen können.",
    observacionFacturables: "Verlangen Sie weniger, verdienen Sie weniger als geplant oder arbeiten mehr Stunden.",
  }),
};
