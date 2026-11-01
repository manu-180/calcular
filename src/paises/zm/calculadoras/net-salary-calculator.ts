import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { napsa, paye } from "../lib/nomina";

export default definirCalculadora({
  id: "zm.net-salary-calculator",
  mercado: "zm",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  // El techo de NAPSA de 2026 no se pudo leer en napsa.co.zm (ver datos.json).
  estado: "borrador",
  requiere: {
    "zm.paye-bands": "escala",
    "zm.napsa-rate": "numero",
    "zm.napsa-ceiling": "numero",
    "zm.nhima-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 10000 },
    {
      id: "asignaciones",
      tipo: "moneda",
      etiqueta: "Allowances for the month",
      min: 0,
      porDefecto: 0,
      ayuda: "Housing, transport, lunch and any other cash allowance on your payslip.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const bruto = e.basico + e.asignaciones;
    const impuesto = redondear(paye(v["zm.paye-bands"], bruto));
    const aporteNapsa = redondear(napsa(bruto, v["zm.napsa-rate"], v["zm.napsa-ceiling"]));
    const aporteNhima = redondear(porcentaje(e.basico, v["zm.nhima-rate"]));
    const deducciones = redondear(impuesto + aporteNapsa + aporteNhima);
    const neto = redondear(bruto - deducciones);
    return {
      neto,
      bruto,
      paye: impuesto,
      napsa: aporteNapsa,
      nhima: aporteNhima,
      deducciones,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / bruto) * 100,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "napsa", etiqueta: "NAPSA", formato: "moneda" },
    { clave: "nhima", etiqueta: "NHIMA", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "basico", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { asignaciones: 0 } },
});
