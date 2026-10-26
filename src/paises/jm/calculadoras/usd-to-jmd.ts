import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.usd-to-jmd",
  mercado: "jm",
  concepto: "tipo-de-cambio",
  slug: "usd-to-jmd",
  estado: "publicado",
  requiere: {
    "jm.usd-buy": "serie",
    "jm.usd-sell": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Jamaican dollars" },
        { valor: "jmd", etiqueta: "Jamaican dollars to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const compra = v["jm.usd-buy"].valor;
    const venta = v["jm.usd-sell"].valor;
    const jmd = e.sentido === "usd" ? redondear(e.monto * compra) : null;
    const usd = e.sentido === "jmd" ? redondear(e.monto / venta) : null;
    return {
      jmd,
      usd,
      compra,
      venta,
      fecha: v["jm.usd-sell"].fecha,
      observaciones: [
        e.sentido === "usd"
          ? "Changing US dollars into Jamaican dollars uses the average buying rate. Your bank or cambio sets its own rate."
          : "Buying US dollars uses the average selling rate. Your bank or cambio sets its own rate.",
      ],
    };
  },
  resultado: [
    { clave: "jmd", etiqueta: "Amount in Jamaican dollars", formato: "moneda", destacada: true },
    { clave: "usd", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "compra", etiqueta: "BOJ weighted average buying rate (J$ per US$)", formato: "numero", decimales: 4 },
    { clave: "venta", etiqueta: "BOJ weighted average selling rate (J$ per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rates of", formato: "fecha" },
  ],
});
