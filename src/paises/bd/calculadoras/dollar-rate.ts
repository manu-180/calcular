import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: la tasa de Bangladesh Bank no se pudo leer (bb.org.bd no respondió desde acá).
export default definirCalculadora({
  id: "bd.dollar-rate",
  mercado: "bd",
  concepto: "tipo-de-cambio",
  slug: "dollar-rate",
  estado: "borrador",
  requiere: {
    "bd.usd-bdt": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "পরিমাণ", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "রূপান্তর",
      opciones: [
        { valor: "usd", etiqueta: "মার্কিন ডলার থেকে টাকা" },
        { valor: "bdt", etiqueta: "টাকা থেকে মার্কিন ডলার" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("পরিমাণ শূন্যের কম হতে পারে না।", "monto");
    const tasa = v["bd.usd-bdt"];
    return {
      taka: entrada.sentido === "usd" ? redondear(entrada.monto * tasa) : null,
      dolares: entrada.sentido === "bdt" ? redondear(entrada.monto / tasa) : null,
      tasa,
    };
  },
  resultado: [
    { clave: "taka", etiqueta: "টাকায়", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "মার্কিন ডলারে", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "প্রতি ডলারে টাকা", formato: "numero", decimales: 4 },
  ],
});
