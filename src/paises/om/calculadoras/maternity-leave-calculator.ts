import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIAS_MES, sumarDias } from "../lib/laboral";

export default definirCalculadora({
  id: "om.maternity-leave-calculator",
  mercado: "om",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "om.family-leave": "mapa",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "تاريخ الولادة (المتوقع أو الفعلي)", porDefecto: "hoy" },
    { id: "antes", tipo: "entero", etiqueta: "أيام الإجازة قبل الولادة", ayuda: "بتوصية من الجهة الطبية المختصة، وفي حدود ما يجيزه القانون.", min: 0, max: 14, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشامل الشهري", min: 0, porDefecto: 600 },
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشامل الشهري.", "salario");
    const tabla = v["om.family-leave"];
    const duracion = enMapa(tabla, "maternity");
    if (entrada.antes > enMapa(tabla, "prenatal")) throw new ErrorEntrada("الإجازة قبل الولادة لا تتجاوز الحد في القانون.", "antes");
    const inicio = sumarDias(entrada.parto, -entrada.antes);
    return {
      fin: sumarDias(inicio, duracion - 1),
      inicio,
      dias: duracion,
      limitePaternidad: sumarDias(entrada.parto, duracion - 1),
      pago: redondear((entrada.salario / entrada.diasMes) * duracion),
      observaciones: [
        "للعاملة العمانية يُصرف بدل إجازة الأمومة من فرع تأمين إجازات الأمومة في صندوق الحماية الاجتماعية، ولا يجوز لجهة العمل إلزامها بمباشرة العمل خلال الإجازة.",
        `يستحق الأب إجازة أبوة بأجر شامل لمدة ${enMapa(tabla, "paternity")} أيام، بشرط أن يولد الطفل حيًا وألا تتجاوز الإجازة اليوم الثامن والتسعين من عمر الطفل.`,
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "آخر يوم في إجازة الوضع", formato: "fecha", destacada: true },
    { clave: "inicio", etiqueta: "أول يوم في الإجازة", formato: "fecha" },
    { clave: "dias", etiqueta: "مدة إجازة الوضع", formato: "dias" },
    { clave: "pago", etiqueta: "الأجر الشامل عن مدة الإجازة", formato: "moneda" },
    { clave: "limitePaternidad", etiqueta: "آخر يوم لإجازة الأبوة", formato: "fecha" },
  ],
});
