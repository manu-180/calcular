import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.exchange-rate",
  mercado: "lr",
  concepto: "tipo-de-cambio",
  slug: "exchange-rate",
  estado: "publicado",
  requiere: {
    "lr.usd-lrd-buying": "serie",
    "lr.usd-lrd-selling": "serie",
  },
  campos: [
    { id: "monto", tipo: "numero", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd-lrd", etiqueta: "US dollars to Liberian dollars" },
        { valor: "lrd-usd", etiqueta: "Liberian dollars to US dollars" },
      ],
      porDefecto: "usd-lrd",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const compra = v["lr.usd-lrd-buying"];
    const venta = v["lr.usd-lrd-selling"];
    const aLrd = entrada.sentido === "usd-lrd";
    // Al cambiar dólares por L$ el banco compra dólares (tasa de compra); al revés, los vende.
    const resultado = aLrd ? entrada.monto * compra.valor : entrada.monto / venta.valor;
    return {
      resultado: redondear(resultado),
      unidad: aLrd ? "Liberian dollars" : "US dollars",
      compra: compra.valor,
      venta: venta.valor,
      fecha: compra.fecha,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Converted amount", formato: "numero", decimales: 2, destacada: true },
    { clave: "unidad", etiqueta: "Currency", formato: "texto" },
    { clave: "compra", etiqueta: "CBL market buying rate (L$ per US$1)", formato: "numero", decimales: 4 },
    { clave: "venta", etiqueta: "CBL market selling rate (L$ per US$1)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate date", formato: "fecha" },
  ],
});
