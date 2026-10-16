import { definirCalculadora } from "@/motor/calculo";
import { aportesEmpleado, impuestoAnual, PROVINCIAS, REQUIERE_RENTA, tasaMarginal, validarIngreso } from "../lib/impuestos";

const PERIODOS = { weekly: 52, biweekly: 26, "semi-monthly": 24, monthly: 12 } as const;

export default definirCalculadora({
  id: "ca.take-home-pay",
  mercado: "ca",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: REQUIERE_RENTA,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Annual salary before deductions", min: 0, porDefecto: 70000 },
    { id: "provincia", tipo: "opcion", etiqueta: "Province or territory where you live", opciones: PROVINCIAS, porDefecto: "on" },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "How often you are paid",
      opciones: [
        { valor: "weekly", etiqueta: "Weekly (52 pays)" },
        { valor: "biweekly", etiqueta: "Every two weeks (26 pays)" },
        { valor: "semi-monthly", etiqueta: "Twice a month (24 pays)" },
        { valor: "monthly", etiqueta: "Monthly (12 pays)" },
      ],
      porDefecto: "biweekly",
    },
    { id: "pension", tipo: "porcentaje", etiqueta: "Your RRSP or pension contribution through payroll (% of salary)", min: 0, max: 100, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.salario, "salario");
    const aportes = aportesEmpleado(entrada.salario, v, false, entrada.provincia === "qc");
    const aportePension = redondear((entrada.salario * entrada.pension) / 100);
    const base = { provincia: entrada.provincia, empleo: entrada.salario, otros: 0, deducciones: aportePension, aportes };
    const r = impuestoAnual(base, v);
    const federal = redondear(r.federal);
    const provincial = redondear(r.provincial);
    const cpp = redondear(aportes.cpp);
    const cpp2 = redondear(aportes.cpp2);
    const ei = redondear(aportes.ei);
    const qpip = redondear(aportes.qpip);
    const anual = redondear(entrada.salario - federal - provincial - cpp - cpp2 - ei - qpip - aportePension);
    const pagos = PERIODOS[entrada.periodo];
    return {
      anual,
      porPago: redondear(anual / pagos),
      mensual: redondear(anual / 12),
      federal,
      provincial,
      cpp,
      cpp2,
      ei,
      qpip,
      aportePension,
      marginal: redondear(tasaMarginal(base, v)),
      observaciones: [
        "Your payslip can differ by a few dollars each pay, because payroll spreads the CPP and EI maximums and the tax credits over the year.",
        ...(entrada.provincia === "qc" ? ["In Quebec the federal tax already takes off the 16.5% Quebec abatement, and Quebec tax only counts the basic personal amount and the deduction for workers."] : []),
      ],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "porPago", etiqueta: "Take-home pay each pay", formato: "moneda" },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "federal", etiqueta: "Federal income tax", formato: "moneda" },
    { clave: "provincial", etiqueta: "Provincial or territorial income tax", formato: "moneda" },
    { clave: "cpp", etiqueta: "CPP contributions (QPP in Quebec)", formato: "moneda" },
    { clave: "cpp2", etiqueta: "Second CPP or QPP contributions", formato: "moneda", ocultarSiCero: true },
    { clave: "ei", etiqueta: "EI premiums", formato: "moneda" },
    { clave: "qpip", etiqueta: "QPIP premiums", formato: "moneda", ocultarSiCero: true },
    { clave: "aportePension", etiqueta: "Your RRSP or pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 2 },
  ],
});
