import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import {
  aporteSemanal,
  claseNis,
  impuestoAnual,
  OPCIONES_LUNES,
  REQUIERE_NIS,
  REQUIERE_PAYE,
  REQUIERE_SURCHARGE,
  SEMANAS_POR_ANIO,
  semanasDelMes,
  surchargeSemanal,
} from "../lib/nomina";

export default definirCalculadora({
  id: "tt.salary-calculator",
  mercado: "tt",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_NIS, ...REQUIERE_PAYE, ...REQUIERE_SURCHARGE },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 15000, ayuda: "Basic pay plus taxable allowances, before any deduction." },
    {
      id: "lunes",
      tipo: "opcion",
      etiqueta: "Mondays in the pay month",
      opciones: OPCIONES_LUNES,
      porDefecto: "4",
      ayuda: "NIS and Health Surcharge are weekly amounts, charged once for every Monday in the month.",
    },
    {
      id: "pension",
      tipo: "moneda",
      etiqueta: "Your monthly contribution to an approved pension plan",
      min: 0,
      porDefecto: 0,
      ayuda: "Leave it at 0 if you are not in a company or approved private plan.",
    },
    { id: "mayor60", tipo: "si-no", etiqueta: "I am 60 or older", porDefecto: false, ayuda: "Health Surcharge is not deducted from people aged 60 and over." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    if (e.pension < 0 || e.pension >= e.bruto) throw new ErrorEntrada("Enter a pension contribution below your gross salary.", "pension");
    const semanas = semanasDelMes(e.lunes);
    const escala = v["tt.nis-employee-monthly"];
    const clase = claseNis(escala, e.bruto);
    const nisSemana = aporteSemanal(escala, e.bruto);
    const nis = redondear(nisSemana * semanas);
    const surchargeSemana = e.mayor60 ? 0 : surchargeSemanal(e.bruto, true, v);
    const surcharge = redondear(surchargeSemana * semanas);
    const anual = impuestoAnual(e.bruto * 12, nisSemana * SEMANAS_POR_ANIO, e.pension * 12, 0, v);
    const paye = redondear(anual.impuesto / 12);
    const pension = redondear(e.pension);
    const total = redondear(nis + surcharge + paye + pension);
    const neto = redondear(e.bruto - total);
    const observaciones: string[] = [];
    if (clase === 0) observaciones.push("Your pay is below the lowest NIS earnings class, so the table has no contribution for it. Check with the NIBTT.");
    if (paye === 0) observaciones.push("Your yearly income stays within the personal allowance and deductions, so no PAYE is due.");
    if (anual.impuestoAlto > 0) observaciones.push("Part of your chargeable income goes over the higher band, so that part is taxed at the higher rate.");
    observaciones.push("PAYE is worked out on a full year of this salary and spread over 12 months.");
    return {
      neto,
      paye,
      nis,
      surcharge,
      pension,
      total,
      clase,
      imponible: redondear(anual.imponible),
      netoAnual: redondear(e.bruto * 12 - (nisSemana + surchargeSemana) * SEMANAS_POR_ANIO - anual.impuesto - e.pension * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS", formato: "moneda" },
    { clave: "surcharge", etiqueta: "Health Surcharge", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "clase", etiqueta: "NIS earnings class", formato: "numero", decimales: 0 },
    { clave: "imponible", etiqueta: "Chargeable income for the year", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over a full year (52 weeks of NIS)", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { lunes: "promedio", pension: 0, mayor60: false } },
});
