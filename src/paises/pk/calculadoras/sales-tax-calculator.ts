import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.sales-tax-calculator",
  mercado: "pk",
  concepto: "iva",
  slug: "sales-tax-calculator",
  estado: "publicado",
  requiere: {
    "pk.sales-tax": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "What do you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add sales tax to a price" },
        { valor: "remove", etiqueta: "Remove sales tax from a price that includes it" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const tasa = v["pk.sales-tax"];
    const neto = entrada.sentido === "add" ? redondear(entrada.importe) : redondear(entrada.importe / (1 + tasa / 100));
    const impuesto = entrada.sentido === "add" ? redondear((entrada.importe * tasa) / 100) : redondear(entrada.importe - neto);
    return { bruto: redondear(neto + impuesto), impuesto, neto, tasa };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Price including sales tax", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Sales tax", formato: "moneda" },
    { clave: "neto", etiqueta: "Price before sales tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
