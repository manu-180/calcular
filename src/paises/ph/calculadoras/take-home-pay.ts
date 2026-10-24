import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, pagibig, peso, philhealth, REQUIERE_PAGIBIG, REQUIERE_PHILHEALTH, REQUIERE_SSS, sss, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.take-home-pay",
  mercado: "ph",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.thirteenth-month-exemption": "numero",
    ...REQUIERE_SSS,
    ...REQUIERE_PHILHEALTH,
    ...REQUIERE_PAGIBIG,
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 30000 },
    { id: "otrosGravables", tipo: "moneda", etiqueta: "Other taxable pay a month (allowances, commissions)", min: 0, porDefecto: 0 },
    {
      id: "minimo",
      tipo: "si-no",
      etiqueta: "I am a minimum wage earner",
      porDefecto: false,
      ayuda: "Tick this only if your pay is the statutory minimum wage for your region. That pay is exempt from income tax.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter a salary above zero.", "sueldo");
    const s = sss(entrada.sueldo, v);
    const ph = philhealth(entrada.sueldo, v, redondear);
    const pi = pagibig(entrada.sueldo, v, redondear);
    const sssEmpleado = redondear(s.empleado);
    const aportes = redondear(sssEmpleado + ph.empleado + pi.empleado);
    const gravable = entrada.minimo ? entrada.otrosGravables : Math.max(0, entrada.sueldo + entrada.otrosGravables - aportes);
    const impuesto = entrada.minimo && entrada.otrosGravables === 0 ? 0 : redondear(impuestoAnual(v["ph.income-tax-table"], gravable * 12) / 12);
    const bruto = entrada.sueldo + entrada.otrosGravables;
    const neto = redondear(bruto - aportes - impuesto);
    const observaciones = [
      "Withholding tax is worked out on the yearly tax table divided by 12. The BIR monthly table rounds its brackets, so your payslip can differ by a few centavos.",
    ];
    if (s.mpf > 0) observaciones.push(`Part of your SSS contribution (${peso(redondear(s.empleadoMpf))}) goes to your MySSS Pension Booster (MPF) account.`);
    return {
      neto,
      sss: sssEmpleado,
      philhealth: ph.empleado,
      pagibig: pi.empleado,
      impuesto,
      gravable: redondear(gravable),
      anual: redondear(neto * 12),
      marginal: tasaMarginal(v["ph.income-tax-table"], gravable * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda", destacada: true },
    { clave: "sss", etiqueta: "SSS contribution", formato: "moneda" },
    { clave: "philhealth", etiqueta: "PhilHealth contribution", formato: "moneda" },
    { clave: "pagibig", etiqueta: "Pag-IBIG contribution", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable pay a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Take-home pay a year (without 13th month)", formato: "moneda" },
    { clave: "marginal", etiqueta: "Your tax bracket", formato: "porcentaje", decimales: 0 },
  ],
});
