import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosUz: TextosUi<UiPromedio> = {
  slug: "ortacha-qiymat-kalkulyatori",
  ui: () => ({
    nota: (n) => `Baho ${n}`,
    notaAyuda: "Har bir baho yoki qiymatni vazni bilan kiriting. Kerak boʻlmagan qatorlarni boʻsh qoldiring.",
    peso: (n) => `Vazn ${n}`,
    pesoAyuda: "Bu foiz, kredit soati yoki necha marta hisoblanishi boʻlishi mumkin. Vazn kiritilmasa, barcha qiymatlar teng hisoblanadi.",
    ponderado: "Vaznli oʻrtacha",
    simple: "Oddiy oʻrtacha",
    cantidad: "Qiymatlar soni",
    sumaPesos: "Vaznlar yigʻindisi",
    errorSinNotas: "Kamida bitta qiymat kiriting.",
    errorFaltaPeso: "Bu qiymatning vazni yoʻq. Vazn ishlatsangiz, uni har bir qiymat uchun kiriting.",
    errorFaltaNota: "Bu vaznning qiymati yoʻq. Qiymatni kiriting yoki vaznni oʻchiring.",
    errorPesosCero: "Vaznlar yigʻindisi 0 boʻlib qoldi: kamida bittasi noldan katta boʻlishi kerak.",
    sinPesos: "Vazn kiritilmagani uchun vaznli oʻrtacha oddiy oʻrtacha bilan teng.",
  }),
};
