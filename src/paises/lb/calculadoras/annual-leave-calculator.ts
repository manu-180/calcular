import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "lb.annual-leave-calculator",
  mercado: "lb",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: { "lb.annual-leave": "mapa" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري بالليرة", min: 0, porDefecto: 30000000 },
    { id: "anioCompleto", tipo: "si-no", etiqueta: "أمضيت سنة على الأقل في المؤسسة", porDefecto: true },
    { id: "enfermedad", tipo: "si-no", etiqueta: "تجاوزت إجازتك المرضية شهرًا هذه السنة، وخفض صاحب العمل الإجازة", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const m = v["lb.annual-leave"];
    const dias = !entrada.anioCompleto ? 0 : entrada.enfermedad ? enMapa(m, "reduced") : enMapa(m, "days");
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      dias,
      diario,
      pago: redondear((entrada.salario / DIAS_MES) * dias),
      observaciones: ["أجر اليوم هنا هو الأجر الشهري مقسومًا على 30 يومًا. يختار صاحب العمل تاريخ الإجازة بحسب حاجات العمل، ولا يجوز له الصرف أو توجيه الإنذار خلالها."],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "أيام الإجازة بأجر كامل", formato: "dias", destacada: true },
    { clave: "pago", etiqueta: "أجر مدة الإجازة", formato: "moneda" },
    { clave: "diario", etiqueta: "أجر اليوم", formato: "moneda" },
  ],
});
