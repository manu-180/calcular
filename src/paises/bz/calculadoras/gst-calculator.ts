import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bz.gst-calculator",
  mercado: "bz",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "publicado",
  requiere: {
    "bz.gst-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What the amount is",
      opciones: [
        { valor: "sin", etiqueta: "Price before GST (add GST)" },
        { valor: "con", etiqueta: "Price with GST included (take GST out)" },
      ],
      porDefecto: "sin",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["bz.gst-rate"];
    const gst = e.modo === "sin" ? redondear(porcentaje(e.monto, tasa)) : redondear((e.monto * tasa) / (100 + tasa));
    const base = e.modo === "sin" ? e.monto : redondear(e.monto - gst);
    const total = e.modo === "sin" ? redondear(e.monto + gst) : e.monto;
    return {
      base,
      gst,
      total,
      observaciones: ["Zero-rated and exempt supplies carry no GST at the standard rate. Check the GST schedules before you apply the rate."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Price with GST", formato: "moneda", destacada: true },
    { clave: "gst", etiqueta: "GST", formato: "moneda" },
    { clave: "base", etiqueta: "Price before GST", formato: "moneda" },
  ],
});
