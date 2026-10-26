import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Veckodagarna skrivs med liten bokstav på svenska. I etiketterna börjar de meningen och får stor.
const stor = (s: string) => s[0].toUpperCase() + s.slice(1);

export const textosSv: TextosUi<UiHorasTrabajadas> = {
  slug: "rakna-arbetstid",
  ui: () => ({
    dias: ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"],
    entrada: (dia) => `${stor(dia)}: start`,
    salida: (dia) => `${stor(dia)}: slut`,
    horarioAyuda: "Lämna dagarna du inte jobbade tomma. Slutar du efter midnatt räknas det som samma pass.",
    pausa: "Obetald rast per dag (minuter)",
    pausaAyuda: "Lunch eller rast som inte är betald. Den dras av varje dag du har jobbat.",
    pagoHora: "Timlön",
    umbral: "Ordinarie arbetstid per vecka (valfritt)",
    umbralAyuda: "Timmar över det här antalet betalas som övertid. Lämna tomt om det inte finns någon övertid.",
    recargo: "Övertidstillägg (%)",
    recargoAyuda: "Hur mycket mer varje övertimme ger. 50 % betyder en och en halv gång timlönen.",
    horasTotales: "Arbetade timmar",
    horasReloj: "I timmar och minuter",
    horasNormales: "Ordinarie timmar",
    horasExtra: "Övertidstimmar",
    pagoNormal: "Lön för ordinarie tid",
    pagoExtra: "Övertidsersättning",
    pagoTotal: "Lön för veckan",
    tabla: "Dag för dag",
    colDia: "Dag",
    colEntrada: "Start",
    colSalida: "Slut",
    colHoras: "Timmar",
    errorFaltaSalida: (dia) => `Sluttid saknas för ${dia}.`,
    errorFaltaEntrada: (dia) => `Starttid saknas för ${dia}.`,
    errorIguales: (dia) => `Start och slut är samma tid på ${dia}.`,
    errorPausa: (dia) => `Rasten är lika lång som passet på ${dia} eller längre.`,
    errorSinDias: "Fyll i start och slut för minst en dag.",
    observacionNoche: "Vissa pass slutar dagen efter. De räknas i sin helhet på dagen då de börjar.",
    observacionGenerico:
      "Det här är en allmän beräkning. Hur mycket du får jobba, regler för övertid och ersättning för kvälls-, natt- och helgarbete beror på lag, kollektivavtal och ditt anställningsavtal.",
  }),
};
