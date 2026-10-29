import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.winnings-tax-calculator",
  mercado: "mw",
  concepto: "propio",
  slug: "winnings-tax-calculator",
  estado: "publicado",
  requiere: {
    "mw.winnings-tax": "numero",
  },
  campos: [
    {
      id: "premio",
      tipo: "moneda",
      etiqueta: "Amount you won",
      min: 0,
      porDefecto: 500000,
      ayuda: "From betting, gambling or a lottery, before any tax is taken off.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.premio <= 0) throw new ErrorEntrada("Enter the amount you won.", "premio");
    const impuesto = redondear(porcentaje(e.premio, v["mw.winnings-tax"]));
    return { neto: redondear(e.premio - impuesto), impuesto };
  },
  resultado: [
    { clave: "neto", etiqueta: "What you receive", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Withholding tax", formato: "moneda" },
  ],
});
