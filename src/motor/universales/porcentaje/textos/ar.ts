import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosAr: TextosUi<UiPorcentaje> = textosArabes({
  slug: "percentage",
  ui: () => ({
    modo: "ماذا تريد أن تحسب؟",
    modoParte: "كم يساوي X% من Y؟",
    modoProporcion: "X يمثل كم في المئة من Y؟",
    modoAumento: "Y مضافًا إليه X%",
    modoRebaja: "Y مطروحًا منه X%",
    x: "العدد X",
    xAyuda: "هو النسبة المئوية. وإذا اخترت «X يمثل كم في المئة من Y؟» فهو الجزء.",
    y: "العدد Y",
    resultado: "النتيجة",
    porcentaje: "النسبة المئوية",
    diferencia: "المقدار المضاف أو المطروح",
    errorYCero: "لا يمكن أن يكون Y صفرًا، فلا توجد نسبة مئوية من الصفر.",
    fraseParte: (x, y, r) => `${x}% من ${y} يساوي ${r}.`,
    fraseProporcion: (x, y, p) => `${x} يمثل ${p}% من ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} مضافًا إليه ${x}% يساوي ${r}، أي بزيادة ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} مطروحًا منه ${x}% يساوي ${r}، أي بنقص ${d}.`,
  }),
});
