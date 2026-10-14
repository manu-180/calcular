import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.usd-to-cad",
  mercado: "ca",
  concepto: "tipo-de-cambio",
  slug: "usd-to-cad",
  estado: "publicado",
  requiere: {
    "ca.usd-cad": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd-cad", etiqueta: "US dollars to Canadian dollars" },
        { valor: "cad-usd", etiqueta: "Canadian dollars to US dollars" },
      ],
      porDefecto: "usd-cad",
    },
    { id: "monto", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const { valor, fecha } = v["ca.usd-cad"];
    const cad = entrada.direccion === "usd-cad";
    return {
      resultado: redondear(cad ? entrada.monto * valor : entrada.monto / valor),
      moneda: cad ? "Canadian dollars (CAD)" : "US dollars (USD)",
      tasa: valor,
      inversa: 1 / valor,
      fecha,
      observaciones: ["This is the Bank of Canada daily average rate. Banks and card issuers add their own margin when you buy or sell currency."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "Currency of the result", formato: "texto" },
    { clave: "tasa", etiqueta: "Canadian dollars per US dollar", formato: "numero", decimales: 4 },
    { clave: "inversa", etiqueta: "US dollars per Canadian dollar", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate date", formato: "fecha" },
  ],
});
