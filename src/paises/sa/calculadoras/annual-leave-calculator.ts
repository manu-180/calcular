import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { salarioDiario } from "../lib/laboral";

export default definirCalculadora({
  id: "sa.annual-leave-calculator",
  mercado: "sa",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "sa.annual-leave": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", ayuda: "الأجر الفعلي: الأساسي مع البدلات الثابتة.", min: 0, porDefecto: 9000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة المتصلة لدى صاحب العمل", min: 0, max: 60, porDefecto: 3 },
    { id: "diasTrabajados", tipo: "entero", etiqueta: "الأيام التي عملتها من سنة الإجازة الحالية", min: 0, max: 365, porDefecto: 365 },
    { id: "tomados", tipo: "numero", etiqueta: "أيام الإجازة التي استعملتها من هذه السنة", min: 0, max: 60, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["sa.annual-leave"];
    const larga = entrada.anios >= enMapa(t, "long-service-years");
    const porAnio = larga ? enMapa(t, "long-service-days") : enMapa(t, "base-days");
    const acumulados = (porAnio * Math.min(entrada.diasTrabajados, 365)) / 365;
    const saldo = Math.max(0, acumulados - entrada.tomados);
    const diario = salarioDiario(entrada.salario, v["sa.month-days"]);
    const observaciones = ["الإجازة تُدفع مقدمًا قبل أن تبدأ، ولا يجوز أخذ بدل نقدي عنها أثناء الخدمة. البدل النقدي عن الأيام غير المستعملة يكون عند ترك العمل."];
    if (entrada.tomados > acumulados) observaciones.push("الأيام المستعملة أكثر من المستحق حتى الآن.");
    return {
      saldo: redondear(saldo),
      pago: redondear(saldo * diario),
      porAnio,
      acumulados: redondear(acumulados),
      diario: redondear(diario),
      pagoCompleto: redondear(porAnio * diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "saldo", etiqueta: "رصيد الإجازة المستحق", formato: "dias", decimales: 2, destacada: true },
    { clave: "pago", etiqueta: "أجر رصيد الإجازة", formato: "moneda" },
    { clave: "porAnio", etiqueta: "أيام الإجازة في السنة", formato: "dias" },
    { clave: "acumulados", etiqueta: "الأيام المستحقة عن هذه السنة حتى الآن", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "الأجر اليومي", formato: "moneda" },
    { clave: "pagoCompleto", etiqueta: "أجر إجازة سنة كاملة", formato: "moneda" },
  ],
});
