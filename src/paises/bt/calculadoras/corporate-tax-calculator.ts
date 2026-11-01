import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.corporate-tax-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "corporate-tax-calculator",
  estado: "publicado",
  requiere: {
    "bt.company-tax-rate": "numero",
    "bt.body-of-persons-tax-rate": "numero",
    "bt.trust-tax-rate": "numero",
  },
  campos: [
    {
      id: "entidad",
      tipo: "opcion",
      etiqueta: "Type of entity",
      opciones: [
        { valor: "company", etiqueta: "Company" },
        { valor: "body", etiqueta: "Body of persons" },
        { valor: "trust", etiqueta: "Trust" },
      ],
      porDefecto: "company",
    },
    { id: "ganancia", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganancia < 0) throw new ErrorEntrada("The amount cannot be negative.", "ganancia");
    const tasa = e.entidad === "trust" ? v["bt.trust-tax-rate"] : e.entidad === "body" ? v["bt.body-of-persons-tax-rate"] : v["bt.company-tax-rate"];
    const impuesto = redondear(porcentaje(e.ganancia, tasa));
    return { impuesto, tasa, restante: redondear(e.ganancia - impuesto) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax for the year", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje" },
    { clave: "restante", etiqueta: "Left after tax", formato: "moneda" },
  ],
});
