import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.net-salary-calculator",
  mercado: "sc",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: { "sc.income-tax-bands": "escala", "sc.spf-employee-rate": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 25000, ayuda: "Pay before income tax and pension contributions, allowances included." },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const impuesto = redondear(aplicarEscalaMarginal(v["sc.income-tax-bands"], e.bruto));
    const spf = redondear(porcentaje(e.bruto, v["sc.spf-employee-rate"]));
    const totalDeducido = redondear(impuesto + spf);
    const neto = redondear(e.bruto - totalDeducido);
    return {
      neto,
      impuesto,
      spf,
      totalDeducido,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones: ["Figures are for a citizen on a standard monthly wage. Any other deduction on your payslip, such as a loan or union dues, comes on top."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income tax", formato: "moneda" },
    { clave: "spf", etiqueta: "Seychelles Pension Fund contribution", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
});
