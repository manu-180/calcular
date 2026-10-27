import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.capital-gains-tax",
  mercado: "bw",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "bw.cgt-individual": "escala",
    "bw.wht-non-resident": "mapa",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "What you sold the asset for", min: 0, porDefecto: 900000 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Cost of the asset",
      min: 0,
      porDefecto: 600000,
      ayuda: "What the asset cost you. For property held more than a year, parts of the cost can be adjusted for inflation.",
    },
    { id: "otras", tipo: "moneda", etiqueta: "Other capital gains this tax year", min: 0, porDefecto: 0 },
    { id: "perdidas", tipo: "moneda", etiqueta: "Capital losses this year and from last year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const ganancia = entrada.venta - entrada.costo;
    const neta = Math.max(0, ganancia + entrada.otras - entrada.perdidas);
    const total = impuesto(v["bw.cgt-individual"], neta);
    const sinEsta = impuesto(v["bw.cgt-individual"], Math.max(0, entrada.otras - entrada.perdidas));
    const observaciones: string[] = [];
    if (ganancia + entrada.otras - entrada.perdidas < 0) {
      observaciones.push("You have a net loss. You can carry it forward to reduce your gains next tax year, but only for one year.");
    }
    return {
      impuesto: redondear(total),
      ganancia: redondear(ganancia),
      neta: redondear(neta),
      atribuible: redondear(total - sinEsta),
      efectiva: neta > 0 ? (total / neta) * 100 : 0,
      marginal: neta > 0 ? tasaMarginal(v["bw.cgt-individual"], neta) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax for the year", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Gain on this sale", formato: "moneda" },
    { clave: "neta", etiqueta: "Net aggregate gain", formato: "moneda" },
    { clave: "atribuible", etiqueta: "Tax due to this sale", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average rate on your net gain", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Marginal rate", formato: "porcentaje", decimales: 2 },
  ],
});
