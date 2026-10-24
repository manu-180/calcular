import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosNb: TextosUi<UiRitmo> = {
  slug: "lopetempo",
  ui: () => ({
    calcular: "Hva vil du regne ut?",
    calcRitmo: "Tempo (ut fra distanse og tid)",
    calcTiempo: "Tid (ut fra distanse og tempo)",
    calcDistancia: "Distanse (ut fra tid og tempo)",
    distancia: "Distanse",
    distanciaAyuda: "Velg et løp, eller «Annen distanse» for å fylle inn din egen.",
    otra: "Annen distanse",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Halvmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Annen distanse (${u})`,
    horas: "Tid: timer",
    minutos: "Tid: minutter",
    segundos: "Tid: sekunder",
    ritmoMin: (u) => `Tempo: minutter per ${u}`,
    ritmoSeg: "Tempo: sekunder",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Sluttid",
    distanciaRes: (u) => `Distanse (${u})`,
    velocidad: (u) => `Snittfart (${u})`,
    errorDistancia: "Fyll inn en distanse som er større enn 0.",
    errorTiempo: "Fyll inn tiden: timer, minutter eller sekunder.",
    errorRitmo: "Fyll inn tempoet: minutter og sekunder per distanseenhet.",
  }),
};
