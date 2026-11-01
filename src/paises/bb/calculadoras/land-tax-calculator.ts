import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.land-tax-calculator",
  mercado: "bb",
  concepto: "propio",
  slug: "land-tax-calculator",
  estado: "publicado",
  requiere: {
    "bb.land-tax-residential": "escala",
    "bb.land-tax-non-residential": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Value assessed by the Land and Surveys Department", min: 0, porDefecto: 1000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of property",
      opciones: [
        { valor: "residential", etiqueta: "Residential property (improved value)" },
        { valor: "building", etiqueta: "Land with a building other than a residence (improved value)" },
        { valor: "vacant-small", etiqueta: "Vacant land under 4,000 sq ft (site value)" },
        { valor: "vacant-large", etiqueta: "Vacant land over 4,000 sq ft, valued up to $450,000 (site value)" },
        { valor: "vacant-large-high", etiqueta: "Vacant land over 4,000 sq ft, valued over $450,000 (site value)" },
      ],
      porDefecto: "residential",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("Enter the assessed value of the property.", "valor");
    let impuesto = 0;
    if (e.tipo === "residential") {
      let desde = 0;
      for (const fila of v["bb.land-tax-residential"]) {
        const hasta = fila.hasta ?? Infinity;
        impuesto += (Math.max(0, Math.min(e.valor, hasta) - desde) * fila.tasa) / 100;
        desde = hasta;
      }
    } else {
      impuesto = (e.valor * enMapa(v["bb.land-tax-non-residential"], e.tipo)) / 100;
    }
    impuesto = redondear(impuesto);
    return {
      impuesto,
      mensual: redondear(impuesto / 12),
      tasaEfectiva: (impuesto / e.valor) * 100,
      observaciones: ["Land tax is charged on the value the Land and Surveys Department assigns, not on the market price. Relief and exemptions are not included."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Land tax for the year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Equivalent per month", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Effective rate on the value", formato: "porcentaje", decimales: 3 },
  ],
});
