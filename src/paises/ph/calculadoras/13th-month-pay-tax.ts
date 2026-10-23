import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.13th-month-pay-tax",
  mercado: "ph",
  concepto: "propio",
  slug: "13th-month-pay-tax",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.thirteenth-month-exemption": "numero",
  },
  campos: [
    { id: "trece", tipo: "moneda", etiqueta: "13th month pay", min: 0, porDefecto: 40000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other bonuses and benefits in the year (Christmas bonus, productivity incentives)", min: 0, porDefecto: 0 },
    {
      id: "gravable",
      tipo: "moneda",
      etiqueta: "Your other taxable compensation for the year",
      min: 0,
      porDefecto: 400000,
      ayuda: "Salary for the year minus SSS, PhilHealth and Pag-IBIG. Used to find the tax on the taxable part of your bonuses.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.trece + entrada.otros <= 0) throw new ErrorEntrada("Enter your 13th month pay or bonuses.", "trece");
    const tope = v["ph.thirteenth-month-exemption"];
    const total = entrada.trece + entrada.otros;
    const exento = Math.min(total, tope);
    const gravado = total - exento;
    const escala = v["ph.income-tax-table"];
    const impuesto = redondear(impuestoAnual(escala, entrada.gravable + gravado) - impuestoAnual(escala, entrada.gravable));
    return {
      exento: redondear(exento),
      gravado: redondear(gravado),
      impuesto,
      neto: redondear(total - impuesto),
      margen: redondear(Math.max(0, tope - total)),
      tasa: gravado > 0 ? tasaMarginal(escala, entrada.gravable + gravado) : 0,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Bonuses after tax", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Tax-free part", formato: "moneda" },
    { clave: "gravado", etiqueta: "Taxable part", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income tax on your bonuses", formato: "moneda" },
    { clave: "margen", etiqueta: "Room left under the tax-free ceiling", formato: "moneda", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Rate on the taxable part", formato: "porcentaje", decimales: 0 },
  ],
});
