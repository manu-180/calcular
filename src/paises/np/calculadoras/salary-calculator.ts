import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_IMPUESTO } from "../lib/nomina";

export default definirCalculadora({
  id: "np.salary-calculator",
  mercado: "np",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_IMPUESTO, "np.ssf-employer-rate": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 80000, ayuda: "Basic pay plus allowances, before any deduction." },
    { id: "ssf", tipo: "si-no", etiqueta: "You contribute to the Social Security Fund", porDefecto: true },
    { id: "basicoPct", tipo: "porcentaje", etiqueta: "Basic pay as a share of gross pay", min: 1, max: 100, porDefecto: 60, ayuda: "The Fund and the provident share are taken from basic pay only." },
    { id: "mujer", tipo: "si-no", etiqueta: "You are a woman and pay is your only income", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const basico = redondear(porcentaje(e.bruto, e.basicoPct));
    const r = impuestoAnual(
      { ingresoAnual: redondear(e.bruto * 12), ssf: e.ssf, basicoMensual: basico, aporteRetiroAnual: 0, remota: "none", seguroVida: 0, seguroSalud: 0, seguroCasa: 0, mujer: e.mujer },
      v,
      redondear,
    );
    const ssfMensual = e.ssf ? redondear(porcentaje(basico, v["np.ssf-employee-rate"])) : 0;
    const impuestoMensual = redondear(r.impuesto / 12);
    const neto = redondear(e.bruto - ssfMensual - impuestoMensual);
    return {
      neto,
      ssf: ssfMensual,
      impuesto: impuestoMensual,
      basico,
      totalDeducido: redondear(ssfMensual + impuestoMensual),
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
      observaciones: e.ssf ? [] : ["Without the Fund there is no 1% relief and no provident share to deduct. Check your payslip for any other contribution your employer takes."],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "basico", etiqueta: "Basic pay used", formato: "moneda" },
    { clave: "ssf", etiqueta: "Social Security Fund contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Income tax withheld", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
});
