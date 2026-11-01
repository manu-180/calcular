import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.capital-gains-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.cgt-rate": "numero",
  },
  campos: [
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 10000000 },
    { id: "costo", tipo: "moneda", etiqueta: "What you paid for the asset", min: 0, porDefecto: 6000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.venta <= 0) throw new ErrorEntrada("Enter the sale price.", "venta");
    const ganancia = Math.max(0, e.venta - e.costo);
    const impuesto = redondear(porcentaje(ganancia, v["rw.cgt-rate"]));
    const observaciones = ganancia === 0 ? ["There is no gain, so no capital gains tax is due."] : [];
    return { impuesto, ganancia, neto: redondear(e.venta - impuesto), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda" },
    { clave: "neto", etiqueta: "Sale price after the tax", formato: "moneda" },
  ],
});
