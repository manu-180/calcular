import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "my.sst-calculator",
  mercado: "my",
  concepto: "iva",
  slug: "sst-calculator",
  estado: "publicado",
  requiere: {
    "my.sales-tax-rates": "mapa",
    "my.service-tax-rates": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tax",
      opciones: [
        { valor: "service-standard", etiqueta: "Service tax, standard rate" },
        { valor: "service-reduced", etiqueta: "Service tax, reduced rate (F&B, telco, parking, logistics, construction, healthcare, education)" },
        { valor: "sales-10", etiqueta: "Sales tax, 10% goods" },
        { valor: "sales-5", etiqueta: "Sales tax, 5% goods" },
      ],
      porDefecto: "service-standard",
    },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The amount",
      opciones: [
        { valor: "add", etiqueta: "Does not include SST (add it)" },
        { valor: "remove", etiqueta: "Already includes SST (take it out)" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount.", "importe");
    const tasa =
      entrada.tipo === "service-standard"
        ? enMapa(v["my.service-tax-rates"], "standard")
        : entrada.tipo === "service-reduced"
          ? enMapa(v["my.service-tax-rates"], "reduced")
          : enMapa(v["my.sales-tax-rates"], entrada.tipo === "sales-10" ? "10" : "5");
    const neto = entrada.modo === "add" ? entrada.importe : redondear(entrada.importe / (1 + tasa / 100));
    const impuesto = redondear((neto * tasa) / 100);
    return {
      total: redondear(neto + impuesto),
      impuesto,
      neto: redondear(neto),
      tasa,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Price with SST", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "SST", formato: "moneda" },
    { clave: "neto", etiqueta: "Price before SST", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
