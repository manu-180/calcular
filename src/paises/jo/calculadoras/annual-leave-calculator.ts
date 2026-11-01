import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.annual-leave-calculator",
  mercado: "jo",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "jo.annual-leave": "mapa",
    "jo.annual-leave-years": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 600 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة المتصلة لدى صاحب العمل نفسه", min: 0, max: 60, porDefecto: 2 },
    { id: "diasTrabajados", tipo: "entero", etiqueta: "الأيام التي عملتها من السنة الحالية", ayuda: "365 إذا أكملت سنة الخدمة.", min: 0, max: 365, porDefecto: 365 },
    { id: "tomados", tipo: "numero", etiqueta: "أيام الإجازة التي استعملتها من هذه السنة", min: 0, max: 60, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["jo.annual-leave"];
    const larga = entrada.anios >= v["jo.annual-leave-years"];
    const porAnio = larga ? enMapa(t, "long-service") : enMapa(t, "base");
    const acumulados = (porAnio * Math.min(entrada.diasTrabajados, 365)) / 365;
    const saldo = Math.max(0, acumulados - entrada.tomados);
    const diario = entrada.salario / DIAS_MES;
    const observaciones = [
      "لا تُحسب أيام العطل الرسمية والأعياد الدينية والعطلة الأسبوعية من الإجازة السنوية. وأجر اليوم هنا على أساس 30 يومًا في الشهر.",
    ];
    if (entrada.tomados > acumulados) observaciones.push("الأيام المستعملة أكثر من المستحق حتى الآن.");
    return {
      saldo: Math.round(saldo * 100) / 100,
      porAnio,
      acumulados: Math.round(acumulados * 100) / 100,
      pago: redondear(saldo * diario),
      diario: redondear(diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "saldo", etiqueta: "رصيد الإجازة المستحق", formato: "dias", decimales: 2, destacada: true },
    { clave: "porAnio", etiqueta: "أيام الإجازة في السنة", formato: "dias" },
    { clave: "acumulados", etiqueta: "المستحق عن هذه السنة حتى الآن", formato: "dias", decimales: 2 },
    { clave: "pago", etiqueta: "أجر رصيد الإجازة", formato: "moneda" },
    { clave: "diario", etiqueta: "أجر اليوم", formato: "moneda" },
  ],
});
