import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGosi, CAMPO_NACIONALIDAD, CAMPO_REGIMEN, REQUIERE_GOSI } from "../lib/gosi";

export default definirCalculadora({
  id: "sa.gosi-calculator",
  mercado: "sa",
  concepto: "aportes-seguridad-social",
  slug: "gosi-calculator",
  estado: "publicado",
  requiere: REQUIERE_GOSI,
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الراتب الأساسي الشهري", min: 0, porDefecto: 10000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "بدل السكن الشهري", ayuda: "النقدي المتفق عليه في العقد. اتركه صفرًا إذا لم يكن لك بدل سكن.", min: 0, porDefecto: 2500 },
    CAMPO_NACIONALIDAD,
    CAMPO_REGIMEN,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الراتب الأساسي الشهري.", "basico");
    const saudi = entrada.nacionalidad === "saudi";
    const a = aportesGosi(entrada.basico, entrada.vivienda, saudi, entrada.regimen, v);
    const observaciones: string[] = [];
    if (a.topeAplicado) observaciones.push("تجاوز الأجر الحد الأعلى الخاضع للاشتراك، فحُسبت النسب على الحد الأعلى فقط.");
    if (!saudi) observaciones.push("العامل غير السعودي مشمول بفرع الأخطار المهنية فقط، ويتحمل صاحب العمل اشتراكه كاملًا. لا يُحسم من راتبه شيء.");
    return {
      empleado: redondear(a.empleado),
      empleador: redondear(a.empleador),
      total: redondear(a.empleado + a.empleador),
      base: redondear(a.base),
      pensionEmpleado: redondear(a.pensionEmpleado),
      pensionEmpleador: redondear(a.pensionEmpleador),
      sanedEmpleado: redondear(a.sanedEmpleado),
      sanedEmpleador: redondear(a.sanedEmpleador),
      riesgos: redondear(a.riesgos),
      tasaPension: a.tasaPension,
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "يُحسم من راتبك شهريًا", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "يدفعه صاحب العمل شهريًا", formato: "moneda" },
    { clave: "total", etiqueta: "إجمالي الاشتراك الشهري", formato: "moneda" },
    { clave: "base", etiqueta: "الأجر الخاضع للاشتراك", formato: "moneda" },
    { clave: "tasaPension", etiqueta: "نسبتك في فرع المعاشات", formato: "porcentaje", decimales: 2, ocultarSiCero: true },
    { clave: "pensionEmpleado", etiqueta: "فرع المعاشات (حصتك)", formato: "moneda", ocultarSiCero: true },
    { clave: "pensionEmpleador", etiqueta: "فرع المعاشات (حصة صاحب العمل)", formato: "moneda", ocultarSiCero: true },
    { clave: "sanedEmpleado", etiqueta: "ساند (حصتك)", formato: "moneda", ocultarSiCero: true },
    { clave: "sanedEmpleador", etiqueta: "ساند (حصة صاحب العمل)", formato: "moneda", ocultarSiCero: true },
    { clave: "riesgos", etiqueta: "الأخطار المهنية (على صاحب العمل)", formato: "moneda" },
  ],
});
