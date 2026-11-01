import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Ukedagene skrives med liten forbokstav på norsk. I etikettene står de først og får stor forbokstav.
const stor = (s: string) => s[0].toUpperCase() + s.slice(1);

export const textosNb: TextosUi<UiHorasTrabajadas> = {
  slug: "beregn-arbeidstid",
  ui: () => ({
    dias: ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"],
    entrada: (dia) => `${stor(dia)}: start`,
    salida: (dia) => `${stor(dia)}: slutt`,
    horarioAyuda: "La dagene du ikke jobbet, stå tomme. Slutter du etter midnatt, teller det som samme vakt.",
    pausa: "Ubetalt pause per dag (minutter)",
    pausaAyuda: "Lunsj eller pause du ikke får betalt for. Den trekkes fra hver dag du har jobbet.",
    pagoHora: "Timelønn",
    umbral: "Vanlig arbeidstid per uke (valgfritt)",
    umbralAyuda: "Timer utover dette antallet betales som overtid. La feltet stå tomt hvis det ikke er overtid.",
    recargo: "Overtidstillegg (%)",
    recargoAyuda: "Hvor mye mer hver overtidstime gir. 50 % betyr halvannen gang timelønnen.",
    horasTotales: "Arbeidede timer",
    horasReloj: "I timer og minutter",
    horasNormales: "Ordinære timer",
    horasExtra: "Overtidstimer",
    pagoNormal: "Lønn for ordinær arbeidstid",
    pagoExtra: "Betaling for overtid",
    pagoTotal: "Lønn for uken",
    tabla: "Dag for dag",
    colDia: "Dag",
    colEntrada: "Start",
    colSalida: "Slutt",
    colHoras: "Timer",
    errorFaltaSalida: (dia) => `Sluttidspunktet mangler for ${dia}.`,
    errorFaltaEntrada: (dia) => `Starttidspunktet mangler for ${dia}.`,
    errorIguales: (dia) => `Start og slutt er samme klokkeslett på ${dia}.`,
    errorPausa: (dia) => `Pausen er like lang som vakten på ${dia} eller lengre.`,
    errorSinDias: "Fyll inn start og slutt for minst én dag.",
    observacionNoche: "Noen vakter slutter dagen etter. De telles helt med på dagen de begynner.",
    observacionGenerico:
      "Dette er en generell beregning. Hvor mye du kan jobbe, regler for overtid og tillegg for kveld, natt og helg avhenger av loven, tariffavtalen og arbeidsavtalen din.",
  }),
};
