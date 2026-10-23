import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.vat-calculator",
  mercado: "tz",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "tz.vat": "numero",
    "tz.vat-electronic": "numero",
    "tz.vat-threshold": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
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
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Rate",
      opciones: [
        { valor: "standard", etiqueta: "Standard rate" },
        { valor: "electronic", etiqueta: "Paid electronically by an individual not registered for VAT" },
      ],
      porDefecto: "standard",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "importe");
    const tasa = e.tasa === "standard" ? v["tz.vat"] : v["tz.vat-electronic"];
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
