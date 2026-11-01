import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.dollar-to-ngultrum",
  mercado: "bt",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-ngultrum",
  estado: "publicado",
  requiere: {
    "bt.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to ngultrum" },
        { valor: "btn", etiqueta: "Ngultrum to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["bt.usd"].valor;
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      ngultrum: e.sentido === "usd" ? resultado : null,
      dolares: e.sentido === "btn" ? resultado : null,
      tasa,
      fecha: v["bt.usd"].fecha,
      observaciones: ["This is the RMA holding rate at the end of the month. Banks and money changers use their own rates and fees."],
    };
  },
  resultado: [
    { clave: "ngultrum", etiqueta: "Amount in ngultrum", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "RMA rate (Nu. per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
