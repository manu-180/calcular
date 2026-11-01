import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.dollar-to-kwacha",
  mercado: "zm",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-kwacha",
  estado: "publicado",
  requiere: {
    "zm.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to kwacha" },
        { valor: "zmw", etiqueta: "Kwacha to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["zm.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      kwacha: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "zmw" ? resultado : null,
      tasa,
      fecha: v["zm.usd"].fecha,
      observaciones: ["This is the Bank of Zambia mid-rate. Banks and bureaux de change buy and sell at their own rates."],
    };
  },
  resultado: [
    { clave: "kwacha", etiqueta: "Amount in kwacha", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "BoZ mid-rate (kwacha per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
