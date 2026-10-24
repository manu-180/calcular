import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosDa: TextosUi<UiImc> = {
  slug: "bmi-beregner",
  ui: () => ({
    peso: (u) => `Vægt (${u})`,
    altura: (u) => `Højde (${u})`,
    pies: "Højde: fod (ft)",
    pulgadas: "Højde: tommer (in)",
    imc: "Body mass index (BMI)",
    categoria: "Kategori (WHO)",
    pesoMin: (u) => `Normalvægt fra (${u})`,
    pesoMax: (u) => `Normalvægt op til (${u})`,
    rangoAyuda: "Det vægtinterval, der giver et normalt BMI ved din højde.",
    bajo: "Undervægt",
    normal: "Normalvægt",
    sobrepeso: "Overvægt",
    obesidad1: "Svær overvægt, grad 1",
    obesidad2: "Svær overvægt, grad 2",
    obesidad3: "Svær overvægt, grad 3",
    errorPeso: "Vægten skal være større end 0.",
    errorAltura: "Højden skal være større end 0.",
    aviso:
      "BMI er en generel rettesnor for voksne. Det skelner ikke mellem muskler og fedt og bruges anderledes under graviditet og for børn. Det erstatter ikke en vurdering hos din læge.",
  }),
};
