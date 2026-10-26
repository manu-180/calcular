import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosFi: TextosUi<UiPromedio> = {
  slug: "painotettu-keskiarvo",
  ui: () => ({
    nota: (n) => `Arvo ${n}`,
    notaAyuda: "Syötä jokainen arvosana tai arvo ja sen paino. Jätä käyttämättömät rivit tyhjiksi.",
    peso: (n) => `Paino ${n}`,
    pesoAyuda: "Paino voi olla prosentti, opintopisteet tai se, montako kertaa arvo lasketaan. Ilman painoja kaikki arvot painavat yhtä paljon.",
    ponderado: "Painotettu keskiarvo",
    simple: "Tavallinen keskiarvo",
    cantidad: "Arvojen määrä",
    sumaPesos: "Painojen summa",
    errorSinNotas: "Syötä vähintään yksi arvo.",
    errorFaltaPeso: "Tältä arvolta puuttuu paino. Jos käytät painoja, jokaisella arvolla pitää olla paino.",
    errorFaltaNota: "Tältä painolta puuttuu arvo. Syötä arvo tai poista paino.",
    errorPesosCero: "Painojen summa on 0. Ainakin yhden painon pitää olla suurempi kuin nolla.",
    sinPesos: "Ilman painoja painotettu keskiarvo on sama kuin tavallinen keskiarvo.",
  }),
};
