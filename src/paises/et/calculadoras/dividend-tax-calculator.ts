import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.dividend-tax-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "dividend-tax-calculator",
  estado: "publicado",
  requiere: {
    "et.dividend-tax": "numero",
    "et.interest-tax": "numero",
    "et.royalty-tax": "numero",
    "et.royalty-art-tax": "numero",
    "et.winnings-tax": "numero",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Gross amount received", min: 0, porDefecto: 10000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of income",
      opciones: [
        { valor: "dividend", etiqueta: "Dividend" },
        { valor: "interest", etiqueta: "Interest" },
        { valor: "royalty", etiqueta: "Royalty" },
        { valor: "royalty-art", etiqueta: "Royalty from art and culture" },
        { valor: "winnings", etiqueta: "Winnings from games of chance" },
      ],
      porDefecto: "dividend",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the gross amount.", "importe");
    const tasas = {
      dividend: v["et.dividend-tax"],
      interest: v["et.interest-tax"],
      royalty: v["et.royalty-tax"],
      "royalty-art": v["et.royalty-art-tax"],
      winnings: v["et.winnings-tax"],
    };
    const tasa = tasas[e.tipo];
    const impuesto = redondear(porcentaje(e.importe, tasa));
    return { impuesto, neto: redondear(e.importe - impuesto), tasa };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the gross amount", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount after tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
