import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DEPENDIENTES, payeMensual, REQUIERE_PAYE } from "../lib/nomina";

export default definirCalculadora({
  id: "mu.paye-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: REQUIERE_PAYE,
  campos: [
    { id: "emolumentos", tipo: "moneda", etiqueta: "Monthly emoluments", min: 0, porDefecto: 75000, ayuda: "Salary, taxable allowances, overtime and fringe benefits for a normal month." },
    { id: "dependientes", tipo: "opcion", etiqueta: "Dependents claimed in your EDF", opciones: DEPENDIENTES, porDefecto: "0" },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Other reliefs and deductions in your EDF for the year", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.emolumentos <= 0) throw new ErrorEntrada("Enter your monthly emoluments.", "emolumentos");
    const periodos = v["mu.paye-pay-periods"];
    const deducciones = enMapa(v["mu.dependent-deduction"], e.dependientes) + e.otrasDeducciones;
    const p = payeMensual(e.emolumentos, deducciones, v["mu.income-tax-bands"], periodos);
    const umbral = v["mu.income-tax-bands"][0].hasta ?? 0;
    return {
      paye: p.mensual,
      payeAnual: redondear(p.mensual * periodos),
      gravable: redondear(p.anualGravable),
      deducciones: redondear(deducciones),
      marginal: p.marginal,
      efectiva: (p.mensual / e.emolumentos) * 100,
      exento: redondear((umbral + deducciones) / periodos),
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE to withhold each month", formato: "moneda", destacada: true },
    { clave: "payeAnual", etiqueta: "PAYE over the 13 pay periods", formato: "moneda" },
    { clave: "gravable", etiqueta: "Chargeable income for the year", formato: "moneda" },
    { clave: "deducciones", etiqueta: "EDF deductions for the year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Tax rate on your next rupee", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "PAYE as a share of your pay", formato: "porcentaje", decimales: 1 },
    { clave: "exento", etiqueta: "Monthly pay you could earn with no PAYE", formato: "moneda" },
  ],
});
