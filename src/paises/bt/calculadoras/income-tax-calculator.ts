import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.income-tax-calculator",
  mercado: "bt",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "bt.pit-bands": "escala",
    "bt.no-return-limit": "numero",
  },
  campos: [{ id: "ingreso", tipo: "moneda", etiqueta: "Your taxable income for the year", min: 0, porDefecto: 800000, ayuda: "After deductions. Use the take-home pay calculator if you start from a salary." }],
  calcular(e, v, { redondear }) {
    if (e.ingreso < 0) throw new ErrorEntrada("Income cannot be negative.", "ingreso");
    const impuesto = redondear(aplicarEscalaMarginal(v["bt.pit-bands"], e.ingreso));
    const fila = v["bt.pit-bands"].filter((f) => e.ingreso > f.desde).at(-1);
    const observaciones: string[] = [];
    if (e.ingreso <= v["bt.no-return-limit"]) observaciones.push("At this level there is no tax. If you also own no business, section 293 says you need not file a return, unless the Department asks you to.");
    return {
      impuesto,
      restante: redondear(e.ingreso - impuesto),
      medio: e.ingreso > 0 ? (impuesto / e.ingreso) * 100 : 0,
      marginal: fila ? fila.tasa : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "restante", etiqueta: "Left after income tax", formato: "moneda" },
    { clave: "medio", etiqueta: "Average rate on all your income", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Rate on your next ngultrum", formato: "porcentaje" },
  ],
});
