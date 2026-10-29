import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bw.vat-calculator",
  mercado: "bw",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "bw.vat": "numero",
    "bw.vat-registration-threshold": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price" },
        { valor: "remove", etiqueta: "Take VAT out of a price that includes it" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount above zero.", "importe");
    const tasa = v["bw.vat"];
    if (entrada.modo === "add") {
      const iva = redondear(porcentaje(entrada.importe, tasa));
      return { sinIva: entrada.importe, iva, conIva: redondear(entrada.importe + iva), tasa };
    }
    const sinIva = redondear(entrada.importe / (1 + tasa / 100));
    return { sinIva, iva: redondear(entrada.importe - sinIva), conIva: entrada.importe, tasa };
  },
  resultado: [
    { clave: "conIva", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "sinIva", etiqueta: "Price excluding VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
