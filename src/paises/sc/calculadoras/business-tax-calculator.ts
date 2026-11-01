import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.business-tax-calculator",
  mercado: "sc",
  concepto: "propio",
  slug: "business-tax-calculator",
  estado: "publicado",
  requiere: { "sc.business-tax-sole-trader": "escala", "sc.business-tax-company": "escala" },
  campos: [
    {
      id: "estructura",
      tipo: "opcion",
      etiqueta: "Business structure",
      opciones: [
        { valor: "individual", etiqueta: "Sole trader or partnership" },
        { valor: "company", etiqueta: "Company" },
      ],
      porDefecto: "individual",
    },
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 500000, ayuda: "Assessable income less allowable deductions." },
  ],
  calcular(e, v, { redondear }) {
    if (e.ingreso <= 0) throw new ErrorEntrada("Enter the taxable income for the year.", "ingreso");
    const bandas = e.estructura === "company" ? v["sc.business-tax-company"] : v["sc.business-tax-sole-trader"];
    const impuesto = redondear(aplicarEscalaMarginal(bandas, e.ingreso));
    const fila = [...bandas].reverse().find((f) => e.ingreso > f.desde) ?? bandas[0];
    return {
      impuesto,
      despues: redondear(e.ingreso - impuesto),
      mensual: redondear(impuesto / 12),
      efectiva: (impuesto / e.ingreso) * 100,
      marginal: fila.tasa,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Business tax for the year", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "Income after business tax", formato: "moneda" },
    { clave: "mensual", etiqueta: "Equivalent for each month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Business tax as a share of income", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Rate on your last rupee", formato: "porcentaje", decimales: 0 },
  ],
});
