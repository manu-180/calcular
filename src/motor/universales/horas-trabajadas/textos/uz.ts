import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosUz: TextosUi<UiHorasTrabajadas> = {
  slug: "ish-soatlari-kalkulyatori",
  ui: () => ({
    dias: ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"],
    entrada: (dia) => `${dia}: ish boshlanishi`,
    salida: (dia) => `${dia}: ish tugashi`,
    horarioAyuda: "Ishlamagan kunlaringizni boʻsh qoldiring. Yarim tundan keyin tugatsangiz, bu oʻsha smena hisoblanadi.",
    pausa: "Kunlik haq toʻlanmaydigan tanaffus (daqiqa)",
    pausaAyuda: "Haq toʻlanmaydigan tushlik yoki dam olish vaqti. U ishlagan har bir kuningizdan ayiriladi.",
    pagoHora: "Soatlik ish haqi",
    umbral: "Haftalik oddiy ish soatlari (ixtiyoriy)",
    umbralAyuda: "Bu sondan ortiq soatlar qoʻshimcha ish stavkasida toʻlanadi. Qoʻshimcha ish boʻlmasa, boʻsh qoldiring.",
    recargo: "Qoʻshimcha ish uchun ustama (%)",
    recargoAyuda: "Har bir qoʻshimcha soat qancha koʻp toʻlanishi. 50 foiz soatlik haqning bir yarim baravari degani.",
    horasTotales: "Ishlangan soatlar",
    horasReloj: "Soat va daqiqada",
    horasNormales: "Oddiy soatlar",
    horasExtra: "Qoʻshimcha ish soatlari",
    pagoNormal: "Oddiy soatlar uchun haq",
    pagoExtra: "Qoʻshimcha ish uchun haq",
    pagoTotal: "Haftalik jami ish haqi",
    tabla: "Kunma-kun",
    colDia: "Kun",
    colEntrada: "Boshlanishi",
    colSalida: "Tugashi",
    colHoras: "Soat",
    errorFaltaSalida: (dia) => `Ish tugash vaqti koʻrsatilmagan: ${dia}.`,
    errorFaltaEntrada: (dia) => `Ish boshlanish vaqti koʻrsatilmagan: ${dia}.`,
    errorIguales: (dia) => `Ish boshlanishi va tugashi bir xil vaqtda: ${dia}.`,
    errorPausa: (dia) => `Tanaffus smenaning oʻzidan uzun yoki unga teng: ${dia}.`,
    errorSinDias: "Kamida bir kun uchun ish boshlanishi va tugash vaqtini kiriting.",
    observacionNoche: "Baʼzi smenalar ertasi kuni tugaydi: ular toʻliq boshlangan kuniga hisoblanadi.",
    observacionGenerico:
      "Bu umumiy hisob-kitob. Ish vaqtining eng koʻp muddati, qoʻshimcha ish qoidalari va tungi yoki bayram kunlaridagi ish uchun haq qonun va mehnat shartnomangizga bogʻliq.",
  }),
};
