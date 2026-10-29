import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.dollar-to-birr",
  mercado: "et",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-birr",
  estado: "publicado",
  requiere: {
    "et.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to birr" },
        { valor: "etb", etiqueta: "Birr to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "monto");
    const tasa = v["et.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      birr: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "etb" ? resultado : null,
      tasa,
      fecha: v["et.usd"].fecha,
      observaciones: ["This is the NBE indicative rate, a weighted average of the previous day's bank deals. Banks quote their own buying and selling rates."],
    };
  },
  resultado: [
    { clave: "birr", etiqueta: "Amount in birr", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "NBE indicative rate (birr per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
