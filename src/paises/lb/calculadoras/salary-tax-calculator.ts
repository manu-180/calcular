import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tasaMarginal, tenzilFamiliar } from "../lib/laboral";

// Art. 56 y 58 de la ley de impuesto a la renta: escala marginal anual sobre los ingresos netos después
// del tanzil familiar del art. 31. Lo pagado en moneda extranjera se convierte por decisión oficial (art.
// 17 del presupuesto 2025): acá se calcula en libras y lo dice la observación.
export default definirCalculadora({
  id: "lb.salary-tax-calculator",
  mercado: "lb",
  concepto: "impuesto-renta",
  slug: "salary-tax-calculator",
  estado: "publicado",
  requiere: {
    "lb.salary-tax": "escala",
    "lb.family-deduction": "mapa",
    "lb.deduction-children": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "الراتب الخاضع للضريبة بالليرة", min: 0, porDefecto: 100000000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "المبلغ عن",
      opciones: [
        { valor: "mensual", etiqueta: "الشهر" },
        { valor: "anual", etiqueta: "السنة" },
      ],
      porDefecto: "mensual",
    },
    { id: "casado", tipo: "si-no", etiqueta: "متزوج", porDefecto: false },
    { id: "conyugeTrabaja", tipo: "si-no", etiqueta: "الزوج أو الزوجة يعمل أيضًا", visibleSi: { casado: [true] }, porDefecto: false },
    { id: "hijos", tipo: "entero", etiqueta: "عدد الأولاد على عاتقك", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("أدخل الراتب.", "ingreso");
    const anual = entrada.periodo === "mensual" ? entrada.ingreso * 12 : entrada.ingreso;
    const tenzil = tenzilFamiliar(v["lb.family-deduction"], v["lb.deduction-children"], entrada.casado, entrada.conyugeTrabaja === true, entrada.hijos);
    const imponible = Math.max(anual - tenzil, 0);
    const impuesto = aplicarEscalaMarginal(v["lb.salary-tax"], imponible);
    return {
      impuestoAnual: redondear(impuesto),
      impuestoMensual: redondear(impuesto / 12),
      tenzil: redondear(tenzil),
      imponible: redondear(imponible),
      marginal: tasaMarginal(v["lb.salary-tax"], imponible),
      efectiva: anual > 0 ? (impuesto / anual) * 100 : 0,
      observaciones: [
        "يُحسم من الراتب قبل الحساب ما يُدفع للتقاعد وبدلات النقل والتمثيل وفق المادة 50، فأدخل المبلغ بعدها. التعويضات العائلية وتعويض الصرف معفيان.",
        "إذا كان راتبك بالدولار فأدخل ما يعادله بالليرة وفق السعر الرسمي الذي يعتمده مصرف لبنان. لا نعرض هذا السعر هنا لأننا لم نقرأه في المصرف.",
      ],
    };
  },
  resultado: [
    { clave: "impuestoMensual", etiqueta: "الضريبة في الشهر", formato: "moneda", destacada: true },
    { clave: "impuestoAnual", etiqueta: "الضريبة في السنة", formato: "moneda" },
    { clave: "tenzil", etiqueta: "التنزيل العائلي في السنة", formato: "moneda" },
    { clave: "imponible", etiqueta: "الوعاء الخاضع للضريبة في السنة", formato: "moneda" },
    { clave: "marginal", etiqueta: "نسبة آخر شطر", formato: "porcentaje" },
    { clave: "efectiva", etiqueta: "النسبة الفعلية من الراتب", formato: "porcentaje", decimales: 2 },
  ],
});
