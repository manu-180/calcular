import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosUz: TextosUi<UiPorcentaje> = {
  slug: "foiz-hisoblash",
  ui: () => ({
    modo: "Nimani hisoblamoqchisiz?",
    modoParte: "Y sonining X foizi qancha?",
    modoProporcion: "X soni Y sonining necha foizi?",
    modoAumento: "Y soniga X foiz qoʻshish",
    modoRebaja: "Y sonidan X foiz ayirish",
    x: "X soni",
    xAyuda: "Foiz qiymati. «X soni Y sonining necha foizi?» tanlansa, bu qismning oʻzi boʻladi.",
    y: "Y soni",
    resultado: "Natija",
    porcentaje: "Foiz",
    diferencia: "Qoʻshilgan yoki ayirilgan miqdor",
    errorYCero: "Y soni 0 boʻla olmaydi: noldan foiz hisoblab boʻlmaydi.",
    fraseParte: (x, y, r) => `${y} sonining ${x} foizi: ${r}.`,
    fraseProporcion: (x, y, p) => `${x} soni ${y} sonining ${p} foizini tashkil qiladi.`,
    fraseAumento: (x, y, r, d) => `${y} soniga ${x} foiz qoʻshilsa, natija: ${r}. Qoʻshilgan miqdor: ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} sonidan ${x} foiz ayirilsa, natija: ${r}. Ayirilgan miqdor: ${d}.`,
  }),
};
