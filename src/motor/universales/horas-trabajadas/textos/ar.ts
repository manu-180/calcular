import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosAr: TextosUi<UiHorasTrabajadas> = textosArabes({
  slug: "time-card",
  ui: () => ({
    dias: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    entrada: (dia) => `${dia}: وقت البدء`,
    salida: (dia) => `${dia}: وقت الانتهاء`,
    horarioAyuda: "اترك الأيام التي لم تعمل فيها فارغة. إذا انتهيت بعد منتصف الليل فتُحسب ضمن المناوبة نفسها.",
    pausa: "الاستراحة غير المدفوعة في اليوم (بالدقائق)",
    pausaAyuda: "وقت الغداء أو الراحة الذي لا يُدفع عنه أجر، ويُخصم من كل يوم عملت فيه.",
    pagoHora: "الأجر بالساعة",
    umbral: "ساعات العمل العادية في الأسبوع (اختياري)",
    umbralAyuda: "الساعات التي تزيد على هذا العدد تُدفع بأجر العمل الإضافي. اتركه فارغًا إذا لم يكن هناك عمل إضافي.",
    recargo: "علاوة العمل الإضافي (%)",
    recargoAyuda: "كم تزيد أجرة كل ساعة إضافية. 50% تعني أجر الساعة ونصفه.",
    horasTotales: "ساعات العمل",
    horasReloj: "بالساعات والدقائق",
    horasNormales: "الساعات العادية",
    horasExtra: "الساعات الإضافية",
    pagoNormal: "أجر الساعات العادية",
    pagoExtra: "أجر العمل الإضافي",
    pagoTotal: "إجمالي الأجر عن الأسبوع",
    tabla: "يومًا بيوم",
    colDia: "اليوم",
    colEntrada: "البدء",
    colSalida: "الانتهاء",
    colHoras: "الساعات",
    errorFaltaSalida: (dia) => `ينقص وقت الانتهاء في يوم ${dia}.`,
    errorFaltaEntrada: (dia) => `ينقص وقت البدء في يوم ${dia}.`,
    errorIguales: (dia) => `وقت البدء ووقت الانتهاء متساويان في يوم ${dia}.`,
    errorPausa: (dia) => `الاستراحة تساوي مدة العمل في يوم ${dia} أو تزيد عليها.`,
    errorSinDias: "أدخل وقت البدء ووقت الانتهاء ليوم واحد على الأقل.",
    observacionNoche: "بعض المناوبات تنتهي في اليوم التالي، وتُحسب كاملة في اليوم الذي بدأت فيه.",
    observacionGenerico:
      "هذا حساب عام. الحد الأقصى لساعات العمل وقواعد العمل الإضافي وأجر العمل الليلي أو في أيام العطل تحددها القوانين وعقد عملك.",
  }),
});
