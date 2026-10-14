import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const textos: TextosUi<UiRitmo> = {
  slug: "pace-rechner",
  ui: () => ({
    calcular: "Was möchten Sie berechnen?",
    calcRitmo: "Pace (aus Strecke und Zeit)",
    calcTiempo: "Zeit (aus Strecke und Pace)",
    calcDistancia: "Strecke (aus Zeit und Pace)",
    distancia: "Strecke",
    distanciaAyuda: "Wählen Sie einen Wettkampf oder „Andere Strecke“, um selbst eine einzutragen.",
    otra: "Andere Strecke",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Halbmarathon",
    maraton: "Marathon",
    distanciaOtra: (u) => `Andere Strecke (${u})`,
    horas: "Zeit: Stunden",
    minutos: "Zeit: Minuten",
    segundos: "Zeit: Sekunden",
    ritmoMin: (u) => `Pace: Minuten pro ${u}`,
    ritmoSeg: "Pace: Sekunden",
    ritmo: (u) => `Pace (min/${u})`,
    tiempo: "Zielzeit",
    distanciaRes: (u) => `Strecke (${u})`,
    velocidad: (u) => `Durchschnittsgeschwindigkeit (${u})`,
    errorDistancia: "Geben Sie eine Strecke über 0 ein.",
    errorTiempo: "Geben Sie die Zeit ein: Stunden, Minuten oder Sekunden.",
    errorRitmo: "Geben Sie die Pace ein: Minuten und Sekunden pro Streckeneinheit.",
  }),
};

export const textosDe = textosConSuiza(textos);
