import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.income-tax-calculator",
  mercado: "sc",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: { "sc.income-tax-bands": "escala" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 25000, ayuda: "Taxable emoluments from one employer in the month, before any deduction." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const bandas = v["sc.income-tax-bands"];
    const impuesto = redondear(aplicarEscalaMarginal(bandas, e.bruto));
    const fila = [...bandas].reverse().find((f) => e.bruto > f.desde) ?? bandas[0];
    const observaciones: string[] = [];
    if (impuesto === 0) observaciones.push("Your pay is inside the tax free band, so no income tax is withheld this month.");
    return {
      impuesto,
      neto: redondear(e.bruto - impuesto),
      anual: redondear(impuesto * 12),
      efectiva: (impuesto / e.bruto) * 100,
      marginal: fila.tasa,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the month", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after income tax", formato: "moneda" },
    { clave: "anual", etiqueta: "Income tax over 12 months at this pay", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Income tax as a share of gross pay", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Rate on your last rupee", formato: "porcentaje", decimales: 0 },
  ],
});
