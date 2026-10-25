import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseNsf, csg, DEPENDIENTES, payeMensual, REQUIERE_CSG, REQUIERE_NSF, REQUIERE_PAYE, tasasCsg, topesNsf } from "../lib/nomina";

export default definirCalculadora({
  id: "mu.salary-calculator",
  mercado: "mu",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_PAYE, ...REQUIERE_CSG, ...REQUIERE_NSF },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 40000, ayuda: "Your basic wage, salary compensation included. Leave out overtime and allowances." },
    { id: "extras", tipo: "moneda", etiqueta: "Overtime and taxable allowances this month", min: 0, porDefecto: 0, ayuda: "They count for PAYE but not for CSG or NSF." },
    { id: "dependientes", tipo: "opcion", etiqueta: "Dependents you claim in your EDF", opciones: DEPENDIENTES, porDefecto: "0" },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Other reliefs and deductions in your EDF for the year", min: 0, porDefecto: 0, ayuda: "For example medical insurance premiums or interest on a housing loan." },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    const c = csg(e.basico, tasasCsg(v));
    const csgEmpleado = redondear(c.empleado);
    const nsf = redondear(porcentaje(baseNsf(e.basico, topesNsf(v)), v["mu.nsf-employee"]));
    const deducciones = enMapa(v["mu.dependent-deduction"], e.dependientes) + e.otrasDeducciones;
    const p = payeMensual(e.basico + e.extras, deducciones, v["mu.income-tax-bands"], v["mu.paye-pay-periods"]);
    const bruto = redondear(e.basico + e.extras);
    const totalDeducido = redondear(csgEmpleado + nsf + p.mensual);
    const neto = redondear(bruto - totalDeducido);
    return {
      neto,
      paye: p.mensual,
      csg: csgEmpleado,
      tasaCsg: c.tasaEmpleado,
      nsf,
      totalDeducido,
      bruto,
      marginal: p.marginal,
      porcentajeNeto: (neto / bruto) * 100,
      observaciones: ["PAYE is worked out the way MRA does it, over 13 pay periods (12 months and the end of year bonus). A month with irregular pay can show a different figure."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "csg", etiqueta: "CSG", formato: "moneda" },
    { clave: "tasaCsg", etiqueta: "CSG rate on your basic salary", formato: "porcentaje", decimales: 1 },
    { clave: "nsf", etiqueta: "NSF", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "bruto", etiqueta: "Gross pay for the month", formato: "moneda" },
    { clave: "marginal", etiqueta: "Income tax rate on your next rupee", formato: "porcentaje", decimales: 0 },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "basico", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", pagasAnuales: 13 },
});
