import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosNl: TextosUi<UiRitmo> = {
  slug: "hardlooptempo",
  ui: () => ({
    calcular: "Wat wil je uitrekenen?",
    calcRitmo: "Tempo (uit afstand en tijd)",
    calcTiempo: "Tijd (uit afstand en tempo)",
    calcDistancia: "Afstand (uit tijd en tempo)",
    distancia: "Afstand",
    distanciaAyuda: "Kies een wedstrijdafstand, of “Andere afstand” om zelf een afstand in te vullen.",
    otra: "Andere afstand",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Halve marathon",
    maraton: "Marathon",
    distanciaOtra: (u) => `Andere afstand (${u})`,
    horas: "Tijd: uren",
    minutos: "Tijd: minuten",
    segundos: "Tijd: seconden",
    ritmoMin: (u) => `Tempo: minuten per ${u}`,
    ritmoSeg: "Tempo: seconden",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Eindtijd",
    distanciaRes: (u) => `Afstand (${u})`,
    velocidad: (u) => `Gemiddelde snelheid (${u === "km/h" ? "km/u" : u})`,
    errorDistancia: "Vul een afstand in die groter is dan 0.",
    errorTiempo: "Vul de tijd in: uren, minuten of seconden.",
    errorRitmo: "Vul het tempo in: minuten en seconden per kilometer of mijl.",
  }),
};
