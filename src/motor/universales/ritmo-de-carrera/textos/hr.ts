import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosHr: TextosUi<UiRitmo> = {
  slug: "kalkulator-tempa-trcanja",
  ui: () => ({
    calcular: "Što želite izračunati?",
    calcRitmo: "Tempo (iz udaljenosti i vremena)",
    calcTiempo: "Vrijeme (iz udaljenosti i tempa)",
    calcDistancia: "Udaljenost (iz vremena i tempa)",
    distancia: "Udaljenost",
    distanciaAyuda: "Odaberite utrku ili opciju „Druga udaljenost” i unesite svoju.",
    otra: "Druga udaljenost",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Polumaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Druga udaljenost (${u})`,
    horas: "Vrijeme: sati",
    minutos: "Vrijeme: minute",
    segundos: "Vrijeme: sekunde",
    ritmoMin: (u) => `Tempo: minute po ${u}`,
    ritmoSeg: "Tempo: sekunde",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Vrijeme na cilju",
    distanciaRes: (u) => `Udaljenost (${u})`,
    velocidad: (u) => `Prosječna brzina (${u})`,
    errorDistancia: "Unesite udaljenost veću od 0.",
    errorTiempo: "Unesite vrijeme: sate, minute ili sekunde.",
    errorRitmo: "Unesite tempo: minute i sekunde po jedinici udaljenosti.",
  }),
};
