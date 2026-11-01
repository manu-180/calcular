import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosPl: TextosUi<UiHorasTrabajadas> = {
  slug: "kalkulator-godzin-pracy",
  ui: () => ({
    dias: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
    entrada: (dia) => `${dia}: od`,
    salida: (dia) => `${dia}: do`,
    horarioAyuda: "Dni bez pracy zostaw puste. Jeśli kończysz po północy, to nadal ta sama zmiana.",
    pausa: "Niepłatna przerwa dziennie (minuty)",
    pausaAyuda: "Przerwa na obiad albo odpoczynek, za którą nie dostajesz pieniędzy. Odejmujemy ją w każdym dniu pracy.",
    pagoHora: "Stawka za godzinę",
    umbral: "Godziny normalne w tygodniu (opcjonalnie)",
    umbralAyuda: "Godziny ponad tę liczbę są płatne jak nadgodziny. Zostaw puste, jeśli nie ma nadgodzin.",
    recargo: "Dodatek za nadgodziny (%)",
    recargoAyuda: "O ile więcej płatna jest każda nadgodzina. 50% oznacza półtorej stawki.",
    horasTotales: "Przepracowane godziny",
    horasReloj: "W godzinach i minutach",
    horasNormales: "Godziny normalne",
    horasExtra: "Nadgodziny",
    pagoNormal: "Wynagrodzenie za godziny normalne",
    pagoExtra: "Wynagrodzenie za nadgodziny",
    pagoTotal: "Wynagrodzenie za cały tydzień",
    tabla: "Dzień po dniu",
    colDia: "Dzień",
    colEntrada: "Od",
    colSalida: "Do",
    colHoras: "Godziny",
    errorFaltaSalida: (dia) => `${dia}: brakuje godziny zakończenia.`,
    errorFaltaEntrada: (dia) => `${dia}: brakuje godziny rozpoczęcia.`,
    errorIguales: (dia) => `${dia}: godzina rozpoczęcia i zakończenia jest taka sama.`,
    errorPausa: (dia) => `${dia}: przerwa jest tak długa jak zmiana albo dłuższa.`,
    errorSinDias: "Wpisz godzinę rozpoczęcia i zakończenia pracy co najmniej dla jednego dnia.",
    observacionNoche: "Niektóre zmiany kończą się następnego dnia: liczymy je w całości w dniu, w którym się zaczynają.",
    observacionGenerico:
      "To ogólne wyliczenie. Limity czasu pracy, zasady nadgodzin i dodatki za pracę w nocy albo w święta zależą od przepisów i twojej umowy.",
  }),
};
