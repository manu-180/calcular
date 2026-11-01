import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosCs: TextosUi<UiRitmo> = {
  slug: "kalkulacka-tempa-behu",
  ui: () => ({
    calcular: "Co chcete spočítat?",
    calcRitmo: "Tempo (ze vzdálenosti a času)",
    calcTiempo: "Čas (ze vzdálenosti a tempa)",
    calcDistancia: "Vzdálenost (z času a tempa)",
    distancia: "Vzdálenost",
    distanciaAyuda: "Vyberte závod, nebo zvolte „Jiná vzdálenost“ a zadejte vlastní.",
    otra: "Jiná vzdálenost",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Půlmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Jiná vzdálenost (${u})`,
    horas: "Čas: hodiny",
    minutos: "Čas: minuty",
    segundos: "Čas: sekundy",
    ritmoMin: (u) => `Tempo: minuty na ${u}`,
    ritmoSeg: "Tempo: sekundy",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Čas v cíli",
    distanciaRes: (u) => `Vzdálenost (${u})`,
    velocidad: (u) => `Průměrná rychlost (${u})`,
    errorDistancia: "Zadejte vzdálenost větší než 0.",
    errorTiempo: "Zadejte čas: hodiny, minuty nebo sekundy.",
    errorRitmo: "Zadejte tempo: minuty a sekundy na jednotku vzdálenosti.",
  }),
};
