import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.vat-calculator",
  mercado: "sc",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: { "sc.vat-rate": "numero", "sc.vat-threshold": "numero", "sc.vat-voluntary-minimum": "numero" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price without VAT" },
        { valor: "remove", etiqueta: "Take VAT out of a price with VAT" },
      ],
      porDefecto: "add",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = v["sc.vat-rate"];
    if (e.modo === "add") {
      const iva = redondear(porcentaje(e.monto, tasa));
      return { neto: e.monto, iva, bruto: redondear(e.monto + iva), tasa };
    }
    const neto = redondear(e.monto / (1 + tasa / 100));
    return { neto, iva: redondear(e.monto - neto), bruto: e.monto, tasa };
  },
  resultado: [
    { clave: "neto", etiqueta: "Price without VAT", formato: "moneda" },
    { clave: "iva", etiqueta: "VAT", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Price with VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate used", formato: "porcentaje", decimales: 0 },
  ],
});
