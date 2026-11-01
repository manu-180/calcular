import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosSl: TextosUi<UiRitmo> = {
  slug: "kalkulator-tempa-teka",
  ui: () => ({
    calcular: "Kaj želite izračunati?",
    calcRitmo: "Tempo (iz razdalje in časa)",
    calcTiempo: "Čas (iz razdalje in tempa)",
    calcDistancia: "Razdalja (iz časa in tempa)",
    distancia: "Razdalja",
    distanciaAyuda: "Izberite tek ali možnost „Druga razdalja“ in vnesite svojo.",
    otra: "Druga razdalja",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Polmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Druga razdalja (${u})`,
    horas: "Čas: ure",
    minutos: "Čas: minute",
    segundos: "Čas: sekunde",
    ritmoMin: (u) => `Tempo: minute na ${u}`,
    ritmoSeg: "Tempo: sekunde",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Čas na cilju",
    distanciaRes: (u) => `Razdalja (${u})`,
    velocidad: (u) => `Povprečna hitrost (${u})`,
    errorDistancia: "Vnesite razdaljo, večjo od 0.",
    errorTiempo: "Vnesite čas: ure, minute ali sekunde.",
    errorRitmo: "Vnesite tempo: minute in sekunde na enoto razdalje.",
  }),
};
