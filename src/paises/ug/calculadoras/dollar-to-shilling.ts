import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.dollar-to-shilling",
  mercado: "ug",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-shilling",
  estado: "publicado",
  requiere: {
    "ug.usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Uganda shillings" },
        { valor: "ugx", etiqueta: "Uganda shillings to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["ug.usd"].valor;
    return {
      chelines: e.sentido === "usd" ? redondear(e.monto * tasa) : null,
      dolares: e.sentido === "ugx" ? e.monto / tasa : null,
      tasa,
      fecha: v["ug.usd"].fecha,
      observaciones: ["This is the Bank of Uganda opening middle rate. Banks and forex bureaus buy and sell at their own rates."],
    };
  },
  resultado: [
    { clave: "chelines", etiqueta: "Amount in Uganda shillings", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "BoU middle rate (Ushs per US$)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
