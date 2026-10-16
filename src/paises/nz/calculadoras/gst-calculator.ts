import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.gst-calculator",
  mercado: "nz",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "publicado",
  requiere: {
    "nz.gst-rate": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "add", etiqueta: "Add GST to a price" },
        { valor: "remove", etiqueta: "Take GST out of a GST-inclusive price" },
      ],
      porDefecto: "add",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.importe <= 0) throw new ErrorEntrada("Enter an amount above zero.", "importe");
    const tasa = v["nz.gst-rate"];
    if (entrada.modo === "add") {
      const gst = redondear((entrada.importe * tasa) / 100);
      return { sinGst: redondear(entrada.importe), gst, conGst: redondear(entrada.importe + gst) };
    }
    const gst = redondear((entrada.importe * tasa) / (100 + tasa));
    return { sinGst: redondear(entrada.importe - gst), gst, conGst: redondear(entrada.importe) };
  },
  resultado: [
    { clave: "conGst", etiqueta: "Price including GST", formato: "moneda", destacada: true },
    { clave: "gst", etiqueta: "GST", formato: "moneda" },
    { clave: "sinGst", etiqueta: "Price excluding GST", formato: "moneda" },
  ],
});
