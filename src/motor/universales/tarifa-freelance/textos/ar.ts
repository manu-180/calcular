import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosAr: TextosUi<UiTarifaFreelance> = textosArabes({
  slug: "freelance-rate",
  ui: () => ({
    ingreso: "الدخل الصافي الذي تريده في السنة",
    ingresoAyuda: "بعد الضرائب والمصروفات، أي راتبك كعامل مستقل.",
    gastos: "مصروفات العمل في السنة",
    gastosAyuda: "الأجهزة والبرامج والإنترنت والدورات والمحاسب والتأمين الصحي والادخار للتقاعد.",
    impuestos: "الضرائب والاشتراكات التقديرية (%)",
    impuestosAyuda: "ما يذهب إلى الضرائب من فواتيرك بعد خصم المصروفات. إذا لم تكن متأكدًا فاسأل محاسبًا، و25% نقطة بداية.",
    diasLibres: "أيام الإجازة في السنة",
    diasLibresAyuda: "الإجازات والعطلات الرسمية والأيام المرضية. لا أحد يدفع لك عنها، لذلك يجب أن تغطيها أسعارك.",
    diasSemana: "أيام العمل في الأسبوع",
    horasSemana: "الساعات القابلة للفوترة في الأسبوع",
    horasSemanaAyuda: "الساعات التي تتقاضى عنها أجرًا فقط. البحث عن العملاء والأعمال الإدارية والتعلم لا تُفوتر، والمعتاد من 20 إلى 30 ساعة من أصل 40.",
    tarifaHora: "سعر الساعة",
    tarifaDia: "سعر اليوم",
    facturacionMensual: "الفواتير اللازمة في الشهر",
    facturacionAnual: "الفواتير اللازمة في السنة",
    horasAnio: "الساعات القابلة للفوترة في السنة",
    errorIngreso: "أدخل الدخل الذي تريد أن تحققه في السنة.",
    errorImpuestos: "يجب أن تكون نسبة الضرائب أقل من 100%.",
    errorDias: "مع هذا العدد من أيام الإجازة لا يبقى أي يوم عمل في السنة.",
    errorHoras: "أدخل عدد الساعات التي يمكنك فوترتها في الأسبوع.",
    observacionFacturables: "إذا طلبت أقل من هذا السعر فستكسب أقل مما خططت له أو ستعمل ساعات أكثر.",
  }),
});
