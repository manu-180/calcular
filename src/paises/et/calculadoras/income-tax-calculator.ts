import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { deduccionTramo, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "et.income-tax-calculator",
  mercado: "et",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "et.employment-income-tax": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable employment income for the month", min: 0, porDefecto: 15000, ayuda: "Salary plus taxable allowances and benefits, before any deduction." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso < 0) throw new ErrorEntrada("The income cannot be negative.", "ingreso");
    const bandas = v["et.employment-income-tax"];
    const impuesto = redondear(aplicarEscalaMarginal(bandas, e.ingreso));
    return {
      impuesto,
      despues: redondear(e.ingreso - impuesto),
      marginal: tasaMarginal(bandas, e.ingreso),
      deduccion: redondear(deduccionTramo(bandas, e.ingreso)),
      efectiva: e.ingreso > 0 ? (impuesto / e.ingreso) * 100 : 0,
      anual: redondear(impuesto * 12),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the month", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Income after tax (before pension)", formato: "moneda" },
    { clave: "marginal", etiqueta: "Tax rate of your band", formato: "porcentaje", decimales: 0 },
    { clave: "deduccion", etiqueta: "Deduction for your band", formato: "moneda", ayuda: "Income × band rate − this deduction gives the same tax." },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "anual", etiqueta: "Income tax over 12 months", formato: "moneda" },
  ],
});
