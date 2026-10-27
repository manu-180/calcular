import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ls.vat-calculator",
  mercado: "ls",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "ls.vat-rates": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The amount",
      opciones: [
        { valor: "sin", etiqueta: "Excludes VAT (add VAT)" },
        { valor: "con", etiqueta: "Includes VAT (remove VAT)" },
      ],
      porDefecto: "sin",
    },
    { id: "tasa", tipo: "opcion-dato", dato: "ls.vat-rates", etiqueta: "VAT rate", porDefecto: "standard" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = enMapa(v["ls.vat-rates"], entrada.tasa);
    const neto = entrada.modo === "sin" ? entrada.monto : entrada.monto / (1 + tasa / 100);
    const iva = redondear(entrada.modo === "sin" ? porcentaje(entrada.monto, tasa) : entrada.monto - neto);
    const sinIva = redondear(entrada.modo === "sin" ? entrada.monto : entrada.monto - iva);
    return { iva, sinIva, conIva: redondear(sinIva + iva), tasa };
  },
  resultado: [
    { clave: "iva", etiqueta: "VAT", formato: "moneda", destacada: true },
    { clave: "sinIva", etiqueta: "Price excluding VAT", formato: "moneda" },
    { clave: "conIva", etiqueta: "Price including VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
  ],
});
