import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.vat-calculator",
  mercado: "ph",
  concepto: "iva",
  slug: "vat-calculator",
  estado: "publicado",
  requiere: {
    "ph.vat-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1120 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "inclusive", etiqueta: "VAT inclusive (remove VAT)" },
        { valor: "exclusive", etiqueta: "VAT exclusive (add VAT)" },
      ],
      porDefecto: "inclusive",
    },
    { id: "insumos", tipo: "moneda", etiqueta: "Input VAT on your purchases (optional)", min: 0, requerido: false, ayuda: "The VAT you paid on purchases in the same period." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = v["ph.vat-rate"];
    const neto = entrada.modo === "inclusive" ? entrada.monto / (1 + tasa / 100) : entrada.monto;
    const iva = redondear(entrada.modo === "inclusive" ? entrada.monto - neto : porcentaje(neto, tasa));
    const netoR = redondear(neto);
    return {
      iva,
      neto: netoR,
      total: redondear(netoR + iva),
      tasa,
      pagar: entrada.insumos === null ? null : redondear(iva - entrada.insumos),
    };
  },
  resultado: [
    { clave: "iva", etiqueta: "VAT (output tax)", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount without VAT", formato: "moneda" },
    { clave: "total", etiqueta: "Amount with VAT", formato: "moneda" },
    { clave: "tasa", etiqueta: "VAT rate", formato: "porcentaje", decimales: 0 },
    { clave: "pagar", etiqueta: "Output VAT minus input VAT", formato: "moneda" },
  ],
});
