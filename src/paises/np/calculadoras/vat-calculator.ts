import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.vat-calculator",
  mercado: "np",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: { "np.vat": "numero" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price without VAT" },
        { valor: "remove", etiqueta: "Take VAT out of a price that includes it" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "importe");
    const tasa = v["np.vat"];
    if (e.modo === "add") {
      const iva = redondear(porcentaje(e.importe, tasa));
      return { neto: e.importe, iva, total: redondear(e.importe + iva), tasa };
    }
    const neto = redondear(e.importe / (1 + tasa / 100));
    return { neto, iva: redondear(e.importe - neto), total: e.importe, tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price before VAT", formato: "moneda" },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
