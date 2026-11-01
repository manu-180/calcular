import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.rental-income-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.rental-bands": "escala",
    "rw.rental-deduction": "numero",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Gross rent received in the year", min: 0, porDefecto: 2400000 },
    { id: "intereses", tipo: "moneda", etiqueta: "Bank interest paid in the year on a loan for the property", min: 0, porDefecto: 0, ayuda: "Only with proof from the bank, for a loan used to build or buy the rented property." },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("Enter the rent received in the year.", "renta");
    const deduccion = redondear(porcentaje(e.renta, v["rw.rental-deduction"]));
    const gravable = Math.max(0, e.renta - deduccion - e.intereses);
    const impuesto = redondear(aplicarEscalaMarginal(v["rw.rental-bands"], gravable));
    return { impuesto, gravable, deduccion, efectiva: (impuesto / e.renta) * 100 };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rental income tax for the year", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Taxable rental income", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Standard deduction for upkeep", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of gross rent", formato: "porcentaje", decimales: 1 },
  ],
});
