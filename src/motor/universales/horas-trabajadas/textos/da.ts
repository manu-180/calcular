import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Ugedagene skrives med lille begyndelsesbogstav på dansk. I etiketterne står de først og får stort.
const stort = (s: string) => s[0].toUpperCase() + s.slice(1);

export const textosDa: TextosUi<UiHorasTrabajadas> = {
  slug: "beregn-arbejdstimer",
  ui: () => ({
    dias: ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"],
    entrada: (dia) => `${stort(dia)}: start`,
    salida: (dia) => `${stort(dia)}: slut`,
    horarioAyuda: "Lad de dage, hvor du ikke arbejdede, stå tomme. Slutter du efter midnat, tæller det som samme vagt.",
    pausa: "Pause uden løn pr. dag (minutter)",
    pausaAyuda: "Frokost eller pause, du ikke får løn for. Den trækkes fra hver dag, du har arbejdet.",
    pagoHora: "Timeløn",
    umbral: "Normal arbejdstid om ugen (valgfrit)",
    umbralAyuda: "Timer ud over dette antal betales som overarbejde. Lad feltet stå tomt, hvis der ikke er overarbejde.",
    recargo: "Overtidstillæg (%)",
    recargoAyuda: "Hvor meget mere hver overtime giver. 50 % betyder halvanden gang timelønnen.",
    horasTotales: "Arbejdede timer",
    horasReloj: "I timer og minutter",
    horasNormales: "Normale timer",
    horasExtra: "Overtimer",
    pagoNormal: "Løn for normal arbejdstid",
    pagoExtra: "Betaling for overarbejde",
    pagoTotal: "Løn for ugen",
    tabla: "Dag for dag",
    colDia: "Dag",
    colEntrada: "Start",
    colSalida: "Slut",
    colHoras: "Timer",
    errorFaltaSalida: (dia) => `Sluttidspunktet mangler for ${dia}.`,
    errorFaltaEntrada: (dia) => `Starttidspunktet mangler for ${dia}.`,
    errorIguales: (dia) => `Start og slut er samme klokkeslæt om ${dia}en.`,
    errorPausa: (dia) => `Pausen er lige så lang som vagten om ${dia}en eller længere.`,
    errorSinDias: "Skriv start og slut for mindst én dag.",
    observacionNoche: "Nogle vagter slutter dagen efter. De tælles helt med på den dag, de begynder.",
    observacionGenerico:
      "Det her er en generel beregning. Hvor meget du må arbejde, regler for overarbejde og tillæg for aften-, nat- og weekendarbejde afhænger af lovgivning, overenskomst og din ansættelseskontrakt.",
  }),
};
