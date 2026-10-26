import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { redondear as redondearA } from "@/motor/formato";

export default definirCalculadora({
  id: "rw.usd-to-rwf",
  mercado: "rw",
  concepto: "tipo-de-cambio",
  slug: "usd-to-rwf",
  estado: "publicado",
  requiere: {
    "rw.usd": "serie",
    "rw.eur": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Convert",
      opciones: [
        { valor: "usd", etiqueta: "US dollars to Rwandan francs" },
        { valor: "rwf-usd", etiqueta: "Rwandan francs to US dollars" },
        { valor: "eur", etiqueta: "Euros to Rwandan francs" },
        { valor: "rwf-eur", etiqueta: "Rwandan francs to euros" },
      ],
      porDefecto: "usd",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const serie = e.sentido === "usd" || e.sentido === "rwf-usd" ? v["rw.usd"] : v["rw.eur"];
    const haciaFrancos = e.sentido === "usd" || e.sentido === "eur";
    return {
      francos: haciaFrancos ? redondear(e.monto * serie.valor) : null,
      divisa: haciaFrancos ? null : redondearA(e.monto / serie.valor, { decimales: 2, modo: "mitad-arriba" }),
      tasa: serie.valor,
      fecha: serie.fecha,
      observaciones: ["This is the BNR average rate. Banks and forex bureaus buy and sell with their own margin."],
    };
  },
  resultado: [
    { clave: "francos", etiqueta: "Amount in Rwandan francs", formato: "moneda", destacada: true },
    { clave: "divisa", etiqueta: "Amount in the foreign currency", formato: "numero", decimales: 2, destacada: true },
    { clave: "tasa", etiqueta: "BNR average rate (RWF per unit)", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Rate of", formato: "fecha" },
  ],
});
