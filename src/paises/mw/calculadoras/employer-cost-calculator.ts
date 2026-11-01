import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.employer-cost-calculator",
  mercado: "mw",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "mw.pension-employer": "numero",
    "mw.tevet-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 500000 },
    {
      id: "otros",
      tipo: "moneda",
      etiqueta: "Other guaranteed earnings for the month",
      min: 0,
      porDefecto: 0,
      ayuda: "Allowances and other guaranteed pay on top of the basic. They count for the pension but not for the TEVET levy.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the basic pay for the month.", "basico");
    const bruto = redondear(e.basico + e.otros);
    const pension = redondear(porcentaje(bruto, v["mw.pension-employer"]));
    const tevet = redondear(porcentaje(e.basico, v["mw.tevet-rate"]));
    const costo = redondear(bruto + pension + tevet);
    return {
      costo,
      bruto,
      pension,
      tevet,
      costoAnual: redondear(costo * 12),
      recargo: ((pension + tevet) / bruto) * 100,
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Cost to the employer each month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay", formato: "moneda" },
    { clave: "pension", etiqueta: "Employer pension contribution", formato: "moneda" },
    { clave: "tevet", etiqueta: "TEVET levy", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "recargo", etiqueta: "On-costs as a share of gross pay", formato: "porcentaje", decimales: 1 },
  ],
});
