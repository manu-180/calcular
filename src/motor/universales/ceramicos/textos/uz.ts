import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosUz: TextosUi<UiCeramicos> = {
  slug: "kafel-kalkulyatori",
  ui: () => ({
    superficie: (u) => `Kafel yotqiziladigan maydon (${u})`,
    largo: (u) => `Kafel uzunligi (${u})`,
    ancho: (u) => `Kafel eni (${u})`,
    desperdicio: "Chiqindi uchun zaxira (%)",
    desperdicioAyuda: "Kesish va sinish uchun. Toʻgʻri terishda 10%, diagonal terishda 15% oling.",
    porCaja: "Bir qutidagi kafellar soni",
    porCajaAyuda: "Ixtiyoriy. Necha quti olish kerakligini koʻrish uchun kiriting.",
    piezas: "Kerakli kafellar soni",
    cajas: "Sotib olinadigan qutilar",
    conDesperdicio: (u) => `Zaxira bilan maydon (${u})`,
    cubre: (u) => `Qutilar qoplaydigan maydon (${u})`,
    errorSuperficie: "Maydon noldan katta boʻlishi kerak.",
    errorPieza: "Kafel oʻlchamlari noldan katta boʻlishi kerak.",
  }),
};
