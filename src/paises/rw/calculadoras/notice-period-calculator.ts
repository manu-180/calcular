import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.notice-period-calculator",
  mercado: "rw",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "rw.notice-days-short": "numero",
    "rw.notice-days-long": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months worked for this employer", min: 0, porDefecto: 24 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 300000 },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Who ends the contract",
      opciones: [
        { valor: "employer", etiqueta: "The employer" },
        { valor: "employee", etiqueta: "The employee" },
      ],
      porDefecto: "employer",
    },
    { id: "prueba", tipo: "si-no", etiqueta: "Still on probation", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses < 0) throw new ErrorEntrada("Months worked cannot be negative.", "meses");
    if (e.prueba) {
      return { dias: 0, salarioPreaviso: 0, diasBusqueda: 0, observaciones: ["No notice can be given during probation."] };
    }
    const dias = e.meses >= 12 ? v["rw.notice-days-long"] : v["rw.notice-days-short"];
    const observaciones = ["This is the legal minimum. A collective agreement, the internal rules or your contract can set a longer notice.", "Notice must be given in writing and state the reasons."];
    return {
      dias,
      salarioPreaviso: redondear((e.salario / 30) * dias),
      diasBusqueda: e.quien === "employer" ? Math.floor(dias / 7) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Minimum notice", formato: "dias", destacada: true },
    { clave: "salarioPreaviso", etiqueta: "Salary for the notice period (monthly salary ÷ 30 × days)", formato: "moneda" },
    { clave: "diasBusqueda", etiqueta: "Days off to look for a new job (one a week)", formato: "dias", ocultarSiCero: true },
  ],
});
