import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/maternity-leave-calculator";
import { DIAS_MES } from "../comun";

const PATERNIDAD = /^يستحق الأب إجازة أبوة بأجر شامل لمدة (\d+) أيام، بشرط أن يولد الطفل حيًا وألا تتجاوز الإجازة اليوم الثامن والتسعين من عمر الطفل\.$/;

export default definirTextos(calculadora, {
  calculadora: "om-en.maternity-leave-calculator",
  slug: "maternity-leave-calculator",
  campos: {
    parto: { etiqueta: "Birth date (expected or actual)" },
    antes: { etiqueta: "Leave days before the birth", ayuda: "On the advice of the medical authority, and within what the law allows." },
    salario: { etiqueta: "Total monthly wage" },
    diasMes: DIAS_MES,
  },
  filas: {
    fin: { etiqueta: "Last day of maternity leave" },
    inicio: { etiqueta: "First day of leave" },
    dias: { etiqueta: "Length of maternity leave" },
    pago: { etiqueta: "Total wage for the leave" },
    limitePaternidad: { etiqueta: "Last day for paternity leave" },
  },
  mensajes: {
    "أدخل الأجر الشامل الشهري.": "Enter the total monthly wage.",
    "الإجازة قبل الولادة لا تتجاوز الحد في القانون.": "Leave before the birth cannot go beyond the limit in the law.",
    "للعاملة العمانية يُصرف بدل إجازة الأمومة من فرع تأمين إجازات الأمومة في صندوق الحماية الاجتماعية، ولا يجوز لجهة العمل إلزامها بمباشرة العمل خلال الإجازة.":
      "Omani workers get the maternity leave allowance from the maternity insurance branch of the Social Protection Fund, and the employer cannot make them work during the leave.",
  },
  traducir: (t) => {
    const m = PATERNIDAD.exec(t);
    return m ? `The father gets ${m[1]} days of paternity leave on full pay, as long as the child is born alive and the leave ends by the child's 98th day.` : undefined;
  },
});
