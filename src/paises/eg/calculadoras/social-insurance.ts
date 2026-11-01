import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aportes, REQUIERE_APORTES } from "../lib/nomina";

export default definirCalculadora({
  id: "eg.social-insurance",
  mercado: "eg",
  concepto: "aportes-seguridad-social",
  slug: "social-insurance",
  estado: "publicado",
  requiere: REQUIERE_APORTES,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجر الاشتراك التأميني الشهري", min: 0, porDefecto: 10000, ayuda: "الأجر المسجل لك في التأمينات. إذا لم تعرفه أدخل إجمالي مرتبك." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل أجر الاشتراك الشهري.", "salario");
    const a = aportes(e.salario, null, v);
    const emp = v["eg.si-employee"];
    const pat = v["eg.si-employer"];
    const parte = (m: Readonly<Record<string, number>>, k: string) => redondear(porcentaje(a.base, enMapa(m, k)));
    const empleado = redondear(a.empleado);
    const empleador = redondear(a.empleador);
    const observaciones: string[] = [];
    if (e.salario < a.base) observaciones.push("أجرك أقل من الحد الأدنى لأجر الاشتراك، فتُحسب التأمينات على الحد الأدنى.");
    if (e.salario > a.base) observaciones.push("أجرك أعلى من الحد الأقصى لأجر الاشتراك، فتُحسب التأمينات على الحد الأقصى.");
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      base: a.base,
      tasaEmpleado: a.tasaEmpleado,
      tasaEmpleador: a.tasaEmpleador,
      empVejez: parte(emp, "old-age"),
      empPremio: parte(emp, "reward"),
      empEnfermedad: parte(emp, "sickness"),
      patVejez: parte(pat, "old-age"),
      patPremio: parte(pat, "reward"),
      patAccidentes: redondear(porcentaje(a.base, enMapa(pat, "injury-care") + enMapa(pat, "injury-cash"))),
      patEnfermedad: parte(pat, "sickness"),
      patDesempleo: parte(pat, "unemployment"),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "حصتك الشهرية (تُخصم من مرتبك)", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "حصة صاحب العمل الشهرية", formato: "moneda" },
    { clave: "total", etiqueta: "إجمالي الاشتراك الشهري", formato: "moneda" },
    { clave: "base", etiqueta: "أجر الاشتراك المستخدم", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "نسبة حصتك", formato: "porcentaje", decimales: 2 },
    { clave: "tasaEmpleador", etiqueta: "نسبة حصة صاحب العمل", formato: "porcentaje", decimales: 2 },
    { clave: "empVejez", etiqueta: "حصتك: الشيخوخة والعجز والوفاة", formato: "moneda" },
    { clave: "empPremio", etiqueta: "حصتك: نظام المكافأة", formato: "moneda" },
    { clave: "empEnfermedad", etiqueta: "حصتك: تأمين المرض", formato: "moneda" },
    { clave: "patVejez", etiqueta: "صاحب العمل: الشيخوخة والعجز والوفاة", formato: "moneda" },
    { clave: "patPremio", etiqueta: "صاحب العمل: نظام المكافأة", formato: "moneda" },
    { clave: "patAccidentes", etiqueta: "صاحب العمل: إصابات العمل", formato: "moneda" },
    { clave: "patEnfermedad", etiqueta: "صاحب العمل: تأمين المرض", formato: "moneda" },
    { clave: "patDesempleo", etiqueta: "صاحب العمل: تأمين البطالة", formato: "moneda" },
  ],
});
