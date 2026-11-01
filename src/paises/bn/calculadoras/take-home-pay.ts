import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { empleadoSpk, REQUIERE_SPK } from "../lib/spk";

export default definirCalculadora({
  id: "bn.take-home-pay",
  mercado: "bn",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: { ...REQUIERE_SPK, "bn.personal-income-tax-rate": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 2000 },
    { id: "ciudadano", tipo: "si-no", etiqueta: "You are a citizen or permanent resident", porDefecto: true, ayuda: "Only citizens and permanent residents under 60 are in the SPK." },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const spk = e.ciudadano
      ? redondear(empleadoSpk(e.bruto, { tasaEmpleado: v["bn.spk-employee-rate"], bandas: v["bn.spk-employer-bands"], minimoEmpleador: v["bn.spk-employer-minimum"] }))
      : 0;
    const impuesto = redondear((e.bruto * v["bn.personal-income-tax-rate"]) / 100);
    const neto = redondear(e.bruto - spk - impuesto);
    const observaciones: string[] = [];
    if (!e.ciudadano) observaciones.push("Foreign employees are not registered in the SPK, so nothing is deducted. Check your contract for any other deduction.");
    return { neto, spk, impuesto, netoAnual: redondear(neto * 12), porcentajeNeto: (neto / e.bruto) * 100, observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "spk", etiqueta: "SPK contribution (TAP and SCP before July 2023)", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income tax on your salary", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you keep", formato: "porcentaje", decimales: 1 },
  ],
});
