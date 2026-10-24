import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.dollar-to-pkr",
  mercado: "pk",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-pkr",
  estado: "publicado",
  requiere: {
    "pk.usd-pkr": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to rupees" },
        { valor: "pkr", etiqueta: "Rupees to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["pk.usd-pkr"].valor;
    return {
      rupias: entrada.sentido === "usd" ? redondear(entrada.monto * tasa) : null,
      dolares: entrada.sentido === "pkr" ? redondear(entrada.monto / tasa) : null,
      tasa,
      fecha: v["pk.usd-pkr"].fecha,
    };
  },
  resultado: [
    { clave: "rupias", etiqueta: "Amount in rupees", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "SBP M2M rate (Rs. per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
