import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nomina, REQUIERE_NOMINA } from "../lib/nomina";

export default definirCalculadora({
  id: "et.net-salary-calculator",
  mercado: "et",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 15000, ayuda: "Your salary before tax and pension, with taxable allowances included." },
    { id: "otras", tipo: "moneda", etiqueta: "Other deductions for the month", min: 0, porDefecto: 0, ayuda: "Loan repayments, savings association or union dues taken from your pay." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    const n = nomina(e.bruto, v["et.employment-income-tax"], v["et.pension-employee"]);
    const impuesto = redondear(n.impuesto);
    const pension = redondear(n.pension);
    const neto = redondear(e.bruto - impuesto - pension - e.otras);
    const observaciones: string[] = [];
    if (neto < 0) observaciones.push("Your deductions are larger than your salary. Check the amounts you entered.");
    return {
      neto,
      impuesto,
      pension,
      otras: e.otras,
      totalDeducido: redondear(impuesto + pension + e.otras),
      marginal: n.marginal,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Net salary for the month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Employment income tax", formato: "moneda" },
    { clave: "pension", etiqueta: "Your pension contribution", formato: "moneda" },
    { clave: "otras", etiqueta: "Other deductions", formato: "moneda", ocultarSiCero: true },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your top tax rate", formato: "porcentaje", decimales: 0 },
    { clave: "netoAnual", etiqueta: "Net salary over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross salary you take home", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { otras: 0 } },
});
