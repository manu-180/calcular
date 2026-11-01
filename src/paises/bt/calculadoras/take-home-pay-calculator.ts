import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.take-home-pay-calculator",
  mercado: "bt",
  concepto: "sueldo-neto",
  slug: "take-home-pay-calculator",
  estado: "publicado",
  requiere: {
    "bt.pit-bands": "escala",
    "bt.employment-deduction-rate": "numero",
    "bt.employment-deduction-cap": "numero",
    "bt.pf-private-employee-min": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 50000, ayuda: "Basic pay plus allowances." },
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month, if lower (optional)", min: 0, requerido: false, ayuda: "Provident fund is worked out on basic pay. If you leave this empty, we use your gross pay." },
    { id: "tasaPf", tipo: "numero", etiqueta: "Your provident fund rate (%)", min: 0, max: 100, porDefecto: 5, ayuda: "The private scheme minimum is 5 %. Your contract may set more." },
    { id: "otros", tipo: "moneda", etiqueta: "Other deductions from your pay, such as group insurance", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const basico = e.basico ?? e.bruto;
    if (basico > e.bruto) throw new ErrorEntrada("Basic pay cannot be more than gross pay.", "basico");
    const anual = e.bruto * 12;
    const deduccion = Math.min(porcentaje(anual, v["bt.employment-deduction-rate"]), v["bt.employment-deduction-cap"]);
    const imponible = anual - deduccion;
    const impuestoAnual = redondear(aplicarEscalaMarginal(v["bt.pit-bands"], imponible));
    const impuesto = redondear(impuestoAnual / 12);
    const pf = redondear(porcentaje(basico, e.tasaPf));
    const neto = redondear(e.bruto - impuesto - pf - e.otros);
    const observaciones = ["Your employer withholds tax from a monthly table (Annexure I of the Rules), so a payslip can differ a little. The yearly return settles the difference."];
    if (e.tasaPf > 0 && e.tasaPf < v["bt.pf-private-employee-min"]) observaciones.push(`The private scheme minimum is ${v["bt.pf-private-employee-min"]} % of basic pay.`);
    return {
      neto,
      impuesto,
      pf,
      otros: e.otros,
      deduccion: redondear(deduccion),
      imponible: redondear(imponible),
      impuestoAnual,
      netoAnual: redondear(neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Income tax for the month", formato: "moneda" },
    { clave: "pf", etiqueta: "Your provident fund contribution", formato: "moneda" },
    { clave: "otros", etiqueta: "Other deductions", formato: "moneda", ocultarSiCero: true },
    { clave: "deduccion", etiqueta: "Employment deduction for the year", formato: "moneda" },
    { clave: "imponible", etiqueta: "Taxable income for the year", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "Income tax for the year", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
  ],
});
