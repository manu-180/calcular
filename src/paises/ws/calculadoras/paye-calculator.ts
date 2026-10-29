import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoPaye, PERIODOS, PERIODOS_ANIO, REQUIERE_PAYE, tasaMarginal, wst } from "../lib/nomina";

export default definirCalculadora({
  id: "ws.paye-calculator",
  mercado: "ws",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: REQUIERE_PAYE,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay", min: 0, porDefecto: 1000, ayuda: "Salary or wages plus taxable allowances, overtime and bonuses." },
    { id: "periodo", tipo: "opcion", etiqueta: "Pay period", opciones: PERIODOS, porDefecto: "fortnight" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto < 0) throw new ErrorEntrada("Pay cannot be negative.", "bruto");
    const fort = v["ws.paye-fortnightly-bands"];
    const anual = v["ws.income-tax-bands"];
    const impuesto = redondear(impuestoPaye(e.bruto, e.periodo, fort, anual));
    const base = e.periodo === "fortnight" ? fort : anual;
    const baseMarginal = e.periodo === "month" ? e.bruto * 12 : e.bruto;
    const observaciones: string[] = [];
    if (e.periodo === "month") observaciones.push("The Ministry publishes the PAYE table by fortnight. Monthly pay is measured against the annual bands, so your employer's fortnightly deduction can differ by a few tala.");
    if (impuesto === 0 && e.bruto > 0) observaciones.push(`Your pay is inside the tax-free band, so your employer withholds no PAYE. Tax of ${wst(0)} still has to be reported in the monthly P4 return.`);
    return {
      impuesto,
      neto: redondear(e.bruto - impuesto),
      tasaEfectiva: e.bruto > 0 ? (impuesto / e.bruto) * 100 : 0,
      tasaMarginal: tasaMarginal(base, baseMarginal),
      impuestoAnual: redondear(impuesto * PERIODOS_ANIO[e.periodo]),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "PAYE for the period", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after PAYE", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Share of pay taken as tax", formato: "porcentaje", decimales: 1 },
    { clave: "tasaMarginal", etiqueta: "Tax rate on your next tala", formato: "porcentaje", decimales: 0 },
    { clave: "impuestoAnual", etiqueta: "PAYE over a year at this pay", formato: "moneda" },
  ],
});
