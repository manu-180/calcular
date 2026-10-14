import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosNl: TextosUi<UiConversorSueldo> = {
  slug: "uurloon-berekenen",
  ui: () => ({
    monto: "Salaris",
    periodo: "Salaris per",
    hora: "Uur",
    dia: "Dag",
    semana: "Week",
    quincena: "Halve maand (24 keer per jaar)",
    mes: "Maand",
    anio: "Jaar",
    horasSemana: "Uren per week",
    diasSemana: "Werkdagen per week",
    semanasAnio: "Betaalde weken per jaar",
    semanasAnioAyuda: "52 als je vakantie doorbetaald krijgt. Krijg je alleen de weken betaald die je werkt, trek de rest er dan af.",
    porHora: "Per uur",
    porDia: "Per dag",
    porSemana: "Per week",
    porQuincena: "Per halve maand",
    porMes: "Per maand",
    porAnio: "Per jaar",
    errorHoras: "Vul in hoeveel uur je per week werkt.",
    errorSemanas: "Het aantal betaalde weken per jaar moet groter zijn dan nul.",
    observacionBruto: "Het is hetzelfde bedrag, omgerekend naar andere periodes. Vakantiegeld, bonussen of een dertiende maand tellen niet mee en belastingen gaan er niet af.",
  }),
};
