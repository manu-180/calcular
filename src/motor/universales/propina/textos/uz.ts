import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosUz: TextosUi<UiPropina> = {
  slug: "choychaqa-kalkulyatori",
  ui: () => ({
    cuenta: "Hisob summasi",
    porcentaje: "Choychaqa (%)",
    porcentajeAyuda: "Odat mamlakat va joyga qarab farq qiladi. Oʻzingizga mos foizni tanlang.",
    personas: "Toʻlovchilar soni",
    redondear: "Har bir ulushni yuqoriga yaxlitlash",
    redondearAyuda: "Shunda har kim butun summa toʻlaydi. Ortgan qism choychaqaga qoʻshiladi.",
    propina: "Choychaqa",
    total: "Choychaqa bilan jami",
    porPersona: "Har bir kishi toʻlaydi",
    propinaEfectiva: "Yaxlitlashdan keyingi choychaqa",
    errorPersonas: "Kamida bir kishi toʻlashi kerak.",
    observacionRedondeo: (efectiva) => `Yaxlitlashdan keyin choychaqa hisob summasining ${efectiva} foizini tashkil qiladi.`,
  }),
};
