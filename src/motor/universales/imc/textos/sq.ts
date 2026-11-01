import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosSq: TextosUi<UiImc> = {
  slug: "kalkulator-bmi",
  ui: () => ({
    peso: (u) => `Pesha (${u})`,
    altura: (u) => `Gjatësia (${u})`,
    pies: "Gjatësia: këmbë",
    pulgadas: "Gjatësia: inç",
    imc: "Indeksi i masës trupore (BMI)",
    categoria: "Kategoria (OBSH)",
    pesoMin: (u) => `Peshë e shëndetshme nga (${u})`,
    pesoMax: (u) => `Peshë e shëndetshme deri në (${u})`,
    rangoAyuda: "Intervali i peshës që jep një BMI të shëndetshëm për këtë gjatësi.",
    bajo: "Nënpeshë",
    normal: "Peshë normale",
    sobrepeso: "Mbipeshë",
    obesidad1: "Obezitet i shkallës 1",
    obesidad2: "Obezitet i shkallës 2",
    obesidad3: "Obezitet i shkallës 3",
    errorPeso: "Pesha duhet të jetë më e madhe se 0.",
    errorAltura: "Gjatësia duhet të jetë më e madhe se 0.",
    aviso:
      "BMI është një orientim i përgjithshëm për të rriturit: nuk i dallon muskujt nga dhjami dhe nuk zbatohet njësoj gjatë shtatzënisë ose te fëmijët. Nuk zëvendëson konsultën te mjeku.",
  }),
};
