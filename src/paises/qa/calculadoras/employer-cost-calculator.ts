import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGrsia, CAMPO_QATARI, REQUIERE_APORTES, salarioCotizacion } from "../lib/aportes";

export default definirCalculadora({
  id: "qa.employer-cost-calculator",
  mercado: "qa",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_APORTES, "qa.gratuity-weeks": "numero" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 10000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "Monthly housing allowance", min: 0, porDefecto: 3000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly allowances", min: 0, porDefecto: 1000 },
    { ...CAMPO_QATARI, etiqueta: "The employee is a Qatari national insured with GRSIA" },
    { id: "social", tipo: "moneda", etiqueta: "Monthly social allowance", min: 0, porDefecto: 0, visibleSi: { qatari: [true] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter the monthly basic salary.", "basico");
    const social = entrada.social ?? 0;
    const bruto = entrada.basico + entrada.vivienda + entrada.otros + social;
    const observaciones: string[] = [];
    let grsia = 0;
    let provision = 0;
    if (entrada.qatari) {
      const c = salarioCotizacion(entrada.basico, social, entrada.vivienda, v["qa.social-insurance-caps"]);
      grsia = redondear(aportesGrsia(c.base, v["qa.social-insurance"]).empleador);
      observaciones.push("For a Qatari employee, the employer pays its GRSIA share every month.");
    } else {
      // Art. 54: la gratificación mínima son 3 semanas de básico por año; se reparte por mes (básico × 12 ÷ 52 × 3 ÷ 12).
      provision = redondear((entrada.basico * 12) / 52 * v["qa.gratuity-weeks"] / 12);
      observaciones.push("For an expatriate, there's no social insurance. The provision sets aside the minimum end-of-service gratuity month by month.");
    }
    observaciones.push("Recruitment, visa, medical insurance, flights and housing provided in kind aren't included.");
    const mensual = redondear(bruto + grsia + provision);
    return { mensual, bruto: redondear(bruto), grsia, provision, anual: redondear(mensual * 12), observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly cost to the employer", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross monthly salary", formato: "moneda" },
    { clave: "grsia", etiqueta: "Employer's GRSIA contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "provision", etiqueta: "Monthly gratuity provision", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Yearly cost to the employer", formato: "moneda" },
  ],
});
