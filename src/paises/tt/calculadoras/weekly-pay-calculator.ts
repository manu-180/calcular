import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aporteSemanal, claseNis, impuestoAnual, REQUIERE_NIS, REQUIERE_PAYE, REQUIERE_SURCHARGE, SEMANAS_POR_ANIO, surchargeSemanal } from "../lib/nomina";

export default definirCalculadora({
  id: "tt.weekly-pay-calculator",
  mercado: "tt",
  concepto: "propio",
  slug: "weekly-pay-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_NIS, ...REQUIERE_PAYE, ...REQUIERE_SURCHARGE },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross weekly wages", min: 0, porDefecto: 1500, ayuda: "Basic pay plus taxable allowances for the week." },
    { id: "mayor60", tipo: "si-no", etiqueta: "I am 60 or older", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross weekly wages.", "bruto");
    const escala = v["tt.nis-employee-weekly"];
    const nis = aporteSemanal(escala, e.bruto);
    const surcharge = e.mayor60 ? 0 : surchargeSemanal(e.bruto, false, v);
    const anual = impuestoAnual(e.bruto * SEMANAS_POR_ANIO, nis * SEMANAS_POR_ANIO, 0, 0, v);
    const paye = redondear(anual.impuesto / SEMANAS_POR_ANIO);
    const total = redondear(nis + surcharge + paye);
    const neto = redondear(e.bruto - total);
    const observaciones: string[] = ["PAYE is worked out on 52 weeks of these wages and spread evenly over the year."];
    if (claseNis(escala, e.bruto) === 0) observaciones.push("Your wages are below the lowest NIS earnings class, so the table has no contribution for them. Check with the NIBTT.");
    return { neto, nis, surcharge, paye, total, clase: claseNis(escala, e.bruto), netoAnual: redondear(neto * SEMANAS_POR_ANIO), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the week", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE (income tax)", formato: "moneda" },
    { clave: "nis", etiqueta: "NIS", formato: "moneda" },
    { clave: "surcharge", etiqueta: "Health Surcharge", formato: "moneda" },
    { clave: "total", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "clase", etiqueta: "NIS earnings class", formato: "numero", decimales: 0 },
    { clave: "netoAnual", etiqueta: "Take-home pay over 52 weeks", formato: "moneda" },
  ],
});
