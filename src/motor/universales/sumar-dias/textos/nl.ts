import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosNl: TextosUi<UiSumarDias> = {
  slug: "dagen-optellen",
  ui: () => ({
    fecha: "Begindatum",
    operacion: "Wat wil je doen?",
    sumar: "Dagen erbij tellen",
    restar: "Dagen eraf halen",
    dias: "Aantal dagen",
    tipo: "Soort dagen",
    corridos: "Kalenderdagen",
    habiles: "Werkdagen (maandag tot en met vrijdag)",
    resultado: "Nieuwe datum",
    diaSemana: "Dag van de week",
    diasCorridos: "Kalenderdagen in totaal",
    nombresDias: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
    errorDias: "Het aantal dagen moet een heel getal zijn, tot maximaal 100 jaar.",
    notaHabiles: "Werkdagen slaan zaterdag en zondag over, maar geen feestdagen. Valt er een feestdag tussen, tel die dan zelf nog op.",
  }),
};
