import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "eg.net-salary",
  mercado: "eg",
  concepto: "sueldo-neto",
  slug: "net-salary",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "إجمالي المرتب الشهري", min: 0, porDefecto: 15000, ayuda: "الأجر الشامل قبل أي استقطاع، ومعه البدلات والحوافز الثابتة." },
    {
      id: "asegurable",
      tipo: "moneda",
      etiqueta: "أجر الاشتراك التأميني الشهري",
      min: 0,
      requerido: false,
      ayuda: "اختياري. إذا تركته فارغًا نحسب التأمينات على إجمالي المرتب في حدود الحد الأدنى والأقصى لأجر الاشتراك.",
    },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("أدخل إجمالي مرتبك الشهري.", "bruto");
    const n = nomina(e.bruto, e.asegurable, v);
    const aporte = redondear(n.empleado);
    const impuesto = redondear(n.impuestoMensual);
    const totalDeducido = redondear(aporte + impuesto);
    const neto = redondear(e.bruto - totalDeducido);
    const observaciones: string[] = [];
    if (n.tramosPerdidos > 0) observaciones.push("دخلك السنوي الخاضع للضريبة تجاوز الحد الذي تسقط بعده الشرائح الأولى، فتبدأ الضريبة من أول جنيه بنسبة أعلى كما ينص القانون.");
    if ((e.asegurable ?? e.bruto) > n.base) observaciones.push("التأمينات محسوبة على الحد الأقصى لأجر الاشتراك، لأن أجرك يتجاوزه.");
    return {
      neto,
      aporte,
      impuesto,
      totalDeducido,
      base: redondear(n.base),
      gravableAnual: n.gravableAnual,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "صافي المرتب الشهري", formato: "moneda", destacada: true },
    { clave: "aporte", etiqueta: "حصتك في التأمينات الاجتماعية", formato: "moneda" },
    { clave: "impuesto", etiqueta: "ضريبة كسب العمل الشهرية", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "إجمالي الاستقطاعات", formato: "moneda" },
    { clave: "base", etiqueta: "أجر الاشتراك المستخدم", formato: "moneda" },
    { clave: "gravableAnual", etiqueta: "صافي الدخل السنوي الخاضع للضريبة", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "صافي المرتب في 12 شهرًا", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "نسبة الصافي من الإجمالي", formato: "porcentaje", decimales: 1 },
  ],
});
