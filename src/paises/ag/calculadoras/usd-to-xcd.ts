import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.usd-to-xcd",
  mercado: "ag",
  concepto: "tipo-de-cambio",
  slug: "usd-to-xcd",
  estado: "borrador",
  requiere: { "ag.xcd-per-usd": "numero" },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to EC dollars" },
        { valor: "xcd", etiqueta: "EC dollars to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "importe");
    const t = v["ag.xcd-per-usd"];
    return { resultado: redondear(e.sentido === "usd" ? e.importe * t : e.importe / t), tipo: t };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "tipo", etiqueta: "EC dollars per US dollar", formato: "numero", decimales: 2 },
  ],
});
