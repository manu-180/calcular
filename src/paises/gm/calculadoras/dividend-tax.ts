import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.dividend-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "dividend-tax",
  estado: "publicado",
  requiere: {
    "gm.dividend-tax-rate": "numero",
  },
  campos: [{ id: "dividendo", tipo: "moneda", etiqueta: "Gross dividend declared", min: 0, porDefecto: 50000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.dividendo <= 0) throw new ErrorEntrada("Enter the gross dividend.", "dividendo");
    const impuesto = redondear(porcentaje(entrada.dividendo, v["gm.dividend-tax-rate"]));
    return { neto: redondear(entrada.dividendo - impuesto), impuesto, tasa: v["gm.dividend-tax-rate"] };
  },
  resultado: [
    { clave: "neto", etiqueta: "Dividend you receive", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "Dividend income tax withheld", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
