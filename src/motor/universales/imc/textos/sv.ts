import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosSv: TextosUi<UiImc> = {
  slug: "bmi-kalkylator",
  ui: () => ({
    peso: (u) => `Vikt (${u})`,
    altura: (u) => `Längd (${u})`,
    pies: "Längd: fot (ft)",
    pulgadas: "Längd: tum (in)",
    imc: "Body mass index (BMI)",
    categoria: "Kategori (WHO)",
    pesoMin: (u) => `Normalvikt från (${u})`,
    pesoMax: (u) => `Normalvikt upp till (${u})`,
    rangoAyuda: "Det viktintervall som ger ett normalt BMI vid din längd.",
    bajo: "Undervikt",
    normal: "Normalvikt",
    sobrepeso: "Övervikt",
    obesidad1: "Fetma grad 1",
    obesidad2: "Fetma grad 2",
    obesidad3: "Fetma grad 3",
    errorPeso: "Vikten måste vara större än 0.",
    errorAltura: "Längden måste vara större än 0.",
    aviso:
      "BMI är en allmän vägledning för vuxna. Det skiljer inte på muskler och fett och används på ett annat sätt under graviditet och för barn. Det ersätter inte en bedömning av vårdpersonal.",
  }),
};
