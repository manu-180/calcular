import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, maloti, tasaMarginal } from "../lib/comun";

export default definirCalculadora({
  id: "ls.income-tax-calculator",
  mercado: "ls",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ls.income-tax-bands": "escala",
    "ls.tax-credit": "numero",
    "ls.superannuation-cap": "numero",
  },
  campos: [
    {
      id: "ingreso",
      tipo: "moneda",
      etiqueta: "Your income for the tax year",
      min: 0,
      porDefecto: 120000,
      ayuda: "Salary, bonuses, allowances and business profit from 1 April to 31 March.",
    },
    { id: "pension", tipo: "moneda", etiqueta: "Your pension fund contributions for the year", min: 0, porDefecto: 0 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "Other allowable deductions (optional)",
      min: 0,
      requerido: false,
      ayuda: "Business expenses a sole trader can deduct, for example.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your income for the year.", "ingreso");
    const tope = porcentaje(entrada.ingreso, v["ls.superannuation-cap"]);
    const pension = Math.min(entrada.pension, tope);
    const imponible = Math.max(0, entrada.ingreso - pension - (entrada.otras ?? 0));
    const bandas = v["ls.income-tax-bands"];
    const { antes, aPagar } = impuestoAnual(bandas, v["ls.tax-credit"], imponible);
    const bajo = porcentaje(Math.min(imponible, bandas[0]?.hasta ?? imponible), bandas[0]?.tasa ?? 0);
    const observaciones: string[] = [];
    if (entrada.pension > tope) {
      observaciones.push(`Pension contributions are deductible up to ${v["ls.superannuation-cap"]}% of your income, so only ${maloti(redondear(tope))} was taken off.`);
    }
    if (aPagar === 0) observaciones.push("The tax credit is larger than the tax on this income, so nothing is payable. The credit is not refunded.");
    return {
      impuesto: redondear(aPagar),
      imponible: redondear(imponible),
      tramoBajo: redondear(bajo),
      tramoAlto: redondear(antes - bajo),
      credito: v["ls.tax-credit"],
      mensual: redondear(aPagar / 12),
      efectiva: (aPagar / entrada.ingreso) * 100,
      marginal: tasaMarginal(bandas, imponible),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "imponible", etiqueta: "Chargeable income", formato: "moneda" },
    { clave: "tramoBajo", etiqueta: "Tax at the lower rate", formato: "moneda" },
    { clave: "tramoAlto", etiqueta: "Tax at the higher rate", formato: "moneda", ocultarSiCero: true },
    { clave: "credito", etiqueta: "Tax credit", formato: "moneda" },
    { clave: "mensual", etiqueta: "Average tax a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
