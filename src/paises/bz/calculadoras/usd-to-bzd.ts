import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bz.usd-to-bzd",
  mercado: "bz",
  concepto: "tipo-de-cambio",
  slug: "usd-to-bzd",
  estado: "publicado",
  requiere: {
    "bz.usd-peg": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Belize dollars" },
        { valor: "bzd", etiqueta: "Belize dollars to US dollars" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["bz.usd-peg"];
    const resultado = e.sentido === "usd" ? redondear(e.monto * tasa) : redondear(e.monto / tasa);
    return {
      bzd: e.sentido === "usd" ? resultado : null,
      usd: e.sentido === "bzd" ? resultado : null,
      tasa,
      observaciones: ["The Central Bank fixes the rate. Banks and exchange houses may charge a margin or a fee on top of it."],
    };
  },
  resultado: [
    { clave: "bzd", etiqueta: "Amount in Belize dollars", formato: "moneda", destacada: true },
    { clave: "usd", etiqueta: "Amount in US dollars", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Fixed rate (BZ$ per US$1)", formato: "numero", decimales: 2 },
  ],
});
