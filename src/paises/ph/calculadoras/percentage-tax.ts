import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { peso } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.percentage-tax",
  mercado: "ph",
  concepto: "propio",
  slug: "percentage-tax",
  estado: "publicado",
  requiere: {
    "ph.percentage-tax-rate": "numero",
    "ph.vat-threshold": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Gross sales or receipts for the quarter", min: 0, porDefecto: 250000 },
    { id: "anuales", tipo: "moneda", etiqueta: "Expected gross sales for the whole year", min: 0, requerido: false, ayuda: "Optional. Used to check that you stay under the VAT threshold." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your gross sales or receipts for the quarter.", "ventas");
    const tasa = v["ph.percentage-tax-rate"];
    const impuesto = redondear(porcentaje(entrada.ventas, tasa));
    const observaciones: string[] = [];
    const anual = entrada.anuales ?? entrada.ventas * 4;
    if (anual > v["ph.vat-threshold"]) {
      observaciones.push(`At this pace your sales go above the ${peso(v["ph.vat-threshold"])} VAT threshold. Percentage tax only applies to sales up to that amount.`);
    }
    observaciones.push("If you chose the 8% income tax option, you do not pay percentage tax.");
    return {
      impuesto,
      tasa,
      neto: redondear(entrada.ventas - impuesto),
      anual: redondear(porcentaje(anual, tasa)),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Percentage tax for the quarter", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
    { clave: "neto", etiqueta: "Sales after percentage tax", formato: "moneda" },
    { clave: "anual", etiqueta: "Estimated percentage tax for the year", formato: "moneda" },
  ],
});
