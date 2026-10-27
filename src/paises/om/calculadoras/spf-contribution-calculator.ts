import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesSpf, CAMPO_NACIONALIDAD, REQUIERE_SPF } from "../lib/spf";

export default definirCalculadora({
  id: "om.spf-contribution-calculator",
  mercado: "om",
  concepto: "aportes-seguridad-social",
  slug: "spf-contribution-calculator",
  estado: "publicado",
  requiere: REQUIERE_SPF,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري الشامل", ayuda: "الأجر الأساسي مع جميع العلاوات والبدلات.", min: 0, porDefecto: 800 },
    CAMPO_NACIONALIDAD,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري الشامل.", "salario");
    const omani = entrada.nacionalidad === "omani";
    const a = aportesSpf(entrada.salario, omani, v);
    const observaciones: string[] = [];
    if (!omani) observaciones.push("لا تُسدد اليوم اشتراكات عن العامل غير العماني. يسري عليه فرع إصابات العمل بعد خمسة أعوام من صدور القانون (يوليو 2028)، وفرعا الأمومة والإجازات المرضية للفئات التي يحددها مجلس إدارة الصندوق.");
    if (a.topeAplicado) observaciones.push("فرعا كبار السن وإصابات العمل محسوبان على سقف أجر الاشتراك. الفروع الأخرى على الأجر كله.");
    return {
      total: redondear(a.empleado + a.empleador),
      empleado: redondear(a.empleado),
      empleador: redondear(a.empleador),
      vejezEmpleado: redondear(a.vejezEmpleado),
      seguridadEmpleado: redondear(a.seguridadEmpleado),
      vejezEmpleador: redondear(a.vejezEmpleador),
      lesiones: redondear(a.lesiones),
      seguridadEmpleador: redondear(a.seguridadEmpleador),
      maternidad: redondear(a.maternidad),
      enfermedad: redondear(a.enfermedad),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع الاشتراكات الشهرية", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "حصة المؤمن عليه", formato: "moneda" },
    { clave: "empleador", etiqueta: "حصة جهة العمل", formato: "moneda" },
    { clave: "vejezEmpleado", etiqueta: "المؤمن عليه: كبار السن والعجز والوفاة", formato: "moneda", ocultarSiCero: true },
    { clave: "seguridadEmpleado", etiqueta: "المؤمن عليه: الأمان الوظيفي", formato: "moneda", ocultarSiCero: true },
    { clave: "vejezEmpleador", etiqueta: "جهة العمل: كبار السن والعجز والوفاة", formato: "moneda", ocultarSiCero: true },
    { clave: "lesiones", etiqueta: "جهة العمل: إصابات العمل والأمراض المهنية", formato: "moneda", ocultarSiCero: true },
    { clave: "seguridadEmpleador", etiqueta: "جهة العمل: الأمان الوظيفي", formato: "moneda", ocultarSiCero: true },
    { clave: "maternidad", etiqueta: "جهة العمل: إجازات الأمومة", formato: "moneda", ocultarSiCero: true },
    { clave: "enfermedad", etiqueta: "جهة العمل: الإجازات المرضية وغير الاعتيادية", formato: "moneda", ocultarSiCero: true },
  ],
});
