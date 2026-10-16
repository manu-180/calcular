import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.vat-calculator",
  mercado: "ng",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "ng.vat": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "What do you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add VAT to a price" },
        { valor: "remove", etiqueta: "Remove VAT from a price that includes it" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const tasa = v["ng.vat"];
    const neto = entrada.sentido === "add" ? redondear(entrada.importe) : redondear(entrada.importe / (1 + tasa / 100));
    const iva = entrada.sentido === "add" ? redondear((entrada.importe * tasa) / 100) : redondear(entrada.importe - neto);
    return { bruto: redondear(neto + iva), iva, neto, tasa };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "neto", etiqueta: "Price before VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 1 },
  ],
});
