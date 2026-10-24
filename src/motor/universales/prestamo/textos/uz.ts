import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosUz: TextosUi<UiPrestamo> = {
  slug: "kredit-kalkulyatori",
  ui: () => ({
    monto: "Kredit summasi",
    tasa: "Yillik foiz stavkasi (%)",
    tasaAyuda: "Taklifdagi yillik nominal foiz stavkasi. Bank oylik stavkani koʻrsatsa, uni 12 ga koʻpaytiring. Komissiyalar kirmaydi.",
    meses: "Kredit muddati (oy)",
    extra: "Har oy qoʻshimcha toʻlov (ixtiyoriy)",
    extraAyuda: "Kreditni ertaroq yopish uchun har oy qoʻshib toʻlamoqchi boʻlgan summangiz. Hammasi asosiy qarzga ketadi.",
    cuota: "Oylik toʻlov",
    intereses: "Jami foizlar",
    total: "Jami toʻlanadigan summa",
    mesesReales: "Qoʻshimcha toʻlov bilan yopilish muddati (oy)",
    ahorro: "Tejaladigan foizlar",
    tabla: "Toʻlov jadvali",
    colMes: "Oy",
    colPago: "Toʻlov",
    colInteres: "Foiz",
    colCapital: "Asosiy qarz",
    colSaldo: "Qolgan qarz",
    errorMonto: "Noldan katta summa kiriting.",
    observacionCostos: "Oylik toʻlovga bank qoʻshishi mumkin boʻlgan sugʻurta, komissiya va soliqlar kirmaydi. Shartnomani imzolashdan oldin umumiy qiymatini soʻrang.",
    observacionExtra: (meses, ahorro) => `Qoʻshimcha toʻlov bilan kreditingiz ertaroq yopiladi. Yopilish muddati, oy: ${meses}. Foizlardan tejaysiz: ${ahorro}.`,
  }),
};
