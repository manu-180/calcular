import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "na.usd-to-nad",
  mercado: "na",
  concepto: "tipo-de-cambio",
  slug: "usd-to-nad",
  estado: "publicado",
  requiere: {
    "na.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Namibia dollars" },
        { valor: "nad", etiqueta: "Namibia dollars to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "monto");
    const tasa = v["na.usd"].valor;
    return {
      nad: e.sentido === "usd" ? redondear(e.monto * tasa) : null,
      dolares: e.sentido === "nad" ? redondear(e.monto / tasa) : null,
      tasa,
      fecha: v["na.usd"].fecha,
      observaciones: ["This is the Bank of Namibia rate of the day. Banks and bureaux quote their own buying and selling rates."],
    };
  },
  resultado: [
    { clave: "nad", etiqueta: "Amount in Namibia dollars", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Bank of Namibia rate (N$ per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
