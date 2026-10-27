import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aportesGrsia, CAMPO_QATARI, REQUIERE_APORTES, salarioCotizacion } from "../lib/aportes";

export default definirCalculadora({
  id: "qa.take-home-pay",
  mercado: "qa",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: { ...REQUIERE_APORTES, "qa.salary-income-tax": "numero" },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 12000 },
    { id: "vivienda", tipo: "moneda", etiqueta: "Monthly housing allowance", min: 0, porDefecto: 4000 },
    { id: "otros", tipo: "moneda", etiqueta: "Other monthly allowances", ayuda: "Transport, phone or any other allowance paid with your salary.", min: 0, porDefecto: 1000 },
    CAMPO_QATARI,
    {
      id: "social",
      tipo: "moneda",
      etiqueta: "Monthly social allowance",
      ayuda: "Counts towards the GRSIA contribution salary together with the basic salary and the housing allowance.",
      min: 0,
      porDefecto: 0,
      visibleSi: { qatari: [true] },
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    const social = entrada.social ?? 0;
    const bruto = entrada.basico + entrada.vivienda + entrada.otros + social;
    const impuesto = redondear(porcentaje(bruto, v["qa.salary-income-tax"]));
    const observaciones: string[] = [];
    let aporte = 0;
    let base = 0;
    if (entrada.qatari) {
      const c = salarioCotizacion(entrada.basico, social, entrada.vivienda, v["qa.social-insurance-caps"]);
      base = redondear(c.base);
      aporte = redondear(aportesGrsia(c.base, v["qa.social-insurance"]).empleado);
      if (c.viviendaComputada < entrada.vivienda) observaciones.push("Only part of your housing allowance counts for GRSIA, because the law caps it.");
      if (c.topeAplicado) observaciones.push("Your contribution is worked out on the maximum contribution salary.");
      observaciones.push("Your employer pays its own GRSIA share on top. It doesn't come out of your pay.");
    } else {
      observaciones.push("Expatriate employees don't pay social insurance, and Qatar doesn't tax salaries, so your take-home pay matches your gross pay.");
    }
    observaciones.push("Loan instalments, advances or other deductions in your contract aren't included.");
    const neto = redondear(bruto - aporte - impuesto);
    return { neto, bruto: redondear(bruto), base, aporte, anual: redondear(neto * 12), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Monthly take-home pay", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross monthly salary", formato: "moneda" },
    { clave: "base", etiqueta: "GRSIA contribution salary", formato: "moneda", ocultarSiCero: true },
    { clave: "aporte", etiqueta: "Your GRSIA contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
  ],
  mundo: {
    bruto: "basico",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { vivienda: 0, otros: 0, qatari: true, social: 0 },
  },
});
