import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.sick-leave-pay-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "sick-leave-pay-calculator",
  estado: "publicado",
  requiere: {
    "ag.sick-full-pay-days": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Pay for the month", min: 0, porDefecto: 3300 },
    { id: "diasLaborales", tipo: "entero", etiqueta: "Working days in your pay month", min: 1, max: 31, porDefecto: 22 },
    { id: "usados", tipo: "entero", etiqueta: "Sick days already taken in the 12 months", min: 0, max: 365, porDefecto: 0, ayuda: "Count from your start date or its latest anniversary." },
    { id: "nuevos", tipo: "entero", etiqueta: "Sick days you are taking now", min: 0, max: 365, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your pay for the month.", "salario");
    const tope = v["ag.sick-full-pay-days"];
    const disponibles = Math.max(0, tope - e.usados);
    const pagados = Math.min(e.nuevos, disponibles);
    const pagoDiario = redondear(e.salario / e.diasLaborales);
    const observaciones: string[] = [];
    if (e.nuevos > pagados) observaciones.push("Days beyond the full-pay allowance are not covered by the Labour Code. You may qualify for Social Security sickness benefit.");
    return { pagoDiario, disponibles, pagados, sinPago: e.nuevos - pagados, pago: redondear(pagados * pagoDiario), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay for these days", formato: "moneda", destacada: true },
    { clave: "pagados", etiqueta: "Days paid in full", formato: "dias" },
    { clave: "sinPago", etiqueta: "Days not covered by the Labour Code", formato: "dias" },
    { clave: "disponibles", etiqueta: "Full-pay days left before these", formato: "dias" },
    { clave: "pagoDiario", etiqueta: "A day's pay", formato: "moneda" },
  ],
});
