import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.gst-calculator",
  mercado: "lr",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "publicado",
  requiere: {
    "lr.gst-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "sin", etiqueta: "Before GST" },
        { valor: "con", etiqueta: "Including GST" },
      ],
      porDefecto: "sin",
    },
    {
      id: "exportacion",
      tipo: "si-no",
      etiqueta: "This is an export of goods",
      porDefecto: false,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter an amount above zero.", "monto");
    const tasa = entrada.exportacion ? 0 : v["lr.gst-rate"];
    const base = entrada.modo === "sin" ? entrada.monto : entrada.monto / (1 + tasa / 100);
    const gst = redondear(porcentaje(base, tasa));
    const neto = redondear(base);
    return { neto, gst, total: redondear(neto + gst), tasa };
  },
  resultado: [
    { clave: "gst", etiqueta: "GST", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Price before GST", formato: "moneda" },
    { clave: "total", etiqueta: "Price including GST", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate applied", formato: "porcentaje", decimales: 0 },
  ],
});
