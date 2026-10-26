import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { deduccionesMes, REQUIERE_EMPLEADO } from "../lib/nomina";

export default definirCalculadora({
  id: "jm.salary-calculator",
  mercado: "jm",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_EMPLEADO, "jm.income-tax-threshold": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 250000, ayuda: "Basic pay plus taxable allowances, before any deduction." },
    {
      id: "pensionPct",
      tipo: "porcentaje",
      etiqueta: "Your contribution to an approved pension scheme (% of gross)",
      min: 0,
      max: 100,
      porDefecto: 0,
      ayuda: "Leave it at 0 if you are not in a company or private pension plan.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    if (e.pensionPct < 0 || e.pensionPct >= 100) throw new ErrorEntrada("Enter a pension contribution below 100% of your pay.", "pensionPct");
    const pension = redondear(porcentaje(e.bruto, e.pensionPct));
    const d = deduccionesMes(e.bruto, pension, v, redondear);
    const observaciones: string[] = [];
    if (d.paye === 0) observaciones.push("Your statutory income is below the monthly threshold, so no PAYE is due.");
    if (d.ingresoEstatutario > v["jm.income-tax-higher-band-monthly"]) observaciones.push("Part of your statutory income this month is in the higher band, so that part is taxed at the higher rate.");
    return {
      neto: d.neto,
      paye: d.paye,
      nis: d.nis,
      nht: d.nht,
      educationTax: d.educationTax,
      pension: d.pension,
      total: d.total,
      ingresoEstatutario: d.ingresoEstatutario,
      umbral: v["jm.paye-threshold-monthly"],
      netoAnual: redondear(d.neto * 12),
      porcentajeNeto: (d.neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS", formato: "moneda" },
    { clave: "nht", etiqueta: "NHT", formato: "moneda" },
    { clave: "educationTax", etiqueta: "Education Tax", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "ingresoEstatutario", etiqueta: "Statutory income (gross less NIS and pension)", formato: "moneda" },
    { clave: "umbral", etiqueta: "Monthly income tax threshold", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
});
