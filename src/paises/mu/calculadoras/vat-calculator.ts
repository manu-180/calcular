import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.vat-calculator",
  mercado: "mu",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "mu.vat": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "What do you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price without VAT" },
        { valor: "remove", etiqueta: "Take VAT out of a price with VAT" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const tasa = v["mu.vat"];
    if (e.sentido === "add") {
      const iva = redondear(porcentaje(e.importe, tasa));
      return { conIva: redondear(e.importe + iva), iva, sinIva: redondear(e.importe), tasa };
    }
    const sinIva = redondear(e.importe / (1 + tasa / 100));
    return { conIva: redondear(e.importe), iva: redondear(e.importe - sinIva), sinIva, tasa };
  },
  resultado: [
    { clave: "conIva", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "sinIva", etiqueta: "Price excluding VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
