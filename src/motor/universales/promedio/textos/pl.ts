import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosPl: TextosUi<UiPromedio> = {
  slug: "kalkulator-sredniej-wazonej",
  ui: () => ({
    nota: (n) => `Ocena ${n}`,
    notaAyuda: "Wpisz każdą ocenę albo wartość razem z jej wagą. Niewykorzystane wiersze zostaw puste.",
    peso: (n) => `Waga ${n}`,
    pesoAyuda: "Może to być procent, punkty ECTS albo liczba, ile razy ocena się liczy. Bez wag wszystkie wartości liczą się tak samo.",
    ponderado: "Średnia ważona",
    simple: "Średnia arytmetyczna",
    cantidad: "Liczba wartości",
    sumaPesos: "Suma wag",
    errorSinNotas: "Wpisz co najmniej jedną wartość.",
    errorFaltaPeso: "Ta wartość nie ma wagi. Jeśli używasz wag, wpisz je przy każdej wartości.",
    errorFaltaNota: "Ta waga nie ma wartości. Wpisz wartość albo usuń wagę.",
    errorPesosCero: "Wagi sumują się do 0: co najmniej jedna musi być większa od zera.",
    sinPesos: "Bez wag średnia ważona jest równa średniej arytmetycznej.",
  }),
};
