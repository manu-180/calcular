import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosUz: TextosUi<UiRitmo> = {
  slug: "yugurish-tempi-kalkulyatori",
  ui: () => ({
    calcular: "Nimani hisoblamoqchisiz?",
    calcRitmo: "Temp (masofa va vaqtdan)",
    calcTiempo: "Vaqt (masofa va tempdan)",
    calcDistancia: "Masofa (vaqt va tempdan)",
    distancia: "Masofa",
    distanciaAyuda: "Musobaqa masofasini tanlang yoki masofani oʻzingiz yozish uchun «Boshqa masofa» bandini tanlang.",
    otra: "Boshqa masofa",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Yarim marafon",
    maraton: "Marafon",
    distanciaOtra: (u) => `Boshqa masofa (${u})`,
    horas: "Vaqt: soat",
    minutos: "Vaqt: daqiqa",
    segundos: "Vaqt: soniya",
    ritmoMin: (u) => `Temp: daqiqa (har ${u} uchun)`,
    ritmoSeg: "Temp: soniya",
    ritmo: (u) => `Temp (daq/${u})`,
    tiempo: "Marra vaqti",
    distanciaRes: (u) => `Masofa (${u})`,
    velocidad: (u) => `Oʻrtacha tezlik (${u})`,
    errorDistancia: "Noldan katta masofani kiriting.",
    errorTiempo: "Vaqtni kiriting: soat, daqiqa yoki soniya.",
    errorRitmo: "Tempni kiriting: masofa birligi uchun daqiqa va soniya.",
  }),
};
