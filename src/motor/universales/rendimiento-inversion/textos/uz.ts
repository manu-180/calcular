import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosUz: TextosUi<UiRendimientoInversion> = {
  slug: "investitsiya-daromadi-kalkulyatori",
  ui: () => ({
    inicial: "Kiritilgan investitsiya summasi",
    final: "Yakuniy qiymat",
    finalAyuda: "Investitsiyaning bugungi qiymati yoki uni sotganingizda olgan summangiz.",
    cobrado: "Davomida olingan daromad (ixtiyoriy)",
    cobradoAyuda: "Qayta investitsiya qilmagan dividend, foiz yoki ijara daromadingiz.",
    anios: "Investitsiya muddati (yil)",
    aniosAyuda: "Toʻliq boʻlmagan yil uchun kasr son kiritish mumkin, masalan, bir yarim yil.",
    ganancia: "Foyda",
    roi: "Umumiy daromadlilik (ROI)",
    cagr: "Yillik daromadlilik (CAGR)",
    cagrAyuda: "Har yili murakkab foiz bilan takrorlanganda xuddi shu natijani beradigan yillik daromadlilik.",
    errorInicial: "Boshida qancha investitsiya kiritganingizni yozing.",
    observacionCorto: "Bir yildan qisqa muddatda yillik daromadlilik qisqa natijani butun yil davomida takrorlangandek choʻzadi. Unga ehtiyotkorlik bilan qarang.",
    observacionInflacion: "Xarid qobiliyatingiz oshganini bilish uchun yillik daromadlilikni shu davrdagi inflyatsiya bilan solishtiring.",
  }),
};
