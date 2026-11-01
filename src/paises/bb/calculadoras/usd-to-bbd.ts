import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.usd-to-bbd",
  mercado: "bb",
  concepto: "tipo-de-cambio",
  slug: "usd-to-bbd",
  estado: "publicado",
  requiere: {
    "bb.usd-parity": "numero",
    "bb.foreign-exchange-fee": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount in US dollars", min: 0, porDefecto: 500 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "What are you doing?",
      opciones: [
        { valor: "comprar", etiqueta: "Buying US dollars or paying in US dollars" },
        { valor: "vender", etiqueta: "Selling or receiving US dollars" },
      ],
      porDefecto: "comprar",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter an amount greater than zero.", "monto");
    const bbd = redondear(e.monto * v["bb.usd-parity"]);
    const comision = e.operacion === "comprar" ? redondear(porcentaje(bbd, v["bb.foreign-exchange-fee"])) : 0;
    return {
      bbd,
      comision,
      total: redondear(bbd + comision),
      paridad: v["bb.usd-parity"],
      observaciones: ["Banks and exchange dealers quote their own buying and selling rates around the peg, so the amount at the counter will differ slightly."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Barbados dollars to pay or receive", formato: "moneda", destacada: true },
    { clave: "bbd", etiqueta: "Value at the peg", formato: "moneda" },
    { clave: "comision", etiqueta: "Foreign exchange fee", formato: "moneda" },
    { clave: "paridad", etiqueta: "Barbados dollars per US dollar at the peg", formato: "numero", decimales: 2 },
  ],
});
