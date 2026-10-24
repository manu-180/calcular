import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosAr: TextosUi<UiConsumoElectrico> = textosArabes({
  slug: "electricity-cost",
  ui: () => ({
    potencia: "قدرة الجهاز (واط)",
    potenciaAyuda: "تجدها على ملصق الجهاز أو في دليله بالواط (W). وإذا كانت بالكيلوواط (kW) فاضربها في 1000.",
    cantidad: "عدد الأجهزة المتماثلة",
    horas: "ساعات الاستخدام يوميًا",
    dias: "أيام الاستخدام في الشهر",
    precio: "سعر الكيلوواط ساعة",
    precioAyuda: "تجده في فاتورة الكهرباء: سعر الكيلوواط ساعة، مع الضرائب إذا أردت التكلفة الكاملة.",
    kwhDia: "الاستهلاك اليومي (كيلوواط ساعة)",
    kwhMes: "الاستهلاك الشهري (كيلوواط ساعة)",
    kwhAnio: "الاستهلاك السنوي (كيلوواط ساعة)",
    costoDia: "التكلفة اليومية",
    costoMes: "التكلفة الشهرية",
    costoAnio: "التكلفة السنوية",
    errorHoras: "اليوم 24 ساعة، لذلك يجب أن تكون ساعات الاستخدام بين 0 و24.",
  }),
});
