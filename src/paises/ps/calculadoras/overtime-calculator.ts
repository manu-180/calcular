import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { salarioSemanal } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.overtime-calculator",
  mercado: "ps",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ps.working-hours": "numero",
    "ps.overtime-rate": "numero",
    "ps.overtime-max": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 3000 },
    { id: "horas", tipo: "numero", etiqueta: "عدد الساعات الإضافية", min: 0, max: 400, porDefecto: 10 },
    {
      id: "semanas",
      tipo: "entero",
      etiqueta: "عدد الأسابيع التي عُملت فيها هذه الساعات",
      ayuda: "يُستخدم لمقارنة الساعات بالحد الأعلى الأسبوعي.",
      min: 1,
      max: 53,
      porDefecto: 4,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    if (entrada.horas <= 0) throw new ErrorEntrada("أدخل عدد الساعات الإضافية.", "horas");
    const hora = salarioSemanal(entrada.salario) / v["ps.working-hours"];
    const horaExtra = porcentaje(hora, v["ps.overtime-rate"]);
    const promedio = entrada.horas / entrada.semanas;
    const observaciones = ["أجر الساعة العادي هو الأجر الشهري مضروبًا في 12 ومقسومًا على 52 أسبوعًا ثم على ساعات العمل الأسبوعية في القانون."];
    if (promedio > v["ps.overtime-max"]) observaciones.push("متوسط ساعاتك الإضافية يزيد على الحد الأعلى الأسبوعي في القانون، ويبقى لك أجر كل ساعة عملتها.");
    return {
      total: redondear(entrada.horas * horaExtra),
      hora: redondear(hora),
      horaExtra: redondear(horaExtra),
      promedio: Math.round(promedio * 100) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "أجر الساعات الإضافية", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "أجر الساعة العادية", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "أجر الساعة الإضافية", formato: "moneda" },
    { clave: "promedio", etiqueta: "متوسط الساعات الإضافية في الأسبوع", formato: "horas", decimales: 2 },
  ],
});
