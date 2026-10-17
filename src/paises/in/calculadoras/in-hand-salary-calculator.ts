import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoRenta, rupias } from "../lib/impuestos";

export default definirCalculadora({
  id: "in.in-hand-salary-calculator",
  mercado: "in",
  concepto: "sueldo-neto",
  slug: "in-hand-salary-calculator",
  estado: "publicado",
  requiere: {
    "in.new-regime-slabs": "escala",
    "in.old-regime-slabs": "escala",
    "in.surcharge-new": "escala",
    "in.surcharge-old": "escala",
    "in.standard-deduction-new": "numero",
    "in.standard-deduction-old": "numero",
    "in.rebate-new-limit": "numero",
    "in.rebate-new-max": "numero",
    "in.rebate-old-limit": "numero",
    "in.rebate-old-max": "numero",
    "in.cess": "numero",
    "in.section-123-limit": "numero",
    "in.epf-rate": "numero",
    "in.epf-wage-ceiling": "numero",
    "in.gratuity-days": "numero",
    "in.gratuity-divisor": "numero",
  },
  campos: [
    { id: "ctc", tipo: "moneda", etiqueta: "CTC (cost to company) a year", min: 0, porDefecto: 1200000 },
    { id: "basico", tipo: "porcentaje", etiqueta: "Basic salary as % of CTC", min: 1, max: 100, porDefecto: 50, ayuda: "Basic plus dearness allowance. Your offer letter shows it." },
    {
      id: "pf",
      tipo: "opcion",
      etiqueta: "How your employer works out PF",
      opciones: [
        { valor: "ceiling", etiqueta: "On basic up to the wage ceiling" },
        { valor: "full", etiqueta: "On the full basic" },
        { valor: "none", etiqueta: "No PF" },
      ],
      porDefecto: "ceiling",
    },
    { id: "gratuity", tipo: "si-no", etiqueta: "Gratuity is part of your CTC", porDefecto: true },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Tax regime",
      opciones: [
        { valor: "new", etiqueta: "New regime (default)" },
        { valor: "old", etiqueta: "Old regime" },
      ],
      porDefecto: "new",
    },
    { id: "profesional", tipo: "moneda", etiqueta: "Professional tax a year", min: 0, porDefecto: 0, ayuda: "Set by your state. Check your payslip." },
    { id: "otrasDeducciones", tipo: "moneda", etiqueta: "Old regime: other deductions a year", min: 0, porDefecto: 0, ayuda: "HRA exemption, other section 123 investments, health insurance and so on." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ctc <= 0) throw new ErrorEntrada("Enter your CTC for the year.", "ctc");
    const basicoAnual = porcentaje(entrada.ctc, entrada.basico);
    const basicoMes = basicoAnual / 12;
    const salarioPf = entrada.pf === "none" ? 0 : entrada.pf === "ceiling" ? Math.min(basicoMes, v["in.epf-wage-ceiling"]) : basicoMes;
    const pfMes = redondear(porcentaje(salarioPf, v["in.epf-rate"]));
    const pfEmpleadorAnual = pfMes * 12;
    const pfEmpleadoAnual = pfMes * 12;
    const gratuityAnual = entrada.gratuity ? redondear((basicoMes * v["in.gratuity-days"]) / v["in.gratuity-divisor"]) : 0;
    const bruto = entrada.ctc - pfEmpleadorAnual - gratuityAnual;
    if (bruto <= 0) throw new ErrorEntrada("PF and gratuity take up the whole CTC. Check the basic share.", "basico");

    const tablasNuevo = {
      slabs: v["in.new-regime-slabs"],
      surcharge: v["in.surcharge-new"],
      rebateLimit: v["in.rebate-new-limit"],
      rebateMax: v["in.rebate-new-max"],
      cess: v["in.cess"],
    };
    const tablasViejo = {
      slabs: v["in.old-regime-slabs"],
      surcharge: v["in.surcharge-old"],
      rebateLimit: v["in.rebate-old-limit"],
      rebateMax: v["in.rebate-old-max"],
      cess: v["in.cess"],
    };
    let gravable: number;
    if (entrada.regimen === "new") {
      gravable = Math.max(0, bruto - Math.min(bruto, v["in.standard-deduction-new"]));
    } else {
      const s123 = Math.min(pfEmpleadoAnual, v["in.section-123-limit"]);
      gravable = Math.max(0, bruto - Math.min(bruto, v["in.standard-deduction-old"]) - entrada.profesional - s123 - entrada.otrasDeducciones);
    }
    const impuesto = redondear(impuestoRenta(entrada.regimen, gravable, entrada.regimen === "new" ? tablasNuevo : tablasViejo).total);
    const neto = redondear(bruto - pfEmpleadoAnual - entrada.profesional - impuesto);

    const observaciones: string[] = [];
    if (entrada.pf === "ceiling" && basicoMes > v["in.epf-wage-ceiling"]) {
      observaciones.push(`PF is worked out on ${rupias(v["in.epf-wage-ceiling"])} a month, the wage ceiling, not on your full basic.`);
    }
    if (entrada.regimen === "new" && entrada.otrasDeducciones > 0) observaciones.push("Other deductions are ignored in the new regime.");
    observaciones.push("Tax is spread evenly over 12 months. Bonuses or arrears paid in one month change that month's TDS.");

    return {
      mensual: redondear(neto / 12),
      anual: neto,
      bruto: redondear(bruto),
      pfEmpleado: redondear(pfEmpleadoAnual),
      pfEmpleador: redondear(pfEmpleadorAnual),
      gratuity: gratuityAnual,
      impuesto,
      impuestoMes: redondear(impuesto / 12),
      profesional: redondear(entrada.profesional),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "In-hand salary a month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "In-hand salary a year", formato: "moneda" },
    { clave: "bruto", etiqueta: "Gross salary a year", formato: "moneda" },
    { clave: "pfEmpleador", etiqueta: "Employer PF (inside CTC)", formato: "moneda", ocultarSiCero: true },
    { clave: "gratuity", etiqueta: "Gratuity provision (inside CTC)", formato: "moneda", ocultarSiCero: true },
    { clave: "pfEmpleado", etiqueta: "Your PF contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "profesional", etiqueta: "Professional tax", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Income tax a year (TDS)", formato: "moneda" },
    { clave: "impuestoMes", etiqueta: "Income tax a month", formato: "moneda" },
  ],
});
