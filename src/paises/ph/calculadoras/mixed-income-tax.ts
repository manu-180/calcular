import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, peso } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.mixed-income-tax",
  mercado: "ph",
  concepto: "propio",
  slug: "mixed-income-tax",
  estado: "publicado",
  requiere: {
    "ph.income-tax-table": "escala",
    "ph.eight-percent-rate": "numero",
    "ph.vat-threshold": "numero",
    "ph.percentage-tax-rate": "numero",
  },
  campos: [
    { id: "compensacion", tipo: "moneda", etiqueta: "Taxable compensation for the year", min: 0, porDefecto: 400000, ayuda: "Your salary minus SSS, PhilHealth, Pag-IBIG and tax-free bonuses." },
    { id: "ventas", tipo: "moneda", etiqueta: "Gross sales or receipts from your business or profession", min: 0, porDefecto: 600000 },
    { id: "gastos", tipo: "moneda", etiqueta: "Deductible business expenses", min: 0, porDefecto: 150000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gastos > entrada.ventas) throw new ErrorEntrada("Your expenses cannot be more than your gross sales.", "gastos");
    const escala = v["ph.income-tax-table"];
    const sobreSueldo = redondear(impuestoAnual(escala, entrada.compensacion));
    const califica = entrada.ventas <= v["ph.vat-threshold"];
    const ochoNegocio = califica ? redondear(porcentaje(entrada.ventas, v["ph.eight-percent-rate"])) : null;
    const ocho = ochoNegocio === null ? null : redondear(sobreSueldo + ochoNegocio);
    const graduadoRenta = redondear(impuestoAnual(escala, entrada.compensacion + entrada.ventas - entrada.gastos));
    const pt = califica ? redondear(porcentaje(entrada.ventas, v["ph.percentage-tax-rate"])) : 0;
    const graduado = redondear(graduadoRenta + pt);
    const observaciones: string[] = [];
    if (!califica) observaciones.push(`Your business receipts are above ${peso(v["ph.vat-threshold"])}, so only the graduated rates apply.`);
    observaciones.push("With the 8% option you pay 8% on all your business receipts. The ₱250,000 exclusion only applies to people with no salary.");
    return {
      mejor: ocho !== null && ocho <= graduado ? "8% on business income" : "Graduated rates on everything",
      sobreSueldo,
      ochoNegocio,
      ocho,
      graduadoRenta,
      pt,
      graduado,
      observaciones,
    };
  },
  resultado: [
    { clave: "mejor", etiqueta: "Lower tax option", formato: "texto", destacada: true },
    { clave: "sobreSueldo", etiqueta: "Tax on your compensation", formato: "moneda" },
    { clave: "ochoNegocio", etiqueta: "8% tax on business receipts", formato: "moneda" },
    { clave: "ocho", etiqueta: "Total with the 8% option", formato: "moneda" },
    { clave: "graduadoRenta", etiqueta: "Income tax on combined income at graduated rates", formato: "moneda" },
    { clave: "pt", etiqueta: "Percentage tax with graduated rates", formato: "moneda", ocultarSiCero: true },
    { clave: "graduado", etiqueta: "Total with graduated rates", formato: "moneda" },
  ],
});
