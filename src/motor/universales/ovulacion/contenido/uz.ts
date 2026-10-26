import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoUz: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Ovulyatsiya kalkulyatori",
    title: tituloQueEntre(`Ovulyatsiya kalkulyatori: ${ctx.nombrePais}`, "Ovulyatsiya kunini hisoblash", "Ovulyatsiya kalkulyatori"),
    description: "Ovulyatsiya kunini, homilador boʻlish ehtimoli yuqori kunlarni va keyingi hayz sanasini hisoblang. Keyingi uchta sikl ham koʻrsatiladi.",
    intro: [
      "Oxirgi hayzning birinchi kunini va sikl davomiyligini kiriting. Taxminiy ovulyatsiya kunini, qulay kunlarni va keyingi hayz sanasini koʻrasiz.",
      "Bu muntazam sikllar uchun taxminiy hisob. U homiladorlikdan saqlanish usuli emas va shifokor maslahatining oʻrnini bosmaydi.",
    ],
    comoSeCalcula: [
      `Ovulyatsiya odatda keyingi hayzdan ${FASE_LUTEA} kun oldin boʻladi: oxirgi hayzning birinchi kuni + sikl davomiyligi − ${FASE_LUTEA} kun.`,
      "Homilador boʻlish ehtimoli yuqori kunlar ovulyatsiyadan 5 kun oldin boshlanib, undan keyingi kuni tugaydi, chunki spermatozoidlar 5 kungacha yashashi mumkin.",
      "Keyingi hayz oxirgisidan bir sikl keyin kutiladi.",
    ],
    ejemplo: [
      `Oxirgi hayz sanasi ${f(fum)} va sikl 28 kun boʻlsa, taxminiy ovulyatsiya kuni: ${f(aFecha(v.ovulacion))}.`,
      `Qulay kunlar boshlanishi: ${f(aFecha(v.desde))}. Tugashi: ${f(aFecha(v.hasta))}. Keyingi hayz kutiladigan sana: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Homilador boʻlish uchun eng qulay kunlar qaysilar?",
        respuesta: "Ovulyatsiyadan oldingi ikki yoki uch kun va ovulyatsiya kunining oʻzi. Butun qulay davr taxminan 6 kun davom etadi.",
      },
      {
        pregunta: "Sikl muntazam boʻlmasa ham ishlaydimi?",
        respuesta: "Taxminiy tasavvur beradi, lekin aniqligi pastroq. Sikl notekis boʻlsa, ovulyatsiya oydan oyga bir necha kunga surilishi mumkin.",
      },
      {
        pregunta: "Bundan homiladorlikdan saqlanish uchun foydalansa boʻladimi?",
        respuesta: "Yoʻq. Hisob taxminiy, ovulyatsiya esa erta yoki kech boʻlishi mumkin. Homiladorlikdan saqlanish uchun kontratseptsiya usulidan foydalaning.",
      },
    ],
    glosario: [
      { termino: "Ovulyatsiya", definicion: "Tuxumdondan tuxum hujayra chiqadigan payt." },
      { termino: "Qulay kunlar", definicion: "Siklning homilador boʻlish mumkin boʻlgan kunlari." },
    ],
  };
};
