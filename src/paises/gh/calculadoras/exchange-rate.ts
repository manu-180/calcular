import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.exchange-rate",
  mercado: "gh",
  concepto: "tipo-de-cambio",
  slug: "exchange-rate",
  estado: "publicado",
  requiere: {
    "gh.usd-ghs": "serie",
  },
  campos: [
    { id: "monto", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd-ghs", etiqueta: "US dollars to cedis" },
        { valor: "ghs-usd", etiqueta: "Cedis to US dollars" },
      ],
      porDefecto: "usd-ghs",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = v["gh.usd-ghs"].valor;
    const resultado = entrada.sentido === "usd-ghs" ? entrada.monto * tasa : entrada.monto / tasa;
    return {
      resultado: redondear(resultado),
      tasa,
      fecha: v["gh.usd-ghs"].fecha,
      unidad: entrada.sentido === "usd-ghs" ? "cedis" : "US dollars",
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "unidad", etiqueta: "Currency", formato: "texto" },
    { clave: "tasa", etiqueta: "Bank of Ghana mid rate (GH₵ per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate date", formato: "fecha" },
  ],
});
