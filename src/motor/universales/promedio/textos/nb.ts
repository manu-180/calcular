import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosNb: TextosUi<UiPromedio> = {
  slug: "vektet-gjennomsnitt",
  ui: () => ({
    nota: (n) => `Verdi ${n}`,
    notaAyuda: "Fyll inn hver karakter eller verdi med vekten sin. La radene du ikke bruker, stå tomme.",
    peso: (n) => `Vekt ${n}`,
    pesoAyuda: "Det kan være en prosentsats, studiepoeng eller hvor mange ganger verdien teller. Uten vekter teller alle verdiene likt.",
    ponderado: "Vektet gjennomsnitt",
    simple: "Vanlig gjennomsnitt",
    cantidad: "Antall verdier",
    sumaPesos: "Sum av vektene",
    errorSinNotas: "Fyll inn minst én verdi.",
    errorFaltaPeso: "Denne verdien mangler vekt. Bruker du vekter, må alle verdiene ha en.",
    errorFaltaNota: "Denne vekten mangler verdi. Fyll inn verdien eller fjern vekten.",
    errorPesosCero: "Vektene blir 0 til sammen. Minst én må være større enn null.",
    sinPesos: "Uten vekter blir det vektede gjennomsnittet det samme som det vanlige.",
  }),
};
