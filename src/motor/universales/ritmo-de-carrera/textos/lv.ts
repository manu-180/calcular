import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosLv: TextosUi<UiRitmo> = {
  slug: "skriesanas-tempa-kalkulators",
  ui: () => ({
    calcular: "Ko vēlaties aprēķināt?",
    calcRitmo: "Tempu (pēc attāluma un laika)",
    calcTiempo: "Laiku (pēc attāluma un tempa)",
    calcDistancia: "Attālumu (pēc laika un tempa)",
    distancia: "Attālums",
    distanciaAyuda: "Izvēlieties skrējiena distanci vai „Cits attālums“ un ievadiet savu.",
    otra: "Cits attālums",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Pusmaratons",
    maraton: "Maratons",
    distanciaOtra: (u) => `Cits attālums (${u})`,
    horas: "Laiks: stundas",
    minutos: "Laiks: minūtes",
    segundos: "Laiks: sekundes",
    ritmoMin: (u) => `Temps: minūtes (min/${u})`,
    ritmoSeg: "Temps: sekundes",
    ritmo: (u) => `Temps (min/${u})`,
    tiempo: "Laiks finišā",
    distanciaRes: (u) => `Attālums (${u})`,
    velocidad: (u) => `Vidējais ātrums (${u})`,
    errorDistancia: "Ievadiet attālumu, kas lielāks par 0.",
    errorTiempo: "Ievadiet laiku: stundas, minūtes vai sekundes.",
    errorRitmo: "Ievadiet tempu: minūtes un sekundes uz attāluma vienību.",
  }),
};
