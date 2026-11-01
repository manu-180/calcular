import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosSk: TextosUi<UiImc> = {
  slug: "kalkulacka-bmi",
  ui: () => ({
    peso: (u) => `Hmotnosť (${u})`,
    altura: (u) => `Výška (${u})`,
    pies: "Výška: stopy (ft)",
    pulgadas: "Výška: palce (in)",
    imc: "Index telesnej hmotnosti (BMI)",
    categoria: "Kategória (WHO)",
    pesoMin: (u) => `Dolná hranica zdravej hmotnosti (${u})`,
    pesoMax: (u) => `Horná hranica zdravej hmotnosti (${u})`,
    rangoAyuda: "Rozpätie hmotnosti, v ktorom pri vašej výške zostáva BMI v norme.",
    bajo: "Podváha",
    normal: "Normálna hmotnosť",
    sobrepeso: "Nadváha",
    obesidad1: "Obezita I. stupňa",
    obesidad2: "Obezita II. stupňa",
    obesidad3: "Obezita III. stupňa",
    errorPeso: "Hmotnosť musí byť väčšia ako nula.",
    errorAltura: "Výška musí byť väčšia ako nula.",
    aviso:
      "BMI je všeobecný ukazovateľ pre dospelých: nerozlišuje svaly a tuk a u tehotných žien a detí sa hodnotí inak. Nenahrádza konzultáciu s lekárom.",
  }),
};
