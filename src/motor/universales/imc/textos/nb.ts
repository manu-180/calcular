import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosNb: TextosUi<UiImc> = {
  slug: "bmi-kalkulator",
  ui: () => ({
    peso: (u) => `Vekt (${u})`,
    altura: (u) => `Høyde (${u})`,
    pies: "Høyde: fot (ft)",
    pulgadas: "Høyde: tommer (in)",
    imc: "Kroppsmasseindeks (KMI/BMI)",
    categoria: "Kategori (WHO)",
    pesoMin: (u) => `Normalvekt fra (${u})`,
    pesoMax: (u) => `Normalvekt opp til (${u})`,
    rangoAyuda: "Vektområdet som gir normal KMI for høyden din.",
    bajo: "Undervekt",
    normal: "Normalvekt",
    sobrepeso: "Overvekt",
    obesidad1: "Fedme, grad 1",
    obesidad2: "Fedme, grad 2",
    obesidad3: "Fedme, grad 3",
    errorPeso: "Vekten må være større enn 0.",
    errorAltura: "Høyden må være større enn 0.",
    aviso:
      "KMI er en grov pekepinn for voksne. Den skiller ikke mellom muskler og fett, og den brukes på en annen måte for gravide og barn. Den erstatter ikke en vurdering hos legen din.",
  }),
};
