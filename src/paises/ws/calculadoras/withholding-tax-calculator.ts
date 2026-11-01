import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.withholding-tax-calculator",
  mercado: "ws",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "ws.resident-wht-rate": "numero",
    "ws.nonresident-wht-rate": "numero",
    "ws.nonresident-wht-insurance-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Gross amount paid", min: 0, porDefecto: 10000, ayuda: "For a contract, use the total contract price including materials and reimbursements." },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Who is being paid",
      opciones: [
        { valor: "residente", etiqueta: "Resident paid by a government entity for services" },
        { valor: "no-residente", etiqueta: "Non-resident: interest, royalty, management or professional fees, natural resource amount" },
        { valor: "no-residente-seguro", etiqueta: "Non-resident: life insurance premium or reinsurance" },
      ],
      porDefecto: "residente",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = e.caso === "residente" ? v["ws.resident-wht-rate"] : e.caso === "no-residente" ? v["ws.nonresident-wht-rate"] : v["ws.nonresident-wht-insurance-rate"];
    const retenido = redondear(porcentaje(e.monto, tasa));
    return {
      tasa,
      retenido,
      neto: redondear(e.monto - retenido),
      tratamiento: e.caso === "residente" ? "Credit against your final income tax" : "Final tax, no return needed",
      observaciones:
        e.caso === "residente"
          ? ["The government payer withholds and keeps the P5 certificate from the Ministry of Finance, which you lodge with your annual return. There is no withholding between private businesses."]
          : ["The withholding is a final tax, so the non-resident files no return and cannot claim a refund. Ask for a P5 certificate if you need to claim a credit in your home country."],
    };
  },
  resultado: [
    { clave: "retenido", etiqueta: "Tax withheld", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount paid to the recipient", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 1 },
    { clave: "tratamiento", etiqueta: "How the tax is treated", formato: "texto" },
  ],
});
