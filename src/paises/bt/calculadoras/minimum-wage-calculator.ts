import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.minimum-wage-calculator",
  mercado: "bt",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "publicado",
  requiere: {
    "bt.nmw-daily": "numero",
    "bt.nmw-monthly": "numero",
    "bt.standard-day-hours": "numero",
    "bt.national-workforce-rates": "mapa",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days worked", min: 1, max: 366, porDefecto: 30 },
    { id: "pago", tipo: "moneda", etiqueta: "What you were paid for those days (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dias < 1) throw new ErrorEntrada("Enter at least one day.", "dias");
    const minimo = redondear(e.dias * v["bt.nmw-daily"]);
    const diferencia = e.pago === null ? null : redondear(e.pago - minimo);
    const observaciones = ["The National Minimum Wage does not apply to voluntary workers, apprentices or trainees."];
    return {
      minimo,
      diario: v["bt.nmw-daily"],
      mensual: v["bt.nmw-monthly"],
      hora: redondear(v["bt.nmw-daily"] / v["bt.standard-day-hours"]),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Minimum pay for those days", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "National Minimum Wage per day", formato: "moneda" },
    { clave: "mensual", etiqueta: "National Minimum Wage per month", formato: "moneda" },
    { clave: "hora", etiqueta: "Per hour, on a standard 8-hour day", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum", formato: "moneda" },
  ],
});
