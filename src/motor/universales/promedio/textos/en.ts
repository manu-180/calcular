import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosEn: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `Grade ${n}`,
    notaAyuda: "Enter each grade or value with its weight. Leave unused rows blank.",
    peso: (n) => `Weight ${n}`,
    pesoAyuda: "It can be a percentage, credits or how many times it counts. With no weights, all values count the same.",
    ponderado: "Weighted average",
    simple: "Simple average",
    cantidad: "Values",
    sumaPesos: "Total of the weights",
    errorSinNotas: "Enter at least one value.",
    errorFaltaPeso: "This value has no weight. If you use weights, fill them in for every value.",
    errorFaltaNota: "This weight has no value. Fill in the value or clear the weight.",
    errorPesosCero: "The weights add up to 0: at least one has to be above zero.",
    sinPesos: "With no weights, the weighted average equals the simple one.",
  }),
};
