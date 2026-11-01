import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.dollar-to-kwacha",
  mercado: "mw",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-kwacha",
  estado: "publicado",
  requiere: {
    "mw.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to kwacha" },
        { valor: "mwk", etiqueta: "Kwacha to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["mw.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      kwacha: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "mwk" ? resultado : null,
      tasa,
      fecha: v["mw.usd"].fecha,
      observaciones: ["This is the Reserve Bank of Malawi middle rate. Banks and forex bureaux buy and sell at their own rates."],
    };
  },
  resultado: [
    { clave: "kwacha", etiqueta: "Amount in kwacha", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "RBM middle rate (kwacha per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
