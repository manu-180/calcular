import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const textos: TextosUi<UiImc> = {
  slug: "bmi-rechner",
  ui: () => ({
    peso: (u) => `Gewicht (${u})`,
    altura: (u) => `Körpergröße (${u})`,
    pies: "Körpergröße: Fuß (ft)",
    pulgadas: "Körpergröße: Zoll (in)",
    imc: "Body-Mass-Index (BMI)",
    categoria: "Einstufung (WHO)",
    pesoMin: (u) => `Normalgewicht ab (${u})`,
    pesoMax: (u) => `Normalgewicht bis (${u})`,
    rangoAyuda: "Der Gewichtsbereich, der bei dieser Körpergröße einen BMI im Normalbereich ergibt.",
    bajo: "Untergewicht",
    normal: "Normalgewicht",
    sobrepeso: "Übergewicht",
    obesidad1: "Adipositas Grad I",
    obesidad2: "Adipositas Grad II",
    obesidad3: "Adipositas Grad III",
    errorPeso: "Das Gewicht muss über 0 liegen.",
    errorAltura: "Die Körpergröße muss über 0 liegen.",
    aviso:
      "Der BMI ist ein grober Richtwert für Erwachsene. Er unterscheidet nicht zwischen Muskeln und Fett und gilt in der Schwangerschaft und für Kinder nicht in gleicher Weise. Er ersetzt keine ärztliche Beratung.",
  }),
};

export const textosDe = textosConSuiza(textos);
