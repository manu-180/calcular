import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportes, REQUIERE_APORTES } from "../lib/nomina";

export default definirCalculadora({
  id: "eg.employer-cost",
  mercado: "eg",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: REQUIERE_APORTES,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "إجمالي المرتب الشهري للموظف", min: 0, porDefecto: 15000 },
    {
      id: "asegurable",
      tipo: "moneda",
      etiqueta: "أجر الاشتراك التأميني الشهري",
      min: 0,
      requerido: false,
      ayuda: "اختياري. إذا تركته فارغًا نستخدم إجمالي المرتب في حدود أجر الاشتراك.",
    },
    { id: "empleados", tipo: "entero", etiqueta: "عدد الموظفين بالمرتب نفسه", min: 1, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("أدخل إجمالي المرتب الشهري.", "bruto");
    const a = aportes(e.bruto, e.asegurable, v);
    const contribucion = redondear(a.empleador);
    const costoMensual = redondear(e.bruto + contribucion);
    return {
      costoMensual,
      contribucion,
      costoAnual: redondear(costoMensual * 12),
      costoTotalMensual: redondear(costoMensual * e.empleados),
      costoTotalAnual: redondear(costoMensual * 12 * e.empleados),
      base: a.base,
      sobrecosto: (contribucion / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "تكلفة الموظف الشهرية", formato: "moneda", destacada: true },
    { clave: "contribucion", etiqueta: "حصة صاحب العمل في التأمينات", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "تكلفة الموظف في 12 شهرًا", formato: "moneda" },
    { clave: "costoTotalMensual", etiqueta: "تكلفة كل الموظفين في الشهر", formato: "moneda" },
    { clave: "costoTotalAnual", etiqueta: "تكلفة كل الموظفين في السنة", formato: "moneda" },
    { clave: "base", etiqueta: "أجر الاشتراك المستخدم", formato: "moneda" },
    { clave: "sobrecosto", etiqueta: "الزيادة على المرتب", formato: "porcentaje", decimales: 2 },
  ],
});
