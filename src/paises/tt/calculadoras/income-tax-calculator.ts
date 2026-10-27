import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_PAYE } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.income-tax-calculator",
  mercado: "tt",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: REQUIERE_PAYE,
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Total income for the year", min: 0, porDefecto: 240000, ayuda: "Salary, wages, taxable allowances and benefits before any deduction." },
    { id: "nis", tipo: "moneda", etiqueta: "NIS you paid in the year", min: 0, porDefecto: 0, ayuda: "Your share only, as shown on your payslips or TD4." },
    { id: "pension", tipo: "moneda", etiqueta: "Pension, annuity and provident fund contributions", min: 0, porDefecto: 0 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "Other deductions you can claim",
      min: 0,
      porDefecto: 0,
      ayuda: "For example tertiary education expenses, a first home, or alimony under a court order.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your total income for the year.", "ingreso");
    const r = impuestoAnual(e.ingreso, e.nis, e.pension, e.otras, v);
    const impuesto = redondear(r.impuesto);
    const observaciones: string[] = [];
    if (r.deduccionNisPension === v["tt.pension-nis-deduction-cap"]) observaciones.push("Your NIS and pension deduction reached the yearly limit.");
    if (impuesto === 0) observaciones.push("Your income stays within the personal allowance and deductions, so no income tax is due.");
    return {
      impuesto,
      allowance: v["tt.personal-allowance"],
      deduccion: redondear(r.deduccionNisPension),
      imponible: redondear(r.imponible),
      impuestoBajo: redondear(r.impuestoBajo),
      impuestoAlto: redondear(r.impuestoAlto),
      mensual: redondear(r.impuesto / 12),
      efectiva: (r.impuesto / e.ingreso) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "allowance", etiqueta: "Personal allowance", formato: "moneda" },
    { clave: "deduccion", etiqueta: "NIS and pension deduction", formato: "moneda" },
    { clave: "imponible", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "impuestoBajo", etiqueta: "Tax at the lower rate", formato: "moneda" },
    { clave: "impuestoAlto", etiqueta: "Tax at the higher rate", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Equal to this much a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your income paid in tax", formato: "porcentaje", decimales: 1 },
  ],
});
