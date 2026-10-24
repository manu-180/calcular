import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ae.corporate-tax-calculator",
  mercado: "ae",
  concepto: "propio",
  slug: "corporate-tax-calculator",
  estado: "publicado",
  requiere: {
    "ae.corporate-tax": "escala",
  },
  campos: [{ id: "renta", tipo: "moneda", etiqueta: "Taxable income for the tax period", min: 0, porDefecto: 1000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.renta <= 0) throw new ErrorEntrada("Enter the taxable income.", "renta");
    const escala = v["ae.corporate-tax"];
    const impuesto = redondear(aplicarEscalaMarginal(escala, entrada.renta));
    const exento = Math.min(entrada.renta, escala[0].hasta ?? entrada.renta);
    return {
      impuesto,
      exento: redondear(exento),
      gravado: redondear(Math.max(0, entrada.renta - exento)),
      efectiva: (impuesto / entrada.renta) * 100,
      observaciones: ["Taxable income starts from the accounting profit before tax, adjusted for exempt income and non-deductible expenses. Qualifying Free Zone Persons can pay 0% on qualifying income."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Corporate tax payable", formato: "moneda", destacada: true },
    { clave: "exento", etiqueta: "Income taxed at 0%", formato: "moneda" },
    { clave: "gravado", etiqueta: "Income taxed at the main rate", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
  ],
});
