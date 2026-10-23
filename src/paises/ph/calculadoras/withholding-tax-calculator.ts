import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, OPCIONES_PERIODO, PERIODOS_POR_ANIO, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.withholding-tax-calculator",
  mercado: "ph",
  concepto: "propio",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.thirteenth-month-exemption": "numero",
  },
  campos: [
    {
      id: "compensacion",
      tipo: "moneda",
      etiqueta: "Taxable compensation for the pay period",
      min: 0,
      porDefecto: 25000,
      ayuda: "Your regular pay for the period minus your SSS, PhilHealth and Pag-IBIG contributions.",
    },
    { id: "periodo", tipo: "opcion", etiqueta: "Pay period", opciones: OPCIONES_PERIODO, porDefecto: "monthly" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.compensacion < 0) throw new ErrorEntrada("Enter an amount of zero or more.", "compensacion");
    const n = PERIODOS_POR_ANIO[entrada.periodo];
    const anual = entrada.compensacion * n;
    const impuesto = redondear(impuestoAnual(v["ph.income-tax-table"], anual) / n);
    const exentoHasta = redondear(v["ph.income-tax-table"][0].hasta! / n);
    return {
      impuesto,
      neto: redondear(entrada.compensacion - impuesto),
      exentoHasta,
      anual: redondear(impuesto * n),
      marginal: tasaMarginal(v["ph.income-tax-table"], anual),
      observaciones: ["The BIR tables round each bracket to the peso, so the employer's figure can differ by a few centavos."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Withholding tax for the period", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after withholding tax", formato: "moneda" },
    { clave: "exentoHasta", etiqueta: "No tax up to this amount per period", formato: "moneda" },
    { clave: "anual", etiqueta: "Withholding tax over a full year", formato: "moneda" },
    { clave: "marginal", etiqueta: "Tax rate on your last peso", formato: "porcentaje", decimales: 0 },
  ],
});
