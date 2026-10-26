import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosSv: TextosUi<UiRitmo> = {
  slug: "loptempo",
  ui: () => ({
    calcular: "Vad vill du räkna ut?",
    calcRitmo: "Tempo (från distans och tid)",
    calcTiempo: "Tid (från distans och tempo)",
    calcDistancia: "Distans (från tid och tempo)",
    distancia: "Distans",
    distanciaAyuda: "Välj ett lopp, eller ”Annan distans” för att skriva in en egen.",
    otra: "Annan distans",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Halvmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Annan distans (${u})`,
    horas: "Tid: timmar",
    minutos: "Tid: minuter",
    segundos: "Tid: sekunder",
    ritmoMin: (u) => `Tempo: minuter per ${u}`,
    ritmoSeg: "Tempo: sekunder",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Sluttid",
    distanciaRes: (u) => `Distans (${u})`,
    velocidad: (u) => `Medelhastighet (${u})`,
    errorDistancia: "Fyll i en distans som är större än 0.",
    errorTiempo: "Fyll i tiden: timmar, minuter eller sekunder.",
    errorRitmo: "Fyll i tempot: minuter och sekunder per distansenhet.",
  }),
};
