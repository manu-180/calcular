import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "na.corporate-tax-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "corporate-tax-calculator",
  estado: "publicado",
  requiere: {
    "na.corporate-tax-rate": "numero",
  },
  campos: [{ id: "renta", tipo: "moneda", etiqueta: "Taxable income of the company for the year", min: 0, porDefecto: 1000000 }],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("Enter the company's taxable income.", "renta");
    const impuesto = redondear(porcentaje(e.renta, v["na.corporate-tax-rate"]));
    return {
      impuesto,
      despues: redondear(e.renta - impuesto),
      tasa: v["na.corporate-tax-rate"],
      observaciones: ["Mining companies are taxed at different rates and are not covered here."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Company income tax", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Profit after tax", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tax rate", formato: "porcentaje", decimales: 0 },
  ],
});
