import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosIt: TextosUi<UiRitmo> = {
  slug: "calcolo-passo-corsa",
  ui: () => ({
    calcular: "Cosa vuoi calcolare?",
    calcRitmo: "Passo (da distanza e tempo)",
    calcTiempo: "Tempo (da distanza e passo)",
    calcDistancia: "Distanza (da tempo e passo)",
    distancia: "Distanza",
    distanciaAyuda: "Scegli una gara, oppure «Altra distanza» per inserirla tu.",
    otra: "Altra distanza",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Mezza maratona",
    maraton: "Maratona",
    distanciaOtra: (u) => `Altra distanza (${u})`,
    horas: "Tempo: ore",
    minutos: "Tempo: minuti",
    segundos: "Tempo: secondi",
    ritmoMin: (u) => `Passo: minuti per ${u}`,
    ritmoSeg: "Passo: secondi",
    ritmo: (u) => `Passo (min/${u})`,
    tiempo: "Tempo finale",
    distanciaRes: (u) => `Distanza (${u})`,
    velocidad: (u) => `Velocità media (${u})`,
    errorDistancia: "Inserisci una distanza maggiore di 0.",
    errorTiempo: "Inserisci il tempo: ore, minuti o secondi.",
    errorRitmo: "Inserisci il passo: minuti e secondi per unità di distanza.",
  }),
};
