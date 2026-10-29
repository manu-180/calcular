import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: la tasa de GST (5 % desde el 1/1/2026) no se pudo leer en la ley ni en el DRC (ver datos.json).
export default definirCalculadora({
  id: "bt.gst-calculator",
  mercado: "bt",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "borrador",
  requiere: {
    "bt.gst-rate": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What you know",
      opciones: [
        { valor: "add", etiqueta: "The price without GST" },
        { valor: "remove", etiqueta: "The price with GST" },
      ],
      porDefecto: "add",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["bt.gst-rate"];
    const neto = e.modo === "add" ? e.monto : redondear(e.monto / (1 + tasa / 100));
    const gst = e.modo === "add" ? redondear(porcentaje(e.monto, tasa)) : redondear(e.monto - neto);
    return { neto: redondear(neto), gst, total: redondear(neto + gst) };
  },
  resultado: [
    { clave: "neto", etiqueta: "Price without GST", formato: "moneda" },
    { clave: "gst", etiqueta: "GST", formato: "moneda" },
    { clave: "total", etiqueta: "Price with GST", formato: "moneda", destacada: true },
  ],
});
