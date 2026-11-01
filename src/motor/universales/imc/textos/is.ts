import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosIs: TextosUi<UiImc> = {
  slug: "likamsthyngdarstudull",
  ui: () => ({
    peso: (u) => `Þyngd (${u})`,
    altura: (u) => `Hæð (${u})`,
    pies: "Hæð: fet (ft)",
    pulgadas: "Hæð: tommur (in)",
    imc: "Líkamsþyngdarstuðull (LÞS)",
    categoria: "Flokkur (WHO)",
    pesoMin: (u) => `Kjörþyngd frá (${u})`,
    pesoMax: (u) => `Kjörþyngd upp að (${u})`,
    rangoAyuda: "Þyngdarbilið sem gefur eðlilegan LÞS miðað við hæð þína.",
    bajo: "Undirþyngd",
    normal: "Kjörþyngd",
    sobrepeso: "Ofþyngd",
    obesidad1: "Offita, 1. stig",
    obesidad2: "Offita, 2. stig",
    obesidad3: "Offita, 3. stig",
    errorPeso: "Þyngdin þarf að vera meiri en 0.",
    errorAltura: "Hæðin þarf að vera meiri en 0.",
    aviso:
      "LÞS er almennt viðmið fyrir fullorðna. Hann gerir ekki greinarmun á vöðvum og fitu og er notaður á annan hátt á meðgöngu og fyrir börn. Hann kemur ekki í stað mats heilbrigðisstarfsfólks.",
  }),
};
