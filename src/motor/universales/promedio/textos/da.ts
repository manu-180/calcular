import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosDa: TextosUi<UiPromedio> = {
  slug: "vaegtet-gennemsnit",
  ui: () => ({
    nota: (n) => `Værdi ${n}`,
    notaAyuda: "Skriv hver karakter eller værdi med dens vægt. Lad de rækker, du ikke bruger, stå tomme.",
    peso: (n) => `Vægt ${n}`,
    pesoAyuda: "Det kan være en procentsats, ECTS-point eller hvor mange gange værdien tæller. Uden vægte tæller alle værdier lige meget.",
    ponderado: "Vægtet gennemsnit",
    simple: "Almindeligt gennemsnit",
    cantidad: "Antal værdier",
    sumaPesos: "Summen af vægtene",
    errorSinNotas: "Skriv mindst én værdi.",
    errorFaltaPeso: "Denne værdi mangler en vægt. Bruger du vægte, skal alle værdier have en.",
    errorFaltaNota: "Denne vægt mangler en værdi. Skriv værdien, eller fjern vægten.",
    errorPesosCero: "Vægtene giver 0 tilsammen. Mindst én skal være større end nul.",
    sinPesos: "Uden vægte er det vægtede gennemsnit det samme som det almindelige.",
  }),
};
