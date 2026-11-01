import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual } from "../lib/nomina";

export default definirCalculadora({
  id: "fj.redundancy-tax-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "redundancy-tax-calculator",
  estado: "publicado",
  requiere: {
    "fj.redundancy-tax-exemption": "numero",
    "fj.paye-bands": "escala",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Redundancy payment", min: 0, porDefecto: 25000 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Other employment income in the same year", min: 0, porDefecto: 40000, ayuda: "Wages from the year, before tax." },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter the redundancy payment.", "pago");
    const exento = Math.min(e.pago, v["fj.redundancy-tax-exemption"]);
    const gravable = redondear(e.pago - exento);
    const sin = impuestoAnual(v["fj.paye-bands"], e.ingreso, redondear);
    const con = impuestoAnual(v["fj.paye-bands"], redondear(e.ingreso + gravable), redondear);
    const impuesto = redondear(con - sin);
    return { exento, gravable, impuesto, neto: redondear(e.pago - impuesto) };
  },
  resultado: [
    { clave: "neto", etiqueta: "Redundancy payment after tax", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Tax exempt part", formato: "moneda" },
    { clave: "gravable", etiqueta: "Part added to your income", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Extra tax on the payment", formato: "moneda" },
  ],
});
