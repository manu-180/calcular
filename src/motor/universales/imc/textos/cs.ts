import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosCs: TextosUi<UiImc> = {
  slug: "kalkulacka-bmi",
  ui: () => ({
    peso: (u) => `Hmotnost (${u})`,
    altura: (u) => `Výška (${u})`,
    pies: "Výška: stopy (ft)",
    pulgadas: "Výška: palce (in)",
    imc: "Index tělesné hmotnosti (BMI)",
    categoria: "Kategorie (WHO)",
    pesoMin: (u) => `Dolní hranice zdravé hmotnosti (${u})`,
    pesoMax: (u) => `Horní hranice zdravé hmotnosti (${u})`,
    rangoAyuda: "Rozmezí hmotnosti, ve kterém při vaší výšce zůstává BMI v normě.",
    bajo: "Podváha",
    normal: "Normální hmotnost",
    sobrepeso: "Nadváha",
    obesidad1: "Obezita I. stupně",
    obesidad2: "Obezita II. stupně",
    obesidad3: "Obezita III. stupně",
    errorPeso: "Hmotnost musí být větší než nula.",
    errorAltura: "Výška musí být větší než nula.",
    aviso:
      "BMI je obecný ukazatel pro dospělé: nerozlišuje svaly a tuk a u těhotných žen a dětí se hodnotí jinak. Nenahrazuje konzultaci s lékařem.",
  }),
};
