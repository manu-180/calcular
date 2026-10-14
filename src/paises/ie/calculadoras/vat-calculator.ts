import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.vat-calculator",
  mercado: "ie",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "ie.vat-rates": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "What do you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price without VAT" },
        { valor: "remove", etiqueta: "Take VAT out of a price including VAT" },
      ],
      porDefecto: "add",
    },
    { id: "tasa", tipo: "opcion-dato", dato: "ie.vat-rates", etiqueta: "VAT rate", porDefecto: "standard" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const tasa = enMapa(v["ie.vat-rates"], entrada.tasa);
    if (entrada.sentido === "add") {
      const iva = redondear((entrada.importe * tasa) / 100);
      return { neto: redondear(entrada.importe), iva, bruto: redondear(entrada.importe + iva), tasa };
    }
    const neto = redondear(entrada.importe / (1 + tasa / 100));
    return { neto, iva: redondear(entrada.importe - neto), bruto: redondear(entrada.importe), tasa };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "neto", etiqueta: "Price excluding VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate used", formato: "porcentaje", decimales: 1 },
  ],
});
