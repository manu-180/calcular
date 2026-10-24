import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosUz: TextosUi<UiVariacion> = {
  slug: "foiz-ozgarishi-kalkulyatori",
  ui: () => ({
    inicial: "Boshlangʻich qiymat",
    final: "Yakuniy qiymat",
    variacion: "Foiz oʻzgarishi",
    diferencia: "Farq",
    vuelta: "Boshlangʻich qiymatga qaytish uchun",
    vueltaAyuda: "Yakuniy qiymat yana boshlangʻich qiymatga qaytishi uchun necha foiz oʻzgarishi kerakligi.",
    errorInicialCero: "Boshlangʻich qiymat 0 boʻla olmaydi: noldan foiz oʻzgarishini hisoblab boʻlmaydi.",
    subio: (p) => `Qiymat ${p}% oshdi.`,
    bajo: (p) => `Qiymat ${p}% kamaydi.`,
    igual: "Oʻzgarish yoʻq: ikkala qiymat bir xil.",
  }),
};
