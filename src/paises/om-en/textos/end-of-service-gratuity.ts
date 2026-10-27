import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/end-of-service-gratuity";
import { FIN, INICIO, MENSAJES_SERVICIO, SIN_GOCE } from "../comun";

export default definirTextos(calculadora, {
  calculadora: "om-en.end-of-service-gratuity",
  slug: "end-of-service-gratuity",
  campos: {
    basico: { etiqueta: "Last monthly basic wage", ayuda: "The pay agreed in the contract plus the periodic increment, without allowances." },
    inicio: INICIO,
    fin: FIN,
    motivo: {
      etiqueta: "Why the job ended",
      opciones: { normal: "Contract ended, resignation or termination with notice", "article-40": "Dismissal without notice under article 40" },
    },
    sinGoce: SIN_GOCE,
  },
  filas: {
    gratificacion: { etiqueta: "End-of-service gratuity" },
    anios: { etiqueta: "Service counted" },
    dias: { etiqueta: "Days of service counted" },
    porAnio: { etiqueta: "Gratuity per year" },
  },
  mensajes: {
    ...MENSAJES_SERVICIO,
    "أدخل آخر أجر أساسي شهري.": "Enter the last monthly basic wage.",
    "تخص المكافأة العامل غير المنتفع بقانون الحماية الاجتماعية، أي العامل غير العماني في القطاع الخاص.":
      "The gratuity is for workers not covered by the Social Protection Law, that is, non-Omani workers in the private sector.",
    "المادة 40 تجيز لصاحب العمل الفصل دون إخطار ودون مكافأة نهاية الخدمة في الحالات التي تعددها، مثل انتحال شخصية غير صحيحة أو التزوير للحصول على العمل.":
      "Article 40 lets the employer dismiss without notice and without the gratuity in the cases it lists, such as using a false identity or forgery to get the job.",
  },
});
