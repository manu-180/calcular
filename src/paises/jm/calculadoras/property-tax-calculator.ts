import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.property-tax-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "property-tax-calculator",
  estado: "publicado",
  requiere: {
    "jm.property-tax-bands": "escala",
    "jm.property-tax-bands-over-30m": "escala",
    "jm.property-tax-minimum": "numero",
    "jm.property-tax-split": "numero",
  },
  campos: [
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Unimproved value of the land",
      min: 0,
      porDefecto: 5000000,
      ayuda: "The land value on your valuation notice or the TAJ property tax query, not the price of the house.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the unimproved value of the land.", "valor");
    const escala = e.valor > v["jm.property-tax-split"] ? v["jm.property-tax-bands-over-30m"] : v["jm.property-tax-bands"];
    const anual = redondear(v["jm.property-tax-minimum"] + aplicarEscalaMarginal(escala, e.valor));
    return {
      anual,
      mensual: redondear(anual / 12),
      tasaEfectiva: (anual / e.valor) * 100,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Property tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Monthly equivalent", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Tax as a share of the land value", formato: "porcentaje", decimales: 3 },
  ],
});
