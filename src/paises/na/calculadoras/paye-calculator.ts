import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, nad, noNegativo, OPCIONES_PERIODO, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "na.paye-calculator",
  mercado: "na",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "na.income-tax-bands": "escala",
    "na.retirement-deduction-cap": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income (salary plus taxable allowances)", min: 0, porDefecto: 25000 },
    { id: "periodo", tipo: "opcion", etiqueta: "Amounts are", opciones: OPCIONES_PERIODO, porDefecto: "month" },
    {
      id: "aportes",
      tipo: "moneda",
      etiqueta: "Pension, provident, retirement annuity and education policy contributions",
      min: 0,
      porDefecto: 0,
      ayuda: "For the same period as your income. Together they are deductible up to the yearly cap.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your income.", "ingreso");
    noNegativo(e.aportes, "aportes", "Contributions cannot be negative.");
    const factor = e.periodo === "month" ? 12 : 1;
    const anual = e.ingreso * factor;
    const aportesAnual = e.aportes * factor;
    if (aportesAnual >= anual) throw new ErrorEntrada("Your contributions have to be less than your income.", "aportes");
    const tope = v["na.retirement-deduction-cap"];
    const deduccion = Math.min(aportesAnual, tope);
    const gravable = anual - deduccion;
    const impuesto = redondear(impuestoAnual(v["na.income-tax-bands"], gravable));
    const observaciones: string[] = [];
    if (aportesAnual > tope) observaciones.push(`Only ${nad(tope)} of your yearly contributions is deductible.`);
    if (impuesto === 0) observaciones.push("Your taxable income is below the tax-free threshold, so no PAYE is due.");
    return {
      mensual: redondear(impuesto / 12),
      anual: impuesto,
      gravable: redondear(gravable),
      deduccion: redondear(deduccion),
      marginal: tasaMarginal(v["na.income-tax-bands"], gravable),
      efectiva: (impuesto / anual) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "PAYE a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Income tax a year", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable income a year", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Deduction for contributions", formato: "moneda", ocultarSiCero: true },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "Share of your income paid in tax", formato: "porcentaje", decimales: 1 },
  ],
});
