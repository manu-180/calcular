import type { TextosUi } from "../../tipos";
import type { UiRitmo } from "../definicion";

export const textosPl: TextosUi<UiRitmo> = {
  slug: "kalkulator-tempa-biegu",
  ui: () => ({
    calcular: "Co chcesz policzyć?",
    calcRitmo: "Tempo (z dystansu i czasu)",
    calcTiempo: "Czas (z dystansu i tempa)",
    calcDistancia: "Dystans (z czasu i tempa)",
    distancia: "Dystans",
    distanciaAyuda: "Wybierz bieg albo „Inny dystans”, żeby wpisać własny.",
    otra: "Inny dystans",
    cincoK: "5 km",
    diezK: "10 km",
    media: "Półmaraton",
    maraton: "Maraton",
    distanciaOtra: (u) => `Inny dystans (${u})`,
    horas: "Czas: godziny",
    minutos: "Czas: minuty",
    segundos: "Czas: sekundy",
    ritmoMin: (u) => `Tempo: minuty na ${u}`,
    ritmoSeg: "Tempo: sekundy",
    ritmo: (u) => `Tempo (min/${u})`,
    tiempo: "Czas na mecie",
    distanciaRes: (u) => `Dystans (${u})`,
    velocidad: (u) => `Średnia prędkość (${u})`,
    errorDistancia: "Wpisz dystans większy od 0.",
    errorTiempo: "Wpisz czas: godziny, minuty albo sekundy.",
    errorRitmo: "Wpisz tempo: minuty i sekundy na jednostkę dystansu.",
  }),
};
