import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.company-car-deduction-calculator",
  mercado: "bn",
  concepto: "propio",
  slug: "company-car-deduction-calculator",
  estado: "publicado",
  requiere: { "bn.vehicle-cap": "numero", "bn.vehicle-passengers": "numero" },
  campos: [
    { id: "costo", tipo: "moneda", etiqueta: "Cost of the car", min: 0, porDefecto: 60000 },
    { id: "gastos", tipo: "moneda", etiqueta: "Running costs for the year (fuel, repairs, insurance)", min: 0, porDefecto: 10000 },
    { id: "aplica", tipo: "si-no", etiqueta: "The car carries up to 7 passengers and weighs 3,000 kg or less", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.costo <= 0) throw new ErrorEntrada("Enter the cost of the car.", "costo");
    const tope = v["bn.vehicle-cap"];
    const proporcion = e.aplica ? Math.min(1, tope / e.costo) : 1;
    const deducible = redondear(e.gastos * proporcion);
    return {
      base: redondear(e.aplica ? Math.min(e.costo, tope) : e.costo),
      proporcion: proporcion * 100,
      deducible,
      noDeducible: redondear(e.gastos - deducible),
    };
  },
  resultado: [
    { clave: "deducible", etiqueta: "Running costs you can deduct", formato: "moneda", destacada: true },
    { clave: "noDeducible", etiqueta: "Running costs you cannot deduct", formato: "moneda" },
    { clave: "base", etiqueta: "Cost counted for capital allowances", formato: "moneda" },
    { clave: "proporcion", etiqueta: "Share of running costs allowed", formato: "porcentaje", decimales: 2 },
  ],
});
