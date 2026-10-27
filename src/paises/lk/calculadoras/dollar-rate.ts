import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.dollar-rate",
  mercado: "lk",
  concepto: "tipo-de-cambio",
  slug: "dollar-rate",
  estado: "publicado",
  requiere: {
    "lk.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Sri Lankan rupees" },
        { valor: "lkr", etiqueta: "Sri Lankan rupees to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["lk.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      rupias: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "lkr" ? resultado : null,
      tasa,
      fecha: v["lk.usd"].fecha,
      observaciones: ["This is the Central Bank indicative spot rate. Banks and money changers buy and sell at their own rates."],
    };
  },
  resultado: [
    { clave: "rupias", etiqueta: "Amount in Sri Lankan rupees", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "CBSL indicative rate (Rs. per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
