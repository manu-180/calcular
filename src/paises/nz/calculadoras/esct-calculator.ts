import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { filaPorMonto } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.esct-calculator",
  mercado: "nz",
  concepto: "propio",
  slug: "esct-calculator",
  estado: "publicado",
  requiere: {
    "nz.esct-rates": "escala",
    "nz.kiwisaver-employer-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Employee's salary or wages for the year", min: 0, porDefecto: 70000 },
    {
      id: "aporte",
      tipo: "moneda",
      etiqueta: "Employer contributions for the year (leave 0 to use the compulsory rate)",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the employee's salary or wages.", "salario");
    const aporte = entrada.aporte > 0 ? redondear(entrada.aporte) : redondear((entrada.salario * v["nz.kiwisaver-employer-rate"]) / 100);
    const base = redondear(entrada.salario + aporte);
    const tasa = filaPorMonto(v["nz.esct-rates"], base).tasa;
    const esct = redondear((aporte * tasa) / 100);
    return {
      tasa,
      esct,
      neto: redondear(aporte - esct),
      aporte,
      base,
      observaciones: [
        "The ESCT rate uses the employee's salary or wages plus your gross contributions for the previous tax year. For a new employee, use your best estimate for this year.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "ESCT rate", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "esct", etiqueta: "ESCT to deduct", formato: "moneda" },
    { clave: "neto", etiqueta: "Net contribution paid into the fund", formato: "moneda" },
    { clave: "aporte", etiqueta: "Gross employer contribution", formato: "moneda" },
    { clave: "base", etiqueta: "Amount used to set the rate", formato: "moneda" },
  ],
});
