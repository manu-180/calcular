import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, noNegativo, peso, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.income-tax-calculator",
  mercado: "ph",
  concepto: "impuesto-renta",
  slug: "income-tax-calculator",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.thirteenth-month-exemption": "numero",
  },
  campos: [
    { id: "compensacion", tipo: "moneda", etiqueta: "Gross compensation for the year (without 13th month)", min: 0, porDefecto: 480000 },
    { id: "aportes", tipo: "moneda", etiqueta: "Your SSS, PhilHealth and Pag-IBIG contributions for the year", min: 0, porDefecto: 0 },
    { id: "beneficios", tipo: "moneda", etiqueta: "13th month pay and other bonuses for the year", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    noNegativo(entrada.compensacion, "compensacion", "Enter an amount of zero or more.");
    if (entrada.aportes > entrada.compensacion) throw new ErrorEntrada("Your contributions cannot be more than your compensation.", "aportes");
    const tope = v["ph.thirteenth-month-exemption"];
    const exento = Math.min(entrada.beneficios, tope);
    const beneficiosGravados = entrada.beneficios - exento;
    const gravable = Math.max(0, entrada.compensacion - entrada.aportes + beneficiosGravados);
    const impuesto = redondear(impuestoAnual(v["ph.income-tax-table"], gravable));
    const ingresos = entrada.compensacion + entrada.beneficios;
    const observaciones: string[] = [];
    if (beneficiosGravados > 0) observaciones.push(`${peso(redondear(beneficiosGravados))} of your bonuses is above the ${peso(tope)} tax-free ceiling and is taxed.`);
    return {
      impuesto,
      gravable: redondear(gravable),
      exento: redondear(exento),
      mensual: redondear(impuesto / 12),
      efectiva: ingresos > 0 ? (impuesto / ingresos) * 100 : 0,
      marginal: tasaMarginal(v["ph.income-tax-table"], gravable),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "gravable", etiqueta: "Taxable income", formato: "moneda" },
    { clave: "exento", etiqueta: "Tax-free 13th month and bonuses", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Average tax a month", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "marginal", etiqueta: "Your tax bracket", formato: "porcentaje", decimales: 0 },
  ],
});
