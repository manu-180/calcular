import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosRo: TextosUi<UiRitmo> = {
  slug: "calculator-ritm-alergare",
  ui: () => ({
    calcular: "Ce doriți să calculați?",
    calcRitmo: "Ritmul (din distanță și timp)",
    calcTiempo: "Timpul (din distanță și ritm)",
    calcDistancia: "Distanța (din timp și ritm)",
    distancia: "Distanța",
    distanciaAyuda: "Alegeți o cursă sau „Altă distanță” ca să introduceți distanța dorită.",
    otra: "Altă distanță",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Semimaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Altă distanță (${u})`,
    horas: "Timp: ore",
    minutos: "Timp: minute",
    segundos: "Timp: secunde",
    ritmoMin: (u) => `Ritm: minute pe ${u}`,
    ritmoSeg: "Ritm: secunde",
    ritmo: (u) => `Ritm (min/${u})`,
    tiempo: "Timpul final",
    distanciaRes: (u) => `Distanța (${u})`,
    velocidad: (u) => `Viteza medie (${u})`,
    errorDistancia: "Introduceți o distanță mai mare decât 0.",
    errorTiempo: "Introduceți timpul: ore, minute sau secunde.",
    errorRitmo: "Introduceți ritmul: minute și secunde pe unitatea de distanță.",
  }),
};
