import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosUz: TextosUi<UiAumentoDeSueldo> = {
  slug: "ish-haqi-oshishi-kalkulyatori",
  ui: () => ({
    sueldo: "Hozirgi oylik maosh",
    sueldoAyuda: "Hisoblangan yoki qoʻlga tegadigan maosh, qaysi biri qulay boʻlsa. Natija ham shu asosda chiqadi.",
    aumentoPorcentaje: "Oshirish (%)",
    aumentoMonto: "Oshirish summasi (ixtiyoriy)",
    aumentoMontoAyuda: "Maoshingiz qatʼiy summaga oshirilgan boʻlsa, shu yerga yozing. U foiz oʻrniga ishlatiladi.",
    inflacion: "Shu davrdagi inflyatsiya (%, ixtiyoriy)",
    inflacionAyuda: "Oxirgi oshirishdan beri boʻlgan inflyatsiya. Maoshingiz bilan avvalgidan koʻp yoki kam narsa sotib olishingizni koʻrish uchun.",
    sueldosAnio: "Yiliga maosh toʻlovlari soni",
    sueldosAnioAyuda: "Oylik maosh uchun 12. Har yili qoʻshimcha bir oylik maosh olsangiz, 13 yoki 14.",
    nuevo: "Yangi oylik maosh",
    diferenciaMensual: "Oylik farq",
    diferenciaAnual: "Yillik farq",
    porcentaje: "Oshirish foizi",
    real: "Real oshirish (inflyatsiyadan keyin)",
    realAyuda: "Yangi maoshingiz bilan eskisiga qaraganda qancha koʻp narsa sotib olishingiz mumkin.",
    errorSueldo: "Hozirgi maoshingizni kiriting.",
    errorSinAumento: "Oshirishni foizda yoki summada kiriting.",
    observacionGana: (puntos) => `Inflyatsiyadan oʻzib ketdingiz: maoshingizning xarid qobiliyati avvalgidan ${puntos}% yuqori.`,
    observacionPierde: (puntos) => `Oshirish inflyatsiyaga yetmadi: maoshingizning xarid qobiliyati avvalgidan ${puntos}% past.`,
    observacionIgual: "Oshirish inflyatsiyaga teng: maoshingiz bilan avvalgidek narsa sotib olasiz.",
  }),
};
