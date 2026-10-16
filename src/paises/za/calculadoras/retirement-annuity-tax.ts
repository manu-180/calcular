import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { deduccionRetiro, impuestoNeto, OPCIONES_EDAD, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.retirement-annuity-tax",
  mercado: "za",
  concepto: "propio",
  slug: "retirement-annuity-tax",
  estado: "publicado",
  requiere: {
    "za.income-tax-bands": "escala",
    "za.tax-rebates": "mapa",
    "za.retirement-deduction-rate": "numero",
    "za.retirement-deduction-cap": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the year before the contribution", min: 0, porDefecto: 600000 },
    { id: "aporte", tipo: "moneda", etiqueta: "Retirement fund contributions for the year", min: 0, porDefecto: 60000, ayuda: "Pension, provident and retirement annuity contributions together, including what your employer pays for you." },
    { id: "edad", tipo: "opcion", etiqueta: "Your age", opciones: OPCIONES_EDAD, porDefecto: "under-65" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your taxable income.", "ingreso");
    const escala = v["za.income-tax-bands"];
    const deducible = redondear(deduccionRetiro(entrada.aporte, entrada.ingreso, v["za.retirement-deduction-rate"], v["za.retirement-deduction-cap"]));
    const sin = impuestoNeto(escala, v["za.tax-rebates"], entrada.edad, entrada.ingreso);
    const con = impuestoNeto(escala, v["za.tax-rebates"], entrada.edad, entrada.ingreso - deducible);
    const ahorro = redondear(sin - con);
    return {
      ahorro,
      deducible,
      arrastre: redondear(entrada.aporte - deducible),
      costoNeto: redondear(entrada.aporte - ahorro),
      limite: redondear(Math.min((entrada.ingreso * v["za.retirement-deduction-rate"]) / 100, v["za.retirement-deduction-cap"])),
      marginal: tasaMarginal(escala, entrada.ingreso),
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "Tax you save this year", formato: "moneda", destacada: true },
    { clave: "deducible", etiqueta: "Deductible this year", formato: "moneda" },
    { clave: "arrastre", etiqueta: "Carried forward to next year", formato: "moneda", ocultarSiCero: true },
    { clave: "costoNeto", etiqueta: "Real cost of your contributions after tax", formato: "moneda" },
    { clave: "limite", etiqueta: "Your deduction limit", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your marginal tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
