import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { salarioDiario } from "../lib/laboral";

export default definirCalculadora({
  id: "sa.sick-leave-calculator",
  mercado: "sa",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "sa.sick-leave": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 9000 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "مجموع أيام الإجازة المرضية خلال السنة",
      ayuda: "السنة تبدأ من تاريخ أول إجازة مرضية، وتُجمع الأيام متصلة كانت أو متقطعة.",
      min: 0,
      max: 365,
      porDefecto: 45,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["sa.sick-leave"];
    const llenos = Math.min(entrada.dias, enMapa(t, "full-days"));
    const parciales = Math.min(Math.max(0, entrada.dias - llenos), enMapa(t, "partial-days"));
    const sinPago = Math.min(Math.max(0, entrada.dias - llenos - parciales), enMapa(t, "unpaid-days"));
    const fuera = Math.max(0, entrada.dias - llenos - parciales - sinPago);
    const diario = salarioDiario(entrada.salario, v["sa.month-days"]);
    const pago = llenos * diario + parciales * porcentaje(diario, enMapa(t, "partial-rate"));
    const observaciones: string[] = [];
    if (fuera > 0) observaciones.push("تجاوزت الأيام ما ينص عليه النظام من إجازة مرضية خلال السنة الواحدة.");
    return {
      pago: redondear(pago),
      llenos,
      parciales,
      sinPago,
      perdido: redondear(entrada.dias * diario - pago),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر الإجازة المرضية", formato: "moneda", destacada: true },
    { clave: "llenos", etiqueta: "أيام بأجر كامل", formato: "dias" },
    { clave: "parciales", etiqueta: "أيام بثلاثة أرباع الأجر", formato: "dias" },
    { clave: "sinPago", etiqueta: "أيام دون أجر", formato: "dias" },
    { clave: "perdido", etiqueta: "ما ينقص من أجرك عن هذه الأيام", formato: "moneda" },
  ],
});
