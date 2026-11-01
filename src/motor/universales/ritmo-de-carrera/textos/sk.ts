import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosSk: TextosUi<UiRitmo> = {
  slug: "kalkulacka-tempa-behu",
  ui: () => ({
    calcular: "Čo chcete vypočítať?",
    calcRitmo: "Tempo (zo vzdialenosti a času)",
    calcTiempo: "Čas (zo vzdialenosti a tempa)",
    calcDistancia: "Vzdialenosť (z času a tempa)",
    distancia: "Vzdialenosť",
    distanciaAyuda: "Vyberte preteky alebo zvoľte „Iná vzdialenosť“ a zadajte vlastnú.",
    otra: "Iná vzdialenosť",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Polmaratón",
    maraton: "Maratón",
    distanciaOtra: (u) => `Iná vzdialenosť (${u})`,
    horas: "Čas: hodiny",
    minutos: "Čas: minúty",
    segundos: "Čas: sekundy",
    ritmoMin: (u) => `Tempo: minúty na ${u}`,
    ritmoSeg: "Tempo: sekundy",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Čas v cieli",
    distanciaRes: (u) => `Vzdialenosť (${u})`,
    velocidad: (u) => `Priemerná rýchlosť (${u})`,
    errorDistancia: "Zadajte vzdialenosť väčšiu ako 0.",
    errorTiempo: "Zadajte čas: hodiny, minúty alebo sekundy.",
    errorRitmo: "Zadajte tempo: minúty a sekundy na jednotku vzdialenosti.",
  }),
};
