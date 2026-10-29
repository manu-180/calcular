import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.dollar-rate-in-nepal",
  mercado: "np",
  concepto: "tipo-de-cambio",
  slug: "dollar-rate-in-nepal",
  estado: "publicado",
  requiere: { "np.usd": "serie", "np.usd-sell": "serie" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Nepali rupees (you sell dollars)" },
        { valor: "npr", etiqueta: "Nepali rupees to US dollars (you buy dollars)" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const compra = v["np.usd"].valor;
    const venta = v["np.usd-sell"].valor;
    return {
      rupias: e.sentido === "usd" ? redondear(e.monto * compra) : null,
      dolares: e.sentido === "npr" ? redondear(e.monto / venta) : null,
      compra,
      venta,
      fecha: v["np.usd"].fecha,
      observaciones: ["Banks and money changers use their own rates, which can differ from the Nepal Rastra Bank reference."],
    };
  },
  resultado: [
    { clave: "rupias", etiqueta: "Amount in Nepali rupees", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "compra", etiqueta: "NRB buying rate (NPR per US$)", formato: "numero", decimales: 2 },
    { clave: "venta", etiqueta: "NRB selling rate (NPR per US$)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
