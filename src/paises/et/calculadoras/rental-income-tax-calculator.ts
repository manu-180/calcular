import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { deduccionTramo, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "et.rental-income-tax-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "rental-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "et.rental-income-tax": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable rental income for the year", min: 0, porDefecto: 100000, ayuda: "Rent received in the tax year less the expenses the law lets you deduct." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso < 0) throw new ErrorEntrada("The income cannot be negative.", "ingreso");
    const escala = v["et.rental-income-tax"];
    const impuesto = redondear(aplicarEscalaMarginal(escala, e.ingreso));
    return {
      impuesto,
      despues: redondear(e.ingreso - impuesto),
      marginal: tasaMarginal(escala, e.ingreso),
      deduccion: redondear(deduccionTramo(escala, e.ingreso)),
      efectiva: e.ingreso > 0 ? (impuesto / e.ingreso) * 100 : 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Rental income tax for the year", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "marginal", etiqueta: "Tax rate of your band", formato: "porcentaje", decimales: 0 },
    { clave: "deduccion", etiqueta: "Deduction for your band", formato: "moneda", ayuda: "Income × band rate − this deduction gives the same tax." },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 1 },
  ],
});
