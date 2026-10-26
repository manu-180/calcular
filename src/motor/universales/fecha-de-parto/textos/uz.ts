import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosUz: TextosUi<UiFechaDeParto> = {
  slug: "tugruq-sanasi-kalkulyatori",
  ui: () => ({
    metodo: "Qaysi sanani bilasiz?",
    fum: "Oxirgi hayzning birinchi kuni",
    concepcion: "Urugʻlanish sanasi",
    fecha: "Sana",
    fechaAyuda: "Oxirgi hayzni tanlasangiz, qon kela boshlagan birinchi kunni kiriting.",
    ciclo: "Hayz sikli davomiyligi (kun)",
    cicloAyuda: "Faqat oxirgi hayz sanasi bilan ishlatiladi. Bilmasangiz, 28 kun qiymatini qoldiring.",
    fpp: "Taxminiy tugʻruq sanasi",
    edadGestacional: "Bugungi homiladorlik muddati",
    trimestre: "Trimestr",
    faltan: "Qolgan kunlar",
    fechaConcepcion: "Taxminiy urugʻlanish sanasi",
    semanasYDias: (s, d) => `${s} hafta${d ? ` ${d} kun` : ""}`,
    trimestres: ["Birinchi trimestr", "Ikkinchi trimestr", "Uchinchi trimestr"],
    errorFutura: "Sana bugungi kundan keyin boʻlishi mumkin emas.",
    errorCiclo: "Sikl davomiyligi 20 kundan 45 kungacha boʻlishi kerak.",
    notaPasada: "Bu sanadan beri 42 haftadan koʻp vaqt oʻtgan, shuning uchun homiladorlik muddati koʻrsatilmaydi.",
    aviso: "Bu taxminiy hisob: kam chaqaloq aynan shu kuni tugʻiladi. Eng aniq sanani UTT va shifokor koʻriklari beradi. Natija shifokor maslahatining oʻrnini bosmaydi.",
  }),
};
