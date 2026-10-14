import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.annual-leave",
  mercado: "za",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "za.annual-leave-days": "numero",
    "za.leave-accrual-days": "numero",
    "za.weeks-per-month": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary before deductions", min: 0, porDefecto: 15000 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you work in a week", min: 1, max: 6, porDefecto: 5 },
    { id: "trabajados", tipo: "entero", etiqueta: "Days worked in the current leave cycle (optional)", min: 0, max: 366, requerido: false, ayuda: "Use this to see the leave you have built up so far, for example when you leave a job." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    // 21 días corridos son tres semanas: en días hábiles, tres veces los días que se trabajan por semana.
    const semanas = v["za.annual-leave-days"] / 7;
    const diasAnuales = redondear(semanas * entrada.diasSemana);
    const diario = redondear(entrada.salario / (v["za.weeks-per-month"] * entrada.diasSemana));
    const acumulados = entrada.trabajados === null ? null : redondear(entrada.trabajados / v["za.leave-accrual-days"]);
    return {
      diasAnuales,
      diario,
      pagoAnual: redondear(diasAnuales * diario),
      acumulados,
      pagoAcumulado: acumulados === null ? null : redondear(acumulados * diario),
    };
  },
  resultado: [
    { clave: "diasAnuales", etiqueta: "Working days of leave a year", formato: "dias", decimales: 0, destacada: true },
    { clave: "diario", etiqueta: "Pay for one day of leave", formato: "moneda" },
    { clave: "pagoAnual", etiqueta: "Value of a full year's leave", formato: "moneda" },
    { clave: "acumulados", etiqueta: "Leave built up so far (days)", formato: "dias", decimales: 2 },
    { clave: "pagoAcumulado", etiqueta: "Pay for the leave built up", formato: "moneda" },
  ],
});
