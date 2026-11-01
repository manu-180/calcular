import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { deduccionesMes, REQUIERE_EMPLEADO } from "../lib/nomina";

export default definirCalculadora({
  id: "bb.salary-calculator",
  mercado: "bb",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: REQUIERE_EMPLEADO,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 5000, ayuda: "Your pay for the month before PAYE and NIS come off." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const d = deduccionesMes(e.bruto, v, redondear);
    const observaciones: string[] = [];
    if (d.paye.total === 0) observaciones.push("Your pay this month is within the personal allowance, so no PAYE is deducted.");
    if (d.paye.alto > 0) observaciones.push("Part of your taxable pay is above the lower band, so that part is taxed at the higher rate.");
    if (e.bruto > v["bb.nis-ceiling-monthly"]) observaciones.push("NIS stops at the monthly insurable earnings ceiling. The Resilience and Regeneration Fund still applies to your full pay.");
    return {
      neto: d.neto,
      paye: d.paye.total,
      nis: d.nis,
      rrf: d.rrf,
      total: d.total,
      imponible: d.paye.imponible,
      desgravacion: d.paye.desgravacion,
      netoAnual: redondear(d.neto * 12),
      porcentajeNeto: (d.neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS contribution", formato: "moneda" },
    { clave: "rrf", etiqueta: "Resilience and Regeneration Fund", formato: "moneda" },
    { clave: "total", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "imponible", etiqueta: "Taxable pay after the personal allowance", formato: "moneda" },
    { clave: "desgravacion", etiqueta: "Personal allowance for the month", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
});
