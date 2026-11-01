import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.withholding-tax-calculator",
  mercado: "bt",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "bt.tds-rates": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of payment",
      opciones: [
        { valor: "contract-resident", etiqueta: "Contract or service fee, to a resident" },
        { valor: "contract-non-resident", etiqueta: "Contract or service fee, to a non-resident" },
        { valor: "rent", etiqueta: "Rent" },
        { valor: "royalty", etiqueta: "Royalty" },
        { valor: "investment", etiqueta: "Other investment income" },
        { valor: "interest", etiqueta: "Interest" },
        { valor: "dividend", etiqueta: "Dividend to an individual" },
        { valor: "lottery", etiqueta: "Lottery, betting or gambling winnings" },
        { valor: "partnership", etiqueta: "A partner's share of partnership income" },
      ],
      porDefecto: "contract-resident",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Amount of the payment", min: 0, porDefecto: 100000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = enMapa(v["bt.tds-rates"], e.tipo);
    const retenido = redondear(porcentaje(e.monto, tasa));
    return { retenido, tasa, neto: redondear(e.monto - retenido) };
  },
  resultado: [
    { clave: "retenido", etiqueta: "Tax to withhold", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje" },
    { clave: "neto", etiqueta: "The payee receives", formato: "moneda" },
  ],
});
