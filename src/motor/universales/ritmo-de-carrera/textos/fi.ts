import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosFi: TextosUi<UiRitmo> = {
  slug: "juoksuvauhti",
  ui: () => ({
    calcular: "Mitä haluat laskea?",
    calcRitmo: "Vauhti (matkasta ja ajasta)",
    calcTiempo: "Aika (matkasta ja vauhdista)",
    calcDistancia: "Matka (ajasta ja vauhdista)",
    distancia: "Matka",
    distanciaAyuda: "Valitse juoksumatka tai ”Muu matka”, jos haluat syöttää oman.",
    otra: "Muu matka",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Puolimaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Muu matka (${u})`,
    horas: "Aika: tunnit",
    minutos: "Aika: minuutit",
    segundos: "Aika: sekunnit",
    ritmoMin: (u) => `Vauhti: minuuttia per ${u}`,
    ritmoSeg: "Vauhti: sekunnit",
    ritmo: (u) => `Vauhti (min/${u})`,
    tiempo: "Loppuaika",
    distanciaRes: (u) => `Matka (${u})`,
    velocidad: (u) => `Keskinopeus (${u})`,
    errorDistancia: "Syötä matka, joka on suurempi kuin 0.",
    errorTiempo: "Syötä aika: tunnit, minuutit tai sekunnit.",
    errorRitmo: "Syötä vauhti: minuutit ja sekunnit matkayksikköä kohden.",
  }),
};
