import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ae.tourist-vat-refund",
  mercado: "ae",
  concepto: "propio",
  slug: "tourist-vat-refund",
  estado: "publicado",
  requiere: {
    "ae.vat": "numero",
    "ae.tourist-refund": "mapa",
    "ae.tourist-refund-share": "numero",
  },
  campos: [
    { id: "compras", tipo: "moneda", etiqueta: "Total paid for tax-free purchases, VAT included", min: 0, porDefecto: 5000 },
    { id: "etiquetas", tipo: "entero", etiqueta: "Number of tax-free tags (receipts)", min: 1, max: 200, porDefecto: 2 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.compras <= 0) throw new ErrorEntrada("Enter what you paid.", "compras");
    const t = v["ae.tourist-refund"];
    const tasa = v["ae.vat"];
    const iva = (entrada.compras * tasa) / (100 + tasa);
    const comision = entrada.etiquetas * enMapa(t, "fee-per-tag");
    const reembolso = Math.max(0, porcentaje(iva, v["ae.tourist-refund-share"]) - comision);
    return {
      reembolso: redondear(reembolso),
      iva: redondear(iva),
      comision: redondear(comision),
      observaciones: [`Each purchase has to be at least AED ${enMapa(t, "minimum-purchase")} at a store in the scheme, and you validate the goods when you leave within 90 days.`],
    };
  },
  resultado: [
    { clave: "reembolso", etiqueta: "Estimated VAT refund", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT included in the purchases", formato: "moneda" },
    { clave: "comision", etiqueta: "Fees for the tax-free tags", formato: "moneda" },
  ],
});
