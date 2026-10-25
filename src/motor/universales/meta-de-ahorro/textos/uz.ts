import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosUz: TextosUi<UiMetaDeAhorro> = {
  slug: "jamgarma-kalkulyatori",
  ui: () => ({
    meta: "Qancha jamgʻarmoqchisiz?",
    actual: "Hozir jamgʻargan mablagʻingiz (ixtiyoriy)",
    meses: "Maqsadga yetish muddati (oy)",
    rendimiento: "Jamgʻarmaning yillik daromadi (%, ixtiyoriy)",
    rendimientoAyuda: "Pul foiz toʻlaydigan hisob raqamida, omonatda yoki investitsiyada tursa. Hech qanday daromad keltirmasa, boʻsh qoldiring.",
    aporteMensual: "Har oy jamgʻarishingiz kerak",
    aporteSemanal: "Bu haftasiga",
    totalAportado: "Jami qoʻyadigan mablagʻingiz",
    intereses: "Olingan foizlar",
    errorMeta: "Qancha jamgʻarmoqchi ekaningizni kiriting.",
    yaLlegas: "Hozirgi mablagʻingiz qoʻshimcha qoʻymasdan ham shu muddatda maqsadga yetadi.",
  }),
};
