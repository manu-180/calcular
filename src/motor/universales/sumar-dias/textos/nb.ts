import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosNb: TextosUi<UiSumarDias> = {
  slug: "legg-til-dager",
  ui: () => ({
    fecha: "Startdato",
    operacion: "Hva vil du gjøre?",
    sumar: "Legge til dager",
    restar: "Trekke fra dager",
    dias: "Antall dager",
    tipo: "Type dager",
    corridos: "Kalenderdager",
    habiles: "Virkedager (mandag til fredag)",
    resultado: "Dato",
    diaSemana: "Ukedag",
    diasCorridos: "Kalenderdager totalt",
    nombresDias: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
    errorDias: "Antall dager må være et heltall, høyst 100 år.",
    notaHabiles: "Virkedager hopper over lørdager og søndager, men ikke helligdager. Faller en helligdag i perioden, legger du den til for seg.",
  }),
};
