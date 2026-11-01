import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosSr: TextosUi<UiRitmo> = {
  slug: "kalkulator-tempa-trcanja",
  ui: () => ({
    calcular: "Šta želite da izračunate?",
    calcRitmo: "Tempo (iz razdaljine i vremena)",
    calcTiempo: "Vreme (iz razdaljine i tempa)",
    calcDistancia: "Razdaljinu (iz vremena i tempa)",
    distancia: "Razdaljina",
    distanciaAyuda: "Izaberite trku ili opciju „Druga razdaljina“ i unesite svoju.",
    otra: "Druga razdaljina",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Polumaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Druga razdaljina (${u})`,
    horas: "Vreme: sati",
    minutos: "Vreme: minuti",
    segundos: "Vreme: sekunde",
    ritmoMin: (u) => `Tempo: minuti po ${u}`,
    ritmoSeg: "Tempo: sekunde",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Vreme na cilju",
    distanciaRes: (u) => `Razdaljina (${u})`,
    velocidad: (u) => `Prosečna brzina (${u})`,
    errorDistancia: "Unesite razdaljinu veću od 0.",
    errorTiempo: "Unesite vreme: sate, minute ili sekunde.",
    errorRitmo: "Unesite tempo: minute i sekunde po jedinici razdaljine.",
  }),
};
