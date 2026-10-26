import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosSv: TextosUi<UiPromedio> = {
  slug: "viktat-medelvarde",
  ui: () => ({
    nota: (n) => `Värde ${n}`,
    notaAyuda: "Fyll i varje betyg eller värde med sin vikt. Lämna rader du inte använder tomma.",
    peso: (n) => `Vikt ${n}`,
    pesoAyuda: "Det kan vara en procentsats, poäng eller hur många gånger värdet räknas. Utan vikter räknas alla värden lika.",
    ponderado: "Viktat medelvärde",
    simple: "Vanligt medelvärde",
    cantidad: "Antal värden",
    sumaPesos: "Summa av vikterna",
    errorSinNotas: "Fyll i minst ett värde.",
    errorFaltaPeso: "Det här värdet saknar vikt. Använder du vikter måste alla värden ha en.",
    errorFaltaNota: "Den här vikten saknar värde. Fyll i värdet eller ta bort vikten.",
    errorPesosCero: "Vikterna blir 0 tillsammans. Minst en måste vara större än noll.",
    sinPesos: "Utan vikter blir det viktade medelvärdet detsamma som det vanliga.",
  }),
};
