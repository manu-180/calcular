import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosIs: TextosUi<UiRitmo> = {
  slug: "hlaupahradi",
  ui: () => ({
    calcular: "Hvað viltu reikna?",
    calcRitmo: "Hlaupahraði (út frá vegalengd og tíma)",
    calcTiempo: "Tími (út frá vegalengd og hlaupahraða)",
    calcDistancia: "Vegalengd (út frá tíma og hlaupahraða)",
    distancia: "Vegalengd",
    distanciaAyuda: "Veldu hlaup, eða „Önnur vegalengd“ til að slá inn þína eigin.",
    otra: "Önnur vegalengd",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Hálft maraþon",
    maraton: "Maraþon",
    distanciaOtra: (u) => `Önnur vegalengd (${u})`,
    horas: "Tími: klukkustundir",
    minutos: "Tími: mínútur",
    segundos: "Tími: sekúndur",
    ritmoMin: (u) => `Hlaupahraði: mínútur á ${u}`,
    ritmoSeg: "Hlaupahraði: sekúndur",
    ritmo: (u) => `Hlaupahraði (mín/${u})`,
    tiempo: "Lokatími",
    distanciaRes: (u) => `Vegalengd (${u})`,
    velocidad: (u) => `Meðalhraði (${u})`,
    errorDistancia: "Sláðu inn vegalengd sem er meiri en 0.",
    errorTiempo: "Sláðu inn tímann: klukkustundir, mínútur eða sekúndur.",
    errorRitmo: "Sláðu inn hlaupahraðann: mínútur og sekúndur á hverja vegalengdareiningu.",
  }),
};
