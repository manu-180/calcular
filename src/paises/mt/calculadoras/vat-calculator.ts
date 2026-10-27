import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.vat-calculator",
  mercado: "mt",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: { "mt.vat-rates": "mapa" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Price", min: 0, porDefecto: 100 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The price you entered",
      opciones: [
        { valor: "sin", etiqueta: "Does not include VAT (add VAT)" },
        { valor: "con", etiqueta: "Includes VAT (remove VAT)" },
      ],
      porDefecto: "sin",
    },
    { id: "tasa", tipo: "opcion-dato", dato: "mt.vat-rates", etiqueta: "VAT rate", porDefecto: "standard" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter a price above zero.", "importe");
    const tasa = enMapa(v["mt.vat-rates"], entrada.tasa);
    const neto = entrada.modo === "sin" ? redondear(entrada.importe) : redondear(entrada.importe / (1 + tasa / 100));
    const total = entrada.modo === "sin" ? redondear(neto * (1 + tasa / 100)) : redondear(entrada.importe);
    return { total, neto, iva: redondear(total - neto), tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Price including VAT", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price excluding VAT", formato: "moneda" },
    { clave: "iva", etiqueta: "VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate used", formato: "porcentaje", decimales: 0 },
  ],
});
