import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.dollar-to-shilling",
  mercado: "ke",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-shilling",
  estado: "publicado",
  requiere: {
    "ke.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Kenya shillings" },
        { valor: "kes", etiqueta: "Kenya shillings to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["ke.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      chelines: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "kes" ? resultado : null,
      tasa,
      fecha: v["ke.usd"].fecha,
      observaciones: ["This is the CBK indicative mean rate. Banks and forex bureaus add their own margin."],
    };
  },
  resultado: [
    { clave: "chelines", etiqueta: "Amount in Kenya shillings", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "CBK mean rate (KSh per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
