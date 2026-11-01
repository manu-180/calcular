import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosUz: TextosUi<UiImc> = {
  slug: "tana-massasi-indeksi-kalkulyatori",
  ui: () => ({
    peso: (u) => `Vazn (${u})`,
    altura: (u) => `Boʻy (${u})`,
    pies: "Boʻy: fut (ft)",
    pulgadas: "Boʻy: duym (in)",
    imc: "Tana massasi indeksi (TMI)",
    categoria: "Toifa (JSST)",
    pesoMin: (u) => `Sogʻlom vaznning quyi chegarasi (${u})`,
    pesoMax: (u) => `Sogʻlom vaznning yuqori chegarasi (${u})`,
    rangoAyuda: "Shu boʻyda sogʻlom TMI beradigan vazn oraligʻi.",
    bajo: "Vazn yetishmasligi",
    normal: "Meʼyoriy vazn",
    sobrepeso: "Ortiqcha vazn",
    obesidad1: "1-darajali semizlik",
    obesidad2: "2-darajali semizlik",
    obesidad3: "3-darajali semizlik",
    errorPeso: "Vazn noldan katta boʻlishi kerak.",
    errorAltura: "Boʻy noldan katta boʻlishi kerak.",
    aviso:
      "TMI kattalar uchun umumiy koʻrsatkich: u mushak va yogʻni farqlamaydi, homiladorlikda va bolalarda boshqacha baholanadi. Bu natija shifokor maslahatining oʻrnini bosmaydi.",
  }),
};
