import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, peso } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.eight-percent-tax",
  mercado: "ph",
  concepto: "regimen-simplificado",
  slug: "eight-percent-tax",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.eight-percent-rate": "numero",
    "ph.eight-percent-exclusion": "numero",
    "ph.vat-threshold": "numero",
    "ph.percentage-tax-rate": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Gross sales or receipts for the year", min: 0, porDefecto: 1200000 },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Business expenses you can deduct for the year",
      min: 0,
      porDefecto: 300000,
      ayuda: "Only used for the graduated rates option, which taxes your net income.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your gross sales or receipts.", "ventas");
    if (entrada.gastos > entrada.ventas) throw new ErrorEntrada("Your expenses cannot be more than your gross sales.", "gastos");
    const tope = v["ph.vat-threshold"];
    const califica = entrada.ventas <= tope;
    const ocho = califica ? redondear(porcentaje(Math.max(0, entrada.ventas - v["ph.eight-percent-exclusion"]), v["ph.eight-percent-rate"])) : null;
    const renta = redondear(impuestoAnual(v["ph.income-tax-table"], entrada.ventas - entrada.gastos));
    const pt = califica ? redondear(porcentaje(entrada.ventas, v["ph.percentage-tax-rate"])) : null;
    const graduado = redondear(renta + (pt ?? 0));
    const observaciones: string[] = [];
    let mejor: string;
    if (ocho === null) {
      mejor = "Graduated rates (8% not available)";
      observaciones.push(`Your gross sales are above the ${peso(tope)} VAT threshold, so the 8% option is not available and you are subject to the graduated rates.`);
    } else {
      mejor = ocho <= graduado ? "8% income tax" : "Graduated rates";
      observaciones.push("The 8% option has to be chosen in your first quarterly return of the year and cannot be changed until the next year.");
    }
    return {
      mejor,
      ocho,
      renta,
      pt,
      graduado,
      ahorro: ocho === null ? null : redondear(Math.abs(graduado - ocho)),
      observaciones,
    };
  },
  resultado: [
    { clave: "mejor", etiqueta: "Lower tax option", formato: "texto", destacada: true },
    { clave: "ocho", etiqueta: "8% income tax", formato: "moneda" },
    { clave: "renta", etiqueta: "Income tax at graduated rates", formato: "moneda" },
    { clave: "pt", etiqueta: "Percentage tax with graduated rates", formato: "moneda" },
    { clave: "graduado", etiqueta: "Total with graduated rates", formato: "moneda" },
    { clave: "ahorro", etiqueta: "Difference between the two options", formato: "moneda" },
  ],
});
