import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.dollar-to-naira",
  mercado: "ng",
  concepto: "tipo-de-cambio",
  slug: "dollar-to-naira",
  estado: "publicado",
  requiere: {
    "ng.nfem-usd": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to naira" },
        { valor: "ngn", etiqueta: "Naira to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["ng.nfem-usd"].valor;
    const resultado = entrada.sentido === "usd" ? redondear(entrada.monto * tasa) : redondear(entrada.monto / tasa);
    return {
      resultado: entrada.sentido === "usd" ? resultado : null,
      dolares: entrada.sentido === "ngn" ? resultado : null,
      tasa,
      fecha: v["ng.nfem-usd"].fecha,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Amount in naira", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "NFEM rate (₦ per US$)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
