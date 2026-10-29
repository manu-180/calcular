import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.vacation-leave-calculator",
  mercado: "ag",
  concepto: "vacaciones",
  slug: "vacation-leave-calculator",
  estado: "publicado",
  requiere: {
    "ag.vacation-days-per-month": "numero",
    "ag.probation-max-months": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Pay for the month", min: 0, porDefecto: 3500 },
    { id: "diasLaborales", tipo: "entero", etiqueta: "Working days in your pay month", min: 1, max: 31, porDefecto: 22, ayuda: "Used to turn your monthly pay into a day's pay." },
    { id: "meses", tipo: "entero", etiqueta: "Months of employment after probation", min: 0, max: 600, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Vacation days already taken", min: 0, max: 700, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your pay for the month.", "salario");
    const ganados = e.meses * v["ag.vacation-days-per-month"];
    if (e.tomados > ganados) throw new ErrorEntrada("You cannot have taken more days than you have earned.", "tomados");
    const pendientes = ganados - e.tomados;
    const pagoDiario = redondear(e.salario / e.diasLaborales);
    return { ganados, pendientes, pagoDiario, valor: redondear(pendientes * pagoDiario) };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Vacation days still due", formato: "dias", destacada: true },
    { clave: "ganados", etiqueta: "Vacation days earned", formato: "dias" },
    { clave: "pagoDiario", etiqueta: "A day's pay", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of the days due", formato: "moneda" },
  ],
});
