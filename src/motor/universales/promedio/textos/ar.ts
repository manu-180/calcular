import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosAr: TextosUi<UiPromedio> = textosArabes({
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `الدرجة ${n}`,
    notaAyuda: "أدخل كل درجة أو قيمة مع وزنها، واترك الصفوف غير المستخدمة فارغة.",
    peso: (n) => `الوزن ${n}`,
    pesoAyuda: "يمكن أن يكون نسبة مئوية أو ساعات معتمدة أو عدد المرات التي تُحتسب فيها. وبلا أوزان تتساوى كل القيم.",
    ponderado: "المتوسط المرجح",
    simple: "المتوسط البسيط",
    cantidad: "عدد القيم",
    sumaPesos: "مجموع الأوزان",
    errorSinNotas: "أدخل قيمة واحدة على الأقل.",
    errorFaltaPeso: "هذه القيمة بلا وزن. إذا استخدمت الأوزان فأدخلها لكل القيم.",
    errorFaltaNota: "هذا الوزن بلا قيمة. أدخل القيمة أو احذف الوزن.",
    errorPesosCero: "مجموع الأوزان صفر، ويجب أن يكون وزن واحد على الأقل أكبر من الصفر.",
    sinPesos: "بلا أوزان يساوي المتوسط المرجح المتوسط البسيط.",
  }),
});
