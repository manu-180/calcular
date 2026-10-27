import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "om.annual-leave-calculator",
  mercado: "om",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "om.annual-leave": "numero",
  },
  campos: [
    {
      id: "momento",
      tipo: "opcion",
      etiqueta: "متى يُدفع بدل الإجازة؟",
      opciones: [
        { valor: "end", etiqueta: "عند انتهاء الخدمة" },
        { valor: "during", etiqueta: "أثناء الخدمة باتفاق كتابي مع العامل" },
      ],
      porDefecto: "end",
    },
    { id: "basico", tipo: "moneda", etiqueta: "الأجر الأساسي الشهري", min: 0, porDefecto: 400 },
    { id: "total", tipo: "moneda", etiqueta: "الأجر الشامل الشهري", ayuda: "الأساسي مع جميع العلاوات والبدلات.", min: 0, porDefecto: 550, visibleSi: { momento: ["end"] } },
    { id: "saldo", tipo: "numero", etiqueta: "رصيد الإجازة السنوية غير المستخدم بالأيام", min: 0, max: 400, porDefecto: 15 },
    CAMPO_DIAS_MES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الأجر الأساسي الشهري.", "basico");
    const fin = entrada.momento === "end";
    const total = entrada.total ?? 0;
    if (fin && total < entrada.basico) throw new ErrorEntrada("الأجر الشامل لا يقل عن الأجر الأساسي.", "total");
    const base = fin ? total : entrada.basico;
    const diario = base / entrada.diasMes;
    const observaciones: string[] = [];
    if (entrada.saldo > v["om.annual-leave"]) observaciones.push("يحتفظ العامل برصيد لا يزيد على 30 يومًا من الإجازة غير المستخدمة، ما لم يكن عدم استخدامها لمصلحة العمل.");
    if (!fin) observaciones.push("أثناء الخدمة يُدفع الأجر الأساسي عن أيام الإجازة إذا وافق العامل كتابة، ولا يجوز له التنازل عن إجازته.");
    return {
      pago: redondear(diario * entrada.saldo),
      diario: redondear(diario),
      anual: v["om.annual-leave"],
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "بدل رصيد الإجازة", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "أجر اليوم المستخدم", formato: "moneda" },
    { clave: "anual", etiqueta: "الإجازة السنوية في القانون", formato: "dias" },
  ],
});
