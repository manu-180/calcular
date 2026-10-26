import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosRo: TextosUi<UiSumarDias> = {
  slug: "adauga-zile-la-data",
  ui: () => ({
    fecha: "Data de început",
    operacion: "Operația",
    sumar: "Adăugați zile",
    restar: "Scădeți zile",
    dias: "Numărul de zile",
    tipo: "Tipul zilelor",
    corridos: "Zile calendaristice",
    habiles: "Zile lucrătoare (de luni până vineri)",
    resultado: "Data rezultată",
    diaSemana: "Ziua săptămânii",
    diasCorridos: "Total zile calendaristice",
    nombresDias: ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"],
    errorDias: "Numărul de zile trebuie să fie un număr întreg, de cel mult 100 de ani.",
    notaHabiles: "Zilele lucrătoare sar peste sâmbete și duminici, dar nu peste sărbătorile legale. Dacă în interval cade o sărbătoare, adăugați-o separat.",
  }),
};
