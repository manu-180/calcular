import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseSsc, impuestoAnual, nad, noNegativo, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "na.net-salary-calculator",
  mercado: "na",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: {
    "na.income-tax-bands": "escala",
    "na.retirement-deduction-cap": "numero",
    "na.ssc-employee-rate": "numero",
    "na.ssc-ceiling": "numero",
    "na.ssc-floor": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary a month", min: 0, porDefecto: 20000 },
    {
      id: "asignaciones",
      tipo: "moneda",
      etiqueta: "Taxable allowances a month",
      min: 0,
      porDefecto: 0,
      ayuda: "Housing, transport and other cash allowances on your payslip.",
    },
    { id: "pension", tipo: "moneda", etiqueta: "Your pension or provident fund contribution a month", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic salary.", "basico");
    noNegativo(e.asignaciones, "asignaciones", "Allowances cannot be negative.");
    noNegativo(e.pension, "pension", "Your contribution cannot be negative.");
    const bruto = e.basico + e.asignaciones;
    if (e.pension >= bruto) throw new ErrorEntrada("Your pension contribution has to be less than your pay.", "pension");
    const tope = v["na.retirement-deduction-cap"];
    const deduccion = Math.min(e.pension * 12, tope);
    const gravable = bruto * 12 - deduccion;
    const paye = redondear(impuestoAnual(v["na.income-tax-bands"], gravable) / 12);
    const ssc = redondear(porcentaje(baseSsc(e.basico, v["na.ssc-floor"], v["na.ssc-ceiling"]), v["na.ssc-employee-rate"]));
    const neto = redondear(bruto - paye - ssc - e.pension);
    const observaciones: string[] = [];
    if (e.basico > v["na.ssc-ceiling"]) {
      observaciones.push(`Social Security is worked out on ${nad(v["na.ssc-ceiling"])}, the monthly ceiling, not on your full basic salary.`);
    }
    if (e.pension * 12 > tope) observaciones.push(`Only ${nad(tope)} a year of your pension contribution lowers your tax.`);
    return {
      neto,
      bruto,
      paye,
      ssc,
      pension: e.pension,
      netoAnual: redondear(neto * 12),
      marginal: tasaMarginal(v["na.income-tax-bands"], gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay a month", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "ssc", etiqueta: "Social Security", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension or provident fund", formato: "moneda", ocultarSiCero: true },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 0 },
  ],
  mundo: { bruto: "basico", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { asignaciones: 0, pension: 0 } },
});
