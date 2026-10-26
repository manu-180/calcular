import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesSsc, REQUIERE_SSC } from "../lib/ssc";

export default definirCalculadora({
  id: "jo.social-security-calculator",
  mercado: "jo",
  concepto: "aportes-seguridad-social",
  slug: "social-security-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_SSC, "jo.minimum-wage": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري الخاضع للضمان", ayuda: "الأجر الذي تصرّح به المنشأة للمؤسسة العامة للضمان الاجتماعي.", min: 0, porDefecto: 600 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const a = aportesSsc(entrada.salario, v);
    const observaciones: string[] = [];
    if (a.topeAplicado) observaciones.push("الأجر أعلى من الحد الأعلى للأجر الخاضع للاقتطاع، فحُسبت الاشتراكات على الحد الأعلى.");
    if (entrada.salario < v["jo.minimum-wage"]) observaciones.push("القانون لا يقبل أن يقل الأجر الذي تُحسب عليه الاشتراكات عن الحد الأدنى للأجور، فتحقق من الأجر المصرّح به.");
    const empleado = redondear(a.empleado);
    const empleador = redondear(a.empleador);
    return {
      empleado,
      empleador,
      total: redondear(empleado + empleador),
      base: redondear(a.base),
      vejezEmpleado: redondear(a.vejezEmpleado),
      desempleoEmpleado: redondear(a.desempleoEmpleado),
      vejezEmpleador: redondear(a.vejezEmpleador),
      desempleoEmpleador: redondear(a.desempleoEmpleador),
      lesiones: redondear(a.lesiones),
      maternidad: redondear(a.maternidad),
      tasaEmpleado: a.tasaEmpleado,
      tasaEmpleador: a.tasaEmpleador,
      observaciones,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "اشتراك العامل (يُقتطع من راتبه)", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "اشتراك المنشأة", formato: "moneda" },
    { clave: "total", etiqueta: "مجموع الاشتراك الشهري", formato: "moneda" },
    { clave: "base", etiqueta: "الأجر الذي حُسبت عليه الاشتراكات", formato: "moneda" },
    { clave: "vejezEmpleado", etiqueta: "العامل: تأمين الشيخوخة والعجز والوفاة", formato: "moneda" },
    { clave: "desempleoEmpleado", etiqueta: "العامل: تأمين التعطل عن العمل", formato: "moneda" },
    { clave: "vejezEmpleador", etiqueta: "المنشأة: تأمين الشيخوخة والعجز والوفاة", formato: "moneda" },
    { clave: "desempleoEmpleador", etiqueta: "المنشأة: تأمين التعطل عن العمل", formato: "moneda" },
    { clave: "lesiones", etiqueta: "المنشأة: تأمين إصابات العمل", formato: "moneda" },
    { clave: "maternidad", etiqueta: "المنشأة: تأمين الأمومة", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "نسبة العامل", formato: "porcentaje", decimales: 2 },
    { clave: "tasaEmpleador", etiqueta: "نسبة المنشأة", formato: "porcentaje", decimales: 2 },
  ],
});
