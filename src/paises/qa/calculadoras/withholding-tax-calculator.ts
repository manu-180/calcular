import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.withholding-tax-calculator",
  mercado: "qa",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "qa.withholding-tax": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 100000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "The amount is",
      opciones: [
        { valor: "bruto", etiqueta: "The invoice total, before withholding" },
        { valor: "neto", etiqueta: "What the non-resident must receive after tax" },
      ],
      porDefecto: "bruto",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount.", "monto");
    const tasa = v["qa.withholding-tax"];
    const bruto = entrada.modo === "neto" ? entrada.monto / (1 - tasa / 100) : entrada.monto;
    const retencion = redondear(porcentaje(bruto, tasa));
    const observaciones = [
      "Applies to royalties, interest, commissions and fees for services done wholly or partly in Qatar, paid to non-residents without a permanent establishment there.",
      "Pay the tax to the GTA before the 16th of the month after the payment. A tax treaty may give a refund.",
    ];
    return { retencion, bruto: redondear(bruto), neto: redondear(bruto - retencion), observaciones };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross amount", formato: "moneda" },
    { clave: "neto", etiqueta: "Paid to the non-resident", formato: "moneda" },
  ],
});
