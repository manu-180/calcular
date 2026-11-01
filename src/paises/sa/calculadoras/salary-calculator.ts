import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGosi, CAMPO_NACIONALIDAD, CAMPO_REGIMEN, REQUIERE_GOSI } from "../lib/gosi";

export default definirCalculadora({
  id: "sa.salary-calculator",
  mercado: "sa",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_GOSI,
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الراتب الأساسي الشهري", min: 0, porDefecto: 10000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "بدل السكن الشهري", min: 0, porDefecto: 2500 },
    { id: "otros", tipo: "moneda", etiqueta: "بدلات أخرى شهرية", ayuda: "مثل بدل النقل أو بدل الهاتف. لا تخضع للتأمينات الاجتماعية.", min: 0, porDefecto: 1000 },
    CAMPO_NACIONALIDAD,
    CAMPO_REGIMEN,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الراتب الأساسي الشهري.", "basico");
    const saudi = entrada.nacionalidad === "saudi";
    const a = aportesGosi(entrada.basico, entrada.vivienda, saudi, entrada.regimen, v);
    const bruto = entrada.basico + entrada.vivienda + entrada.otros;
    const descuento = redondear(a.empleado);
    const neto = redondear(bruto - descuento);
    const observaciones = ["الحسم المحسوب هنا هو حصتك في التأمينات الاجتماعية. أقساط القروض والسلف وأي حسومات أخرى في عقدك لا تدخل في الحساب."];
    if (!saudi) observaciones.push("العامل غير السعودي لا يُحسم من راتبه اشتراك. اشتراك الأخطار المهنية يدفعه صاحب العمل.");
    if (a.topeAplicado) observaciones.push("حُسبت التأمينات على الحد الأعلى للأجر الخاضع للاشتراك.");
    return {
      neto,
      bruto: redondear(bruto),
      descuento,
      pension: redondear(a.pensionEmpleado),
      saned: redondear(a.sanedEmpleado),
      anual: redondear(neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "صافي الراتب الشهري", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "إجمالي الراتب", formato: "moneda" },
    { clave: "descuento", etiqueta: "حسم التأمينات الاجتماعية", formato: "moneda" },
    { clave: "pension", etiqueta: "منه فرع المعاشات", formato: "moneda", ocultarSiCero: true },
    { clave: "saned", etiqueta: "منه ساند", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "صافي الراتب في السنة", formato: "moneda" },
  ],
  mundo: {
    bruto: "basico",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { vivienda: 0, otros: 0, nacionalidad: "saudi", regimen: "legacy" },
  },
});
