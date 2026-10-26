import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosUz: TextosUi<UiCostoDeUnAuto> = {
  slug: "avtomobil-xarajatlari-kalkulyatori",
  ui: () => ({
    precio: "Avtomobil qiymati",
    precioAyuda: "Toʻlagan narxingiz yoki avtomobil anchadan beri sizda boʻlsa, uning bugungi bozor qiymati.",
    depreciacion: "Yillik qiymat pasayishi (%)",
    depreciacionAyuda: "Yangi avtomobil birinchi yili qiymatining 15 foizdan 25 foizgacha qismini yoʻqotadi. Ishlatilgan avtomobil kamroq yoʻqotadi.",
    cuota: "Oylik avtokredit toʻlovi (ixtiyoriy)",
    cuotaAyuda: "Faqat har oy hisobingizdan qancha pul chiqishini koʻrsatish uchun. Haqiqiy xarajatga qoʻshilmaydi.",
    seguro: "Oylik sugʻurta",
    distanciaKm: "Oylik masofa (km)",
    distanciaMi: "Oylik masofa (mil)",
    consumoL100: "Yoqilgʻi sarfi (har 100 km uchun litr)",
    consumoMpg: "Yoqilgʻi tejamkorligi (bir gallon uchun mil)",
    precioLitro: "Bir litr yoqilgʻi narxi",
    precioGalon: "Bir gallon yoqilgʻi narxi",
    mantenimiento: "Oylik texnik xizmat",
    mantenimientoAyuda: "Texnik koʻrik, shinalar, taʼmirlash va yuvish; oylik oʻrtacha hisobda.",
    estacionamiento: "Oylik avtoturargoh (ixtiyoriy)",
    otros: "Oylik soliq, yoʻl haqi va boshqa xarajatlar (ixtiyoriy)",
    otrosAyuda: "Roʻyxatdan oʻtkazish, texnik koʻrik, pullik yoʻllar va jarimalar; oylik oʻrtacha hisobda.",
    costoMensual: "Oylik haqiqiy xarajat",
    costoAnual: "Yillik haqiqiy xarajat",
    porKm: "Bir kilometr xarajati",
    porMilla: "Bir mil xarajati",
    combustible: "Oylik yoqilgʻi",
    depreciacionMensual: "Oylik qiymat pasayishi",
    gastoBolsillo: "Har oy hisobingizdan chiqadigan summa",
    errorConsumo: "Yoqilgʻi xarajatini hisoblash uchun avtomobilingizning yoqilgʻi sarfini kiriting.",
    observacionCuota:
      "Kredit toʻlovi haqiqiy xarajatga kiritilmaydi, chunki uning bir qismi avtomobilning oʻzi uchun toʻlanadi va bu allaqachon qiymat pasayishi sifatida hisoblangan. Kredit foizi esa bunga qoʻshimcha xarajat.",
  }),
};
