import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosUz: TextosUi<UiTarjetaDeCredito> = {
  slug: "kredit-karta-kalkulyatori",
  ui: () => ({
    saldo: "Karta boʻyicha qarz",
    tasa: "Yillik foiz stavkasi (%)",
    tasaAyuda: "Hisob koʻchirmasida yozilgan xaridlar uchun stavka. Unda oylik stavka koʻrsatilgan boʻlsa, uni 12 ga koʻpaytiring.",
    modo: "Qanday toʻlaysiz?",
    modoFijo: "Har oy bir xil summa",
    modoMinimo: "Minimal toʻlov",
    pagoFijo: "Har oylik qatʼiy toʻlov",
    minimoPorcentaje: "Minimal toʻlov (qarzning foizi, %)",
    minimoPorcentajeAyuda: "Kartani bergan tashkilot har oy talab qiladigan ulush. Aniq bilmasangiz, 5% koʻp uchraydigan qiymat.",
    minimoPiso: "Minimal toʻlovning eng kam miqdori",
    meses: "Qarz yopilish muddati (oy)",
    intereses: "Toʻlaydigan foizlaringiz",
    total: "Jami toʻlov",
    primerPago: "Birinchi minimal toʻlov",
    tabla: "Oyma-oy toʻlov rejasi",
    colMes: "Oy",
    colPago: "Toʻlov",
    colInteres: "Foiz",
    colCapital: "Asosiy qarz",
    colSaldo: "Qolgan qarz",
    errorSaldo: "Karta boʻyicha toʻlashingiz kerak boʻlgan qarzni kiriting.",
    errorFaltaPago: "Har oy qancha toʻlashingizni kiriting.",
    errorNoCubre: (interes) => `Bu toʻlov bilan qarz hech kamaymaydi. Faqat birinchi oyning foizi: ${interes}. Toʻlovni oshiring.`,
    errorMuyLargo: "Bu toʻlov bilan qarzni yopish 50 yildan koʻproq vaqt oladi. Toʻlovni oshiring.",
    observacionAnios: (anios, meses) => (meses === "0" ? `Bu ${anios} yil degani.` : `Bu ${anios} yil ${meses} oy degani.`),
    observacionFijo: (pago, meses, ahorro) =>
      `Har oy birinchi minimal toʻlov bilan bir xil summani (${pago}) toʻlasangiz, qarzingiz ertaroq yopiladi. Yopilish muddati, oy: ${meses}. Foizlardan tejaysiz: ${ahorro}.`,
    observacionNoGastar: "Hisob qarzni yopayotgan paytda karta bilan yangi xarid qilmasligingizni nazarda tutadi.",
  }),
};
