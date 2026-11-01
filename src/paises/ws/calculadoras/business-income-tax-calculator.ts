import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.business-income-tax-calculator",
  mercado: "ws",
  concepto: "regimen-simplificado",
  slug: "business-income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ws.income-tax-bands": "escala",
    "ws.company-tax-rate": "numero",
    "ws.provisional-tax-instalments": "numero",
  },
  campos: [
    { id: "utilidad", tipo: "moneda", etiqueta: "Taxable income for the year", min: 0, porDefecto: 60000, ayuda: "Net profit after allowable costs." },
    {
      id: "entidad",
      tipo: "opcion",
      etiqueta: "Business structure",
      opciones: [
        { valor: "empresa", etiqueta: "Company" },
        { valor: "individual", etiqueta: "Sole trader" },
        { valor: "socio", etiqueta: "Partner's share of a partnership" },
      ],
      porDefecto: "individual",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.utilidad < 0) throw new ErrorEntrada("Taxable income cannot be negative.", "utilidad");
    const impuesto = redondear(e.entidad === "empresa" ? porcentaje(e.utilidad, v["ws.company-tax-rate"]) : aplicarEscalaMarginal(v["ws.income-tax-bands"], e.utilidad));
    return {
      impuesto,
      neto: redondear(e.utilidad - impuesto),
      tasaEfectiva: e.utilidad > 0 ? (impuesto / e.utilidad) * 100 : 0,
      cuota: redondear(impuesto / v["ws.provisional-tax-instalments"]),
      observaciones: [
        e.entidad === "socio"
          ? "A partnership does not pay income tax itself. Each partner declares their share and pays at the individual rates."
          : "A sole trader owes tax only if the year's net profit is above the tax-free band. You cannot claim a salary paid to yourself as a cost.",
      ],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Income after tax", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Share of income paid as tax", formato: "porcentaje", decimales: 1 },
    { clave: "cuota", etiqueta: "Provisional tax payment next year if the tax is the same", formato: "moneda" },
  ],
});
