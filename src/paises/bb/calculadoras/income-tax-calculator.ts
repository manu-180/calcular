import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { paye } from "../lib/nomina";

export default definirCalculadora({
  id: "bb.income-tax-calculator",
  mercado: "bb",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "bb.income-tax": "escala",
    "bb.personal-allowance": "numero",
    "bb.cic-income-limit": "numero",
    "bb.cic-max": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Employment income for the year", min: 0, porDefecto: 60000, ayuda: "Salary, wages and taxable allowances before any deduction." },
    {
      id: "cic",
      tipo: "si-no",
      etiqueta: "I am an employee (not self-employed or a company director)",
      porDefecto: true,
      ayuda: "Only employees can claim the Compensatory Income Credit.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your income for the year.", "ingreso");
    const p = paye(e.ingreso, v["bb.personal-allowance"], v["bb.income-tax"], 1, redondear);
    const califica = e.cic && e.ingreso <= v["bb.cic-income-limit"];
    const credito = califica ? Math.min(p.total, v["bb.cic-max"]) : 0;
    const neto = redondear(p.total - credito);
    const observaciones: string[] = [];
    if (credito > 0) observaciones.push("Your employer still deducts PAYE during the year. You get the credit back as a refund when you file your income tax return.");
    if (e.cic && e.ingreso > v["bb.cic-income-limit"]) observaciones.push("Your income is above the limit for the Compensatory Income Credit, so no credit applies.");
    return {
      neto,
      imponible: p.imponible,
      bajo: p.bajo,
      alto: p.alto,
      bruto: p.total,
      credito,
      mensual: redondear(neto / 12),
      efectiva: (neto / e.ingreso) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Income tax for the year after credits", formato: "moneda", destacada: true },
    { clave: "imponible", etiqueta: "Taxable income after the personal allowance", formato: "moneda" },
    { clave: "bajo", etiqueta: "Tax at the lower rate", formato: "moneda" },
    { clave: "alto", etiqueta: "Tax at the higher rate", formato: "moneda", ocultarSiCero: true },
    { clave: "bruto", etiqueta: "Tax before the Compensatory Income Credit", formato: "moneda" },
    { clave: "credito", etiqueta: "Compensatory Income Credit", formato: "moneda" },
    { clave: "mensual", etiqueta: "Average per month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
  ],
});
