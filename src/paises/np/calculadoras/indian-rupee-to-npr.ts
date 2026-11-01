import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.indian-rupee-to-npr",
  mercado: "np",
  concepto: "propio",
  slug: "indian-rupee-to-npr",
  estado: "publicado",
  requiere: { "np.inr": "serie" },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "inr", etiqueta: "Indian rupees to Nepali rupees" },
        { valor: "npr", etiqueta: "Nepali rupees to Indian rupees" },
      ],
      porDefecto: "inr",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const por100 = v["np.inr"].valor;
    const tasa = por100 / 100;
    return {
      nepali: e.sentido === "inr" ? redondear(e.monto * tasa) : null,
      indian: e.sentido === "npr" ? redondear(e.monto / tasa) : null,
      tasa,
      fecha: v["np.inr"].fecha,
      observaciones: ["The Nepal Rastra Bank quotes NPR 160 for every 100 Indian rupees, a fixed rate of NPR 1.60. Money changers add their own margin."],
    };
  },
  resultado: [
    { clave: "nepali", etiqueta: "Amount in Nepali rupees", formato: "moneda", destacada: true },
    { clave: "indian", etiqueta: "Amount in Indian rupees", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "NPR for each Indian rupee", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
