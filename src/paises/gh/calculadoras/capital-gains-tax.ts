import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.capital-gains-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "gh.cgt-rate": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 100000 },
    { id: "costo", tipo: "moneda", etiqueta: "Cost of the asset (with improvements)", min: 0, porDefecto: 60000 },
    { id: "gastos", tipo: "moneda", etiqueta: "Legal fees and selling expenses", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const ganancia = Math.max(0, entrada.venta - entrada.costo - entrada.gastos);
    const impuesto = redondear(porcentaje(ganancia, v["gh.cgt-rate"]));
    return { impuesto, ganancia: redondear(ganancia), neto: redondear(entrada.venta - impuesto), tasa: v["gh.cgt-rate"] };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Net gain", formato: "moneda" },
    { clave: "neto", etiqueta: "Sale price after tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate for individuals", formato: "porcentaje", decimales: 0 },
  ],
});
