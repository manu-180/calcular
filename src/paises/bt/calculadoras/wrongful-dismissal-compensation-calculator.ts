import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.wrongful-dismissal-compensation-calculator",
  mercado: "bt",
  concepto: "indemnizacion-despido",
  slug: "wrongful-dismissal-compensation-calculator",
  estado: "publicado",
  requiere: {
    "bt.wrongful-dismissal-months-per-year": "numero",
    "bt.wrongful-dismissal-max-months": "numero",
    "bt.final-pay-days": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Complete years of continuous employment", min: 0, max: 60, porDefecto: 3 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 25000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario < 0) throw new ErrorEntrada("Pay cannot be negative.", "salario");
    const sinTope = e.anios * v["bt.wrongful-dismissal-months-per-year"];
    const meses = Math.min(sinTope, v["bt.wrongful-dismissal-max-months"]);
    const compensacion = redondear(meses * e.salario);
    const observaciones = [
      "This is the most a court may order under section 94(b). The court decides whether to order it, and reinstatement is another possible remedy.",
    ];
    if (sinTope > meses) observaciones.push("Your length of service goes past the cap, so the cap applies.");
    return { compensacion, meses, plazoSalarios: v["bt.final-pay-days"], observaciones };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Most a court may order", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "Months of pay", formato: "meses" },
    { clave: "plazoSalarios", etiqueta: "Days to pay wages owing after the contract ends", formato: "dias" },
  ],
});
