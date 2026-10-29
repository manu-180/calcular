import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual, OPCIONES_PERIODO, PERIODOS_POR_ANIO } from "../lib/nomina";

export default definirCalculadora({
  id: "fj.net-pay-calculator",
  mercado: "fj",
  concepto: "sueldo-neto",
  slug: "net-pay-calculator",
  estado: "publicado",
  requiere: {
    "fj.paye-bands": "escala",
    "fj.fnpf-employee-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay", min: 0, porDefecto: 5000, ayuda: "Wages before PAYE and FNPF, with taxable allowances." },
    { id: "periodo", tipo: "opcion", etiqueta: "Pay period", opciones: [...OPCIONES_PERIODO], porDefecto: "month" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the period.", "bruto");
    const n = PERIODOS_POR_ANIO[e.periodo];
    const brutoAnual = redondear(e.bruto * n);
    const taxAnual = impuestoAnual(v["fj.paye-bands"], brutoAnual, redondear);
    const fnpfAnual = redondear(porcentaje(brutoAnual, v["fj.fnpf-employee-rate"]));
    const paye = redondear(taxAnual / n);
    const fnpf = redondear(porcentaje(e.bruto, v["fj.fnpf-employee-rate"]));
    const netoPeriodo = redondear(e.bruto - paye - fnpf);
    const netoAnual = redondear(brutoAnual - taxAnual - fnpfAnual);
    return {
      netoPeriodo,
      paye,
      fnpf,
      totalDeducido: redondear(paye + fnpf),
      netoAnual,
      porcentajeNeto: (netoAnual / brutoAnual) * 100,
      observaciones: ["The result assumes a resident with one job (tax code P) and FNPF on the full gross pay."],
    };
  },
  resultado: [
    { clave: "netoPeriodo", etiqueta: "Take-home pay for the period", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "fnpf", etiqueta: "FNPF, your share", formato: "moneda" },
    { clave: "totalDeducido", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over a full year", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "anio", neto: "netoAnual", periodoNeto: "anio", entrada: { periodo: "year" } },
});
