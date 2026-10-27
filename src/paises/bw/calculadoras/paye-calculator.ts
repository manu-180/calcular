import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuesto, tasaMarginal } from "../lib/impuestos";

const PERIODOS = { weekly: 52, fortnightly: 26, monthly: 12, yearly: 1 } as const;

export default definirCalculadora({
  id: "bw.paye-calculator",
  mercado: "bw",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.paye-non-resident": "escala",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Taxable pay for the period", min: 0, porDefecto: 12000 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Pay period",
      opciones: [
        { valor: "monthly", etiqueta: "Month" },
        { valor: "fortnightly", etiqueta: "Fortnight" },
        { valor: "weekly", etiqueta: "Week" },
        { valor: "yearly", etiqueta: "Year" },
      ],
      porDefecto: "monthly",
    },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence",
      opciones: [
        { valor: "resident", etiqueta: "Resident of Botswana" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter an amount above zero.", "ingreso");
    const factor = PERIODOS[entrada.periodo];
    const anual = entrada.ingreso * factor;
    const escala = entrada.residencia === "resident" ? v["bw.paye-resident"] : v["bw.paye-non-resident"];
    const impuestoAnual = impuesto(escala, anual);
    const impuestoPeriodo = redondear(impuestoAnual / factor);
    return {
      impuestoPeriodo,
      neto: redondear(entrada.ingreso - impuestoPeriodo),
      anual: redondear(anual),
      impuestoAnual: redondear(impuestoAnual),
      efectiva: (impuestoAnual / anual) * 100,
      marginal: tasaMarginal(escala, anual),
    };
  },
  resultado: [
    { clave: "impuestoPeriodo", etiqueta: "PAYE for the period", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after PAYE for the period", formato: "moneda" },
    { clave: "anual", etiqueta: "Taxable income a year", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "Tax a year", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Average tax rate", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Marginal tax rate", formato: "porcentaje", decimales: 2 },
  ],
});
