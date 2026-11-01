import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.non-resident-tax",
  mercado: "lr",
  concepto: "propio",
  slug: "non-resident-tax",
  estado: "publicado",
  requiere: {
    "lr.non-resident-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", moneda: "USD", etiqueta: "Gross payment to the non-resident", min: 0, porDefecto: 10000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "This amount is",
      opciones: [
        { valor: "bruto", etiqueta: "Before withholding (gross)" },
        { valor: "neto", etiqueta: "What the non-resident must receive (net)" },
      ],
      porDefecto: "bruto",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount of the payment.", "monto");
    const tasa = v["lr.non-resident-rate"];
    const bruto = entrada.modo === "bruto" ? entrada.monto : entrada.monto / (1 - tasa / 100);
    const retencion = redondear(porcentaje(bruto, tasa));
    return { retencion, bruto: redondear(bruto), neto: redondear(bruto - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "bruto", etiqueta: "Gross payment", formato: "moneda", moneda: "USD" },
    { clave: "neto", etiqueta: "Net paid to the non-resident", formato: "moneda", moneda: "USD" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 0 },
  ],
});
