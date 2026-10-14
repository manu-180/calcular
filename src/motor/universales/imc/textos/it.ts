import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosIt: TextosUi<UiImc> = {
  slug: "calcolo-bmi",
  ui: () => ({
    peso: (u) => `Peso (${u})`,
    altura: (u) => `Altezza (${u})`,
    pies: "Altezza: piedi (ft)",
    pulgadas: "Altezza: pollici (in)",
    imc: "Indice di massa corporea (BMI)",
    categoria: "Categoria (OMS)",
    pesoMin: (u) => `Peso ideale da (${u})`,
    pesoMax: (u) => `Peso ideale fino a (${u})`,
    rangoAyuda: "L'intervallo di peso che, alla tua altezza, dà un BMI nella norma.",
    bajo: "Sottopeso",
    normal: "Normopeso",
    sobrepeso: "Sovrappeso",
    obesidad1: "Obesità di classe I",
    obesidad2: "Obesità di classe II",
    obesidad3: "Obesità di classe III",
    errorPeso: "Il peso deve essere maggiore di 0.",
    errorAltura: "L'altezza deve essere maggiore di 0.",
    aviso:
      "Il BMI è un'indicazione generale per gli adulti: non distingue i muscoli dal grasso e non vale allo stesso modo in gravidanza o per i bambini. Non sostituisce il parere del medico.",
  }),
};
