import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.small-business-corporation-tax",
  mercado: "za",
  concepto: "propio",
  slug: "small-business-corporation-tax",
  estado: "publicado",
  requiere: {
    "za.sbc-tax": "escala",
    "za.company-tax-rate": "numero",
  },
  campos: [{ id: "renta", tipo: "moneda", etiqueta: "Taxable income of the company for the year", min: 0, porDefecto: 400000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the company's taxable income.", "renta");
    const escala = v["za.sbc-tax"];
    const impuesto = redondear(aplicarEscalaMarginal(escala, entrada.renta));
    return {
      impuesto,
      efectiva: (impuesto / entrada.renta) * 100,
      ahorro: redondear((entrada.renta * v["za.company-tax-rate"]) / 100 - impuesto),
      neto: redondear(entrada.renta - impuesto),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax for the year", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "ahorro", etiqueta: "Less than at the normal company rate", formato: "moneda" },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
  ],
});
