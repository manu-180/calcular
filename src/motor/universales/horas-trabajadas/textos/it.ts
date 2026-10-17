import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosIt: TextosUi<UiHorasTrabajadas> = {
  slug: "calcolo-ore-lavorate",
  ui: () => ({
    dias: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
    entrada: (giorno) => `${giorno}: entrata`,
    salida: (giorno) => `${giorno}: uscita`,
    horarioAyuda: "Lascia vuoti i giorni in cui non hai lavorato. Se finisci dopo mezzanotte, conta come lo stesso turno.",
    pausa: "Pausa non retribuita al giorno (minuti)",
    pausaAyuda: "Pausa pranzo o riposo non pagati. Si tolgono da ogni giorno lavorato.",
    pagoHora: "Paga oraria",
    umbral: "Ore ordinarie a settimana (facoltativo)",
    umbralAyuda: "Le ore oltre questo numero si pagano come straordinario. Lascialo vuoto se non ci sono straordinari.",
    recargo: "Maggiorazione per lo straordinario (%)",
    recargoAyuda: "Quanto in più si paga ogni ora di straordinario. Con il 25%, un'ora vale 1,25 ore normali.",
    horasTotales: "Ore lavorate",
    horasReloj: "In ore e minuti",
    horasNormales: "Ore ordinarie",
    horasExtra: "Ore di straordinario",
    pagoNormal: "Paga ordinaria",
    pagoExtra: "Paga degli straordinari",
    pagoTotal: "Paga totale della settimana",
    tabla: "Giorno per giorno",
    colDia: "Giorno",
    colEntrada: "Entrata",
    colSalida: "Uscita",
    colHoras: "Ore",
    errorFaltaSalida: (giorno) => `Manca l'orario di uscita di ${giorno.toLowerCase()}.`,
    errorFaltaEntrada: (giorno) => `Manca l'orario di entrata di ${giorno.toLowerCase()}.`,
    errorIguales: (giorno) => `Per ${giorno.toLowerCase()} entrata e uscita sono alla stessa ora.`,
    errorPausa: (giorno) => `La pausa dura quanto o più del turno di ${giorno.toLowerCase()}.`,
    errorSinDias: "Inserisci l'orario di entrata e di uscita di almeno un giorno.",
    observacionNoche: "Alcuni turni finiscono il giorno dopo: si contano per intero nel giorno in cui iniziano.",
    observacionGenerico:
      "È un calcolo generale. Orario massimo, regole sugli straordinari e maggiorazioni per notturno e festivi dipendono dalla legge e dal tuo contratto collettivo.",
  }),
};
