import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosDa: TextosUi<UiRitmo> = {
  slug: "loebetempo",
  ui: () => ({
    calcular: "Hvad vil du beregne?",
    calcRitmo: "Tempo (ud fra distance og tid)",
    calcTiempo: "Tid (ud fra distance og tempo)",
    calcDistancia: "Distance (ud fra tid og tempo)",
    distancia: "Distance",
    distanciaAyuda: "Vælg et løb, eller »Anden distance« for at skrive din egen.",
    otra: "Anden distance",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Halvmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Anden distance (${u})`,
    horas: "Tid: timer",
    minutos: "Tid: minutter",
    segundos: "Tid: sekunder",
    ritmoMin: (u) => `Tempo: minutter pr. ${u}`,
    ritmoSeg: "Tempo: sekunder",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Sluttid",
    distanciaRes: (u) => `Distance (${u})`,
    velocidad: (u) => `Gennemsnitsfart (${u})`,
    errorDistancia: "Skriv en distance, der er større end 0.",
    errorTiempo: "Skriv tiden: timer, minutter eller sekunder.",
    errorRitmo: "Skriv tempoet: minutter og sekunder pr. distanceenhed.",
  }),
};
