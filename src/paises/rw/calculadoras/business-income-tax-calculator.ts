import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.business-income-tax-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "business-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.pit-bands": "escala",
    "rw.cit-rate": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Taxpayer",
      opciones: [
        { valor: "company", etiqueta: "Company (corporate income tax)" },
        { valor: "individual", etiqueta: "Sole trader or partner (personal income tax)" },
      ],
      porDefecto: "company",
    },
    { id: "beneficio", tipo: "moneda", etiqueta: "Taxable business profit for the year", min: 0, porDefecto: 50000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.beneficio <= 0) throw new ErrorEntrada("Enter the taxable profit for the year.", "beneficio");
    const impuesto = redondear(
      e.tipo === "company" ? porcentaje(e.beneficio, v["rw.cit-rate"]) : aplicarEscalaMarginal(v["rw.pit-bands"], e.beneficio),
    );
    const observaciones = e.tipo === "company" ? ["Companies newly listed on the Rwandan capital market can pay a lower rate for five years."] : [];
    return { impuesto, despues: redondear(e.beneficio - impuesto), efectiva: (impuesto / e.beneficio) * 100, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Profit after tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 1 },
  ],
});
