import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

// Familia de embarazo: se le habla en femenino a la persona gestante (ADR 0002, D10).
export const textosAr: TextosUi<UiOvulacion> = {
  slug: "ovulation",
  ui: () => ({
    fum: "أول يوم من آخر دورة شهرية",
    fumAyuda: "أول يوم من نزول الدم، لا آخر يوم.",
    ciclo: "طول الدورة (بالأيام)",
    cicloAyuda: "من أول يوم في دورة إلى اليوم السابق للدورة التالية. إذا كان يتغير، فأدخلي المتوسط.",
    ovulacion: "موعد الإباضة المتوقع",
    fertilDesde: "أيام الخصوبة من",
    fertilHasta: "أيام الخصوبة حتى",
    proxima: "الدورة التالية",
    tabla: "الدورات القادمة",
    colRegla: "الدورة",
    colDesde: "الخصوبة من",
    colHasta: "الخصوبة حتى",
    colOvulacion: "الإباضة",
    errorCiclo: "يجب أن يكون طول الدورة بين 21 و45 يومًا.",
    aviso: "هذا تقدير للدورات المنتظمة. وهو ليس وسيلة لمنع الحمل، ولا يغني عن استشارة طبيبتك أو طبيبك.",
  }),
};
