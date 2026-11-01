import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.bnd-to-sgd",
  mercado: "bn",
  concepto: "tipo-de-cambio",
  slug: "bnd-to-sgd",
  estado: "publicado",
  requiere: { "bn.currency-par": "numero" },
  campos: [
    { id: "importe", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      porDefecto: "bnd-sgd",
      opciones: [
        { valor: "bnd-sgd", etiqueta: "Brunei dollars to Singapore dollars" },
        { valor: "sgd-bnd", etiqueta: "Singapore dollars to Brunei dollars" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter an amount to convert.", "importe");
    const par = v["bn.currency-par"];
    const resultado = e.sentido === "bnd-sgd" ? e.importe / par : e.importe * par;
    return {
      resultado: redondear(resultado),
      tasa: par,
      observaciones: ["Both banks and the monetary authorities exchange the two notes at par without charge. A shop in Singapore does not have to accept Brunei notes, and a card or a bureau de change may still add a fee."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Brunei dollars per Singapore dollar", formato: "numero", decimales: 2 },
  ],
});
