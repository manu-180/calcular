import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

const base: TextosUi<UiRitmo> = {
  slug: "calculadora-de-pace",
  ui: () => ({
    calcular: "O que você quer calcular?",
    calcRitmo: "Pace (pela distância e o tempo)",
    calcTiempo: "Tempo (pela distância e o pace)",
    calcDistancia: "Distância (pelo tempo e o pace)",
    distancia: "Distância",
    distanciaAyuda: "Escolha uma prova, ou “Outra” para digitar a distância.",
    otra: "Outra distância",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Meia maratona",
    maraton: "Maratona",
    distanciaOtra: (u) => `Outra distância (${u})`,
    horas: "Tempo: horas",
    minutos: "Tempo: minutos",
    segundos: "Tempo: segundos",
    ritmoMin: (u) => `Pace: minutos por ${u}`,
    ritmoSeg: "Pace: segundos",
    ritmo: (u) => `Pace (min/${u})`,
    tiempo: "Tempo de prova",
    distanciaRes: (u) => `Distância (${u})`,
    velocidad: (u) => `Velocidade média (${u})`,
    errorDistancia: "Coloque uma distância maior que 0.",
    errorTiempo: "Coloque o tempo: horas, minutos ou segundos.",
    errorRitmo: "Coloque o pace: minutos e segundos por unidade de distância.",
  }),
};

const portugal = (): Partial<UiRitmo> => ({
  calcular: "O que quer calcular?",
  calcRitmo: "Ritmo (pela distância e o tempo)",
  calcTiempo: "Tempo (pela distância e o ritmo)",
  calcDistancia: "Distância (pelo tempo e o ritmo)",
  distanciaAyuda: "Escolha uma prova, ou “Outra” para escrever a distância.",
  ritmoMin: (u) => `Ritmo: minutos por ${u}`,
  ritmoSeg: "Ritmo: segundos",
  ritmo: (u) => `Ritmo (min/${u})`,
  errorDistancia: "Indique uma distância maior do que 0.",
  errorTiempo: "Indique o tempo: horas, minutos ou segundos.",
  errorRitmo: "Indique o ritmo: minutos e segundos por unidade de distância.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
