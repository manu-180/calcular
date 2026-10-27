import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, nad, noNegativo, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "na.pension-tax-deduction-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "pension-tax-deduction-calculator",
  estado: "publicado",
  requiere: {
    "na.income-tax-bands": "escala",
    "na.retirement-deduction-cap": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income a year before contributions", min: 0, porDefecto: 480000 },
    { id: "pension", tipo: "moneda", etiqueta: "Pension or provident fund contributions a year", min: 0, porDefecto: 36000 },
    { id: "anualidad", tipo: "moneda", etiqueta: "Retirement annuity contributions a year", min: 0, porDefecto: 0 },
    { id: "educacion", tipo: "moneda", etiqueta: "Education policy premiums a year", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter your taxable income.", "ingreso");
    noNegativo(e.pension, "pension", "Contributions cannot be negative.");
    noNegativo(e.anualidad, "anualidad", "Contributions cannot be negative.");
    noNegativo(e.educacion, "educacion", "Premiums cannot be negative.");
    const escala = v["na.income-tax-bands"];
    const tope = v["na.retirement-deduction-cap"];
    const aportes = e.pension + e.anualidad + e.educacion;
    const deduccion = Math.min(aportes, tope, e.ingreso);
    const antes = redondear(impuestoAnual(escala, e.ingreso));
    const despues = redondear(impuestoAnual(escala, e.ingreso - deduccion));
    const ahorro = redondear(antes - despues);
    const espacio = Math.max(0, tope - aportes);
    const observaciones: string[] = [];
    if (aportes > tope) observaciones.push(`You are contributing ${nad(aportes - tope)} more than the yearly cap. That part does not lower your tax.`);
    else if (antes > 0) observaciones.push(`You can still deduct up to ${nad(espacio)} more this tax year.`);
    return {
      ahorro,
      deduccion: redondear(deduccion),
      antes,
      despues,
      espacio: redondear(espacio),
      marginal: tasaMarginal(escala, e.ingreso - deduccion),
      observaciones,
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "Tax you save a year", formato: "moneda", destacada: true },
    { clave: "deduccion", etiqueta: "Deduction allowed", formato: "moneda" },
    { clave: "antes", etiqueta: "Tax without the deduction", formato: "moneda" },
    { clave: "despues", etiqueta: "Tax with the deduction", formato: "moneda" },
    { clave: "espacio", etiqueta: "Room left under the cap", formato: "moneda" },
    { clave: "marginal", etiqueta: "Marginal rate after the deduction", formato: "porcentaje", decimales: 0 },
  ],
});
