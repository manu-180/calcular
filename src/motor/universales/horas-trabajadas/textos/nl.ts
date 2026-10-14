import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosNl: TextosUi<UiHorasTrabajadas> = {
  slug: "gewerkte-uren-berekenen",
  ui: () => ({
    dias: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    entrada: (dia) => `${dia}: begintijd`,
    salida: (dia) => `${dia}: eindtijd`,
    horarioAyuda: "Laat de dagen leeg waarop je niet werkte. Stop je na middernacht, dan telt het als dezelfde dienst.",
    pausa: "Onbetaalde pauze per dag (minuten)",
    pausaAyuda: "Lunch of rusttijd die niet betaald wordt. Die gaat af van elke dag dat je werkte.",
    pagoHora: "Uurloon",
    umbral: "Normale uren per week (niet verplicht)",
    umbralAyuda: "Uren boven dit aantal worden betaald als overuren. Laat het leeg als er geen overuren zijn.",
    recargo: "Toeslag op overuren (%)",
    recargoAyuda: "Hoeveel meer je per overuur krijgt. 50% betekent dat een overuur 150% betaalt.",
    horasTotales: "Gewerkte uren",
    horasReloj: "In uren en minuten",
    horasNormales: "Normale uren",
    horasExtra: "Overuren",
    pagoNormal: "Loon voor normale uren",
    pagoExtra: "Loon voor overuren",
    pagoTotal: "Totaal loon voor de week",
    tabla: "Per dag",
    colDia: "Dag",
    colEntrada: "Begin",
    colSalida: "Eind",
    colHoras: "Uren",
    errorFaltaSalida: (dia) => `${dia}: de eindtijd ontbreekt.`,
    errorFaltaEntrada: (dia) => `${dia}: de begintijd ontbreekt.`,
    errorIguales: (dia) => `${dia}: begintijd en eindtijd zijn hetzelfde.`,
    errorPausa: (dia) => `${dia}: de pauze is even lang als de dienst of langer.`,
    errorSinDias: "Vul voor minstens één dag een begintijd en een eindtijd in.",
    observacionNoche: "Sommige diensten eindigen de volgende dag. Die tellen helemaal mee op de dag waarop ze beginnen.",
    observacionGenerico:
      "Dit is een algemene berekening. Hoeveel uur je mag werken, hoe overuren werken en wat je krijgt voor nacht- of feestdagwerk, hangt af van de wet, je cao en je contract.",
  }),
};
