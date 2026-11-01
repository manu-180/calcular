import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.rupee-exchange-rate",
  mercado: "mu",
  concepto: "tipo-de-cambio",
  slug: "rupee-exchange-rate",
  estado: "publicado",
  requiere: {
    "mu.usd": "serie",
    "mu.eur": "serie",
    "mu.gbp": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "moneda",
      tipo: "opcion",
      etiqueta: "Currency",
      opciones: [
        { valor: "usd", etiqueta: "US dollar" },
        { valor: "eur", etiqueta: "Euro" },
        { valor: "gbp", etiqueta: "Pound sterling" },
      ],
      porDefecto: "usd",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "a-rupias", etiqueta: "From that currency to rupees" },
        { valor: "de-rupias", etiqueta: "From rupees to that currency" },
      ],
      porDefecto: "a-rupias",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const punto = e.moneda === "usd" ? v["mu.usd"] : e.moneda === "eur" ? v["mu.eur"] : v["mu.gbp"];
    const tasa = punto.valor;
    const aRupias = e.sentido === "a-rupias";
    return {
      rupias: aRupias ? redondear(e.monto * tasa) : null,
      divisa: aRupias ? null : redondear(e.monto / tasa),
      tasa,
      fecha: punto.fecha,
      observaciones: ["This is the Bank of Mauritius average of the selling rates quoted by banks. The rate you get at a counter, and the buying rate, will differ."],
    };
  },
  resultado: [
    { clave: "rupias", etiqueta: "Amount in Mauritian rupees", formato: "moneda", destacada: true },
    { clave: "divisa", etiqueta: "Amount in the other currency", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "Rupees for 1 unit (BOM indicative selling rate)", formato: "numero", decimales: 2 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
