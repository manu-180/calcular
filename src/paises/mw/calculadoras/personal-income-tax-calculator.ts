import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { paye } from "../lib/nomina";

export default definirCalculadora({
  id: "mw.personal-income-tax-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "personal-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.personal-tax-bands": "escala",
  },
  campos: [
    {
      id: "renta",
      tipo: "moneda",
      etiqueta: "Taxable income for the year",
      min: 0,
      porDefecto: 6000000,
      ayuda: "Business or other income after allowable expenses. Salary taxed through PAYE has its own calculator.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("Enter your taxable income for the year.", "renta");
    const impuesto = redondear(paye(v["mw.personal-tax-bands"], e.renta));
    return { impuesto, neto: redondear(e.renta - impuesto), efectiva: (impuesto / e.renta) * 100 };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your income that goes in tax", formato: "porcentaje", decimales: 1 },
  ],
});
