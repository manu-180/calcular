import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.usd-to-wst",
  mercado: "ws",
  concepto: "tipo-de-cambio",
  slug: "usd-to-wst",
  estado: "publicado",
  requiere: {
    "ws.usd": "serie",
    "ws.nzd": "serie",
    "ws.aud": "serie",
    "ws.eur": "serie",
    "ws.gbp": "serie",
    "ws.fjd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Foreign currency",
      opciones: [
        { valor: "usd", etiqueta: "US dollar (USD)" },
        { valor: "nzd", etiqueta: "New Zealand dollar (NZD)" },
        { valor: "aud", etiqueta: "Australian dollar (AUD)" },
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "gbp", etiqueta: "Pound sterling (GBP)" },
        { valor: "fjd", etiqueta: "Fijian dollar (FJD)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "a-tala", etiqueta: "Foreign currency to tala" },
        { valor: "desde-tala", etiqueta: "Tala to foreign currency" },
      ],
      porDefecto: "a-tala",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const punto = v[`ws.${e.moneda}`];
    const tasa = punto.valor;
    return {
      tala: e.sentido === "a-tala" ? redondear(e.monto / tasa) : null,
      extranjera: e.sentido === "desde-tala" ? Number((e.monto * tasa).toFixed(2)) : null,
      tasa,
      tala1: Number((1 / tasa).toFixed(4)),
      fecha: punto.fecha,
      observaciones: ["This is the indicative rate the Central Bank of Samoa publishes. It is not for market use. Banks and money transfer services set their own buying and selling rates."],
    };
  },
  resultado: [
    { clave: "tala", etiqueta: "Amount in tala (WST)", formato: "moneda", destacada: true },
    { clave: "extranjera", etiqueta: "Amount in the foreign currency", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Foreign currency per 1 tala", formato: "numero", decimales: 5 },
    { clave: "tala1", etiqueta: "Tala per 1 unit of foreign currency", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
