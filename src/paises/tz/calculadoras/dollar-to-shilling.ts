import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.dollar-to-shilling",
  mercado: "tz",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-shilling",
  estado: "publicado",
  requiere: {
    "tz.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Tanzanian shillings" },
        { valor: "tzs", etiqueta: "Tanzanian shillings to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["tz.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      chelines: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "tzs" ? resultado : null,
      tasa,
      fecha: v["tz.usd"].fecha,
      observaciones: ["This is the Bank of Tanzania mean rate. Banks and bureaux de change add their own margin."],
    };
  },
  resultado: [
    { clave: "chelines", etiqueta: "Amount in Tanzanian shillings", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "BoT mean rate (TSh per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
