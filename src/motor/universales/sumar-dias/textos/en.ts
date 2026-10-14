import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosEn: TextosUi<UiSumarDias> = {
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "Start date",
    operacion: "Operation",
    sumar: "Add days",
    restar: "Subtract days",
    dias: "Number of days",
    tipo: "Type of days",
    corridos: "Calendar days",
    habiles: "Business days (Monday to Friday)",
    resultado: "Resulting date",
    diaSemana: "Day of the week",
    diasCorridos: "Calendar days in total",
    nombresDias: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    errorDias: "The number of days has to be a whole number, up to 100 years.",
    notaHabiles: "Business days skip Saturdays and Sundays, but not public holidays. If there is one in between, add it separately.",
  }),
};
