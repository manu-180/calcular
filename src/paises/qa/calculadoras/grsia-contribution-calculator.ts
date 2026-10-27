import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGrsia, REQUIERE_APORTES, salarioCotizacion } from "../lib/aportes";

export default definirCalculadora({
  id: "qa.grsia-contribution-calculator",
  mercado: "qa",
  concepto: "aportes-seguridad-social",
  slug: "grsia-contribution-calculator",
  estado: "publicado",
  requiere: REQUIERE_APORTES,
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 25000 },
    { id: "social", tipo: "moneda", etiqueta: "Monthly social allowance", min: 0, porDefecto: 3000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "Monthly housing allowance", ayuda: "If your employer provides housing instead, enter the value of that benefit.", min: 0, porDefecto: 7000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    const c = salarioCotizacion(entrada.basico, entrada.social, entrada.vivienda, v["qa.social-insurance-caps"]);
    const a = aportesGrsia(c.base, v["qa.social-insurance"]);
    const empleado = redondear(a.empleado);
    const empleador = redondear(a.empleador);
    const observaciones = ["These contributions apply to Qatari employees aged 18 or over in a permanent job of at least one year."];
    if (c.viviendaComputada < entrada.vivienda) observaciones.push("Only part of the housing allowance counts, because the law caps it.");
    if (c.topeAplicado) observaciones.push("The contribution salary is capped at the legal maximum.");
    return { base: redondear(c.base), empleado, empleador, total: redondear(empleado + empleador), anual: redondear((empleado + empleador) * 12), observaciones };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your monthly contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer's monthly contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to GRSIA each month", formato: "moneda" },
    { clave: "base", etiqueta: "Contribution salary", formato: "moneda" },
    { clave: "anual", etiqueta: "Total paid to GRSIA in a year", formato: "moneda" },
  ],
});
