import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.unfair-dismissal-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "unfair-dismissal-calculator",
  estado: "publicado",
  requiere: {
    "rw.unfair-min-months": "numero",
    "rw.unfair-max-months": "numero",
    "rw.unfair-max-months-long": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 300000 },
    { id: "anios", tipo: "numero", etiqueta: "Years with the same employer", min: 0, porDefecto: 4 },
    {
      id: "neto",
      tipo: "moneda",
      etiqueta: "Net monthly salary",
      min: 0,
      requerido: false,
      ayuda: "Only used after more than 10 years, when the top of the range is set in net salary.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter the monthly salary.", "salario");
    if (e.anios < 0) throw new ErrorEntrada("Years cannot be negative.", "anios");
    const largo = e.anios > 10;
    const minimo = redondear(e.salario * v["rw.unfair-min-months"]);
    const base = largo ? (e.neto ?? e.salario) : e.salario;
    const maximo = redondear(base * (largo ? v["rw.unfair-max-months-long"] : v["rw.unfair-max-months"]));
    const observaciones = ["The court sets the amount inside this range. The same range applies when an employee ends the contract unlawfully and owes the employer."];
    if (largo && e.neto === null) observaciones.push("Add the net monthly salary for an exact top of the range. Gross salary was used.");
    return { minimo, maximo: Math.max(minimo, maximo), mesesMax: largo ? v["rw.unfair-max-months-long"] : v["rw.unfair-max-months"], observaciones };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Lowest damages", formato: "moneda", destacada: true },
    { clave: "maximo", etiqueta: "Highest damages", formato: "moneda", destacada: true },
    { clave: "mesesMax", etiqueta: "Months of salary at the top of the range", formato: "numero", decimales: 0 },
  ],
});
