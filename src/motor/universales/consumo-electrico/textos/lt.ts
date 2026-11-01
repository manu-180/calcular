import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosLt: TextosUi<UiConsumoElectrico> = {
  slug: "elektros-sanaudu-skaiciuokle",
  ui: () => ({
    potencia: "Prietaiso galia (W)",
    potenciaAyuda: "Ją rasite etiketėje arba instrukcijoje vatais (W). Jei nurodyta kW, padauginkite iš 1000.",
    cantidad: "Vienodų prietaisų skaičius",
    horas: "Veikimo valandos per dieną",
    dias: "Veikimo dienos per mėnesį",
    precio: "1 kWh kaina",
    precioAyuda: "Ją rasite elektros sąskaitoje. Kad išlaidos būtų tikros, įveskite kainą su persiuntimu ir mokesčiais.",
    kwhDia: "Sąnaudos per dieną (kWh)",
    kwhMes: "Sąnaudos per mėnesį (kWh)",
    kwhAnio: "Sąnaudos per metus (kWh)",
    costoDia: "Išlaidos per dieną",
    costoMes: "Išlaidos per mėnesį",
    costoAnio: "Išlaidos per metus",
    errorHoras: "Paroje yra 24 valandos: veikimo trukmė turi būti nuo 0 iki 24.",
  }),
};
