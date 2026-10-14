import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.gst-calculator",
  mercado: "sg",
  concepto: "iva",
  slug: "gst-calculator",
  estado: "publicado",
  requiere: {
    "sg.gst": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 109 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "What do you want to do?",
      opciones: [
        { valor: "quitar", etiqueta: "Remove GST (the amount includes GST)" },
        { valor: "sumar", etiqueta: "Add GST (the amount is before GST)" },
      ],
      porDefecto: "quitar",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto < 0) throw new ErrorEntrada("Enter an amount of zero or more.", "monto");
    const tasa = v["sg.gst"];
    const sinGst = entrada.operacion === "quitar" ? redondear((entrada.monto * 100) / (100 + tasa)) : redondear(entrada.monto);
    const conGst = entrada.operacion === "quitar" ? redondear(entrada.monto) : redondear((entrada.monto * (100 + tasa)) / 100);
    return { sinGst, gst: redondear(conGst - sinGst), conGst, tasa };
  },
  resultado: [
    { clave: "sinGst", etiqueta: "Price before GST", formato: "moneda" },
    { clave: "gst", etiqueta: "GST", formato: "moneda", destacada: true },
    { clave: "conGst", etiqueta: "Price including GST", formato: "moneda" },
    { clave: "tasa", etiqueta: "GST rate", formato: "porcentaje", decimales: 0 },
  ],
});
