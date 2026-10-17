import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.gst-calculator",
  mercado: "in",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "publicado",
  requiere: {
    "in.gst-rates": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 10000 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "What do you want to do",
      opciones: [
        { valor: "add", etiqueta: "Add GST to a price" },
        { valor: "remove", etiqueta: "Remove GST from a price that includes it" },
      ],
      porDefecto: "add",
    },
    { id: "tasa", tipo: "opcion-dato", dato: "in.gst-rates", etiqueta: "GST rate", porDefecto: "standard" },
    {
      id: "suministro",
      tipo: "opcion",
      etiqueta: "Type of supply",
      opciones: [
        { valor: "intra", etiqueta: "Within the same state (CGST + SGST)" },
        { valor: "inter", etiqueta: "To another state (IGST)" },
      ],
      porDefecto: "intra",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe < 0) throw new ErrorEntrada("The amount cannot be negative.", "importe");
    const tasa = enMapa(v["in.gst-rates"], entrada.tasa);
    const neto = entrada.sentido === "add" ? redondear(entrada.importe) : redondear(entrada.importe / (1 + tasa / 100));
    const gst = entrada.sentido === "add" ? redondear((entrada.importe * tasa) / 100) : redondear(entrada.importe - neto);
    const intra = entrada.suministro === "intra";
    const cgst = intra ? redondear(gst / 2) : 0;
    const sgst = intra ? redondear(gst - cgst) : 0;
    return {
      bruto: redondear(neto + gst),
      gst,
      neto,
      cgst,
      sgst,
      igst: intra ? 0 : gst,
      tasa,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Price including GST", formato: "moneda", destacada: true },
    { clave: "gst", etiqueta: "Total GST", formato: "moneda" },
    { clave: "cgst", etiqueta: "CGST", formato: "moneda", ocultarSiCero: true },
    { clave: "sgst", etiqueta: "SGST or UTGST", formato: "moneda", ocultarSiCero: true },
    { clave: "igst", etiqueta: "IGST", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Price before GST", formato: "moneda" },
    { clave: "tasa", etiqueta: "GST rate used", formato: "porcentaje", decimales: 0 },
  ],
});
