import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { SEMANAS_ANIO } from "../lib/laboral";

export default definirCalculadora({
  id: "lb.overtime-calculator",
  mercado: "lb",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: { "lb.working-time": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري بالليرة", min: 0, porDefecto: 30000000 },
    { id: "horas", tipo: "numero", etiqueta: "عدد الساعات الإضافية", min: 0, max: 400, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const m = v["lb.working-time"];
    const hora = (entrada.salario * 12) / (enMapa(m, "weekly") * SEMANAS_ANIO);
    const horaExtra = hora * (1 + enMapa(m, "premium") / 100);
    return {
      pago: redondear(horaExtra * entrada.horas),
      hora: redondear(hora),
      horaExtra: redondear(horaExtra),
      observaciones: ["قانون العمل لا يحدد طريقة لتحويل الأجر الشهري إلى أجر ساعة، فالحساب تقديري على أساس الحد الأعلى لساعات الأسبوع. وإذا نص عقدك على عدد ساعات أقل فأجر ساعتك أعلى."],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر الساعات الإضافية", formato: "moneda", destacada: true },
    { clave: "horaExtra", etiqueta: "أجر الساعة الإضافية", formato: "moneda" },
    { clave: "hora", etiqueta: "أجر الساعة العادية تقريبًا", formato: "moneda" },
  ],
});
