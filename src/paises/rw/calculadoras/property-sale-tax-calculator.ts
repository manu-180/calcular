import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.property-sale-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "property-sale-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.sale-tax-registered": "numero",
    "rw.sale-tax-other": "numero",
    "rw.sale-tax-allowance": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Sale value of the property", min: 0, porDefecto: 30000000 },
    {
      id: "vendedor",
      tipo: "opcion",
      etiqueta: "Seller",
      opciones: [
        { valor: "other", etiqueta: "Not registered for income tax" },
        { valor: "registered", etiqueta: "Registered for income tax, selling commercial property" },
      ],
      porDefecto: "other",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the sale value.", "valor");
    const tasa = e.vendedor === "registered" ? v["rw.sale-tax-registered"] : v["rw.sale-tax-other"];
    const base = Math.max(0, e.valor - v["rw.sale-tax-allowance"]);
    const impuesto = redondear(porcentaje(base, tasa));
    return { impuesto, base, tasa, neto: redondear(e.valor - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the sale", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Taxable part of the sale value", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 1 },
    { clave: "neto", etiqueta: "Sale value after the tax", formato: "moneda" },
  ],
});
