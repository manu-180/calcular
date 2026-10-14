import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosEn: TextosUi<UiImc> = {
  slug: "bmi",
  ui: () => ({
    peso: (u) => `Weight (${u})`,
    altura: (u) => `Height (${u})`,
    pies: "Height: feet (ft)",
    pulgadas: "Height: inches (in)",
    imc: "Body mass index (BMI)",
    categoria: "Category (WHO)",
    pesoMin: (u) => `Healthy weight from (${u})`,
    pesoMax: (u) => `Healthy weight up to (${u})`,
    rangoAyuda: "The weight range that gives a healthy BMI at this height.",
    bajo: "Underweight",
    normal: "Healthy weight",
    sobrepeso: "Overweight",
    obesidad1: "Obesity class 1",
    obesidad2: "Obesity class 2",
    obesidad3: "Obesity class 3",
    errorPeso: "Weight has to be more than 0.",
    errorAltura: "Height has to be more than 0.",
    aviso:
      "BMI is a general guide for adults: it can't tell muscle from fat and doesn't apply the same way in pregnancy or to children. It is not a substitute for advice from a health professional.",
  }),
};
