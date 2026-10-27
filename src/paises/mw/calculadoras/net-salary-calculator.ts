import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { paye } from "../lib/nomina";

export default definirCalculadora({
  id: "mw.net-salary-calculator",
  mercado: "mw",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: {
    "mw.paye-bands": "escala",
    "mw.pension-employee": "numero",
    "mw.pension-employer": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 500000 },
    {
      id: "pension",
      tipo: "si-no",
      etiqueta: "You are in your employer's pension scheme",
      porDefecto: true,
      ayuda: "Most employers have to run one. We take the minimum employee contribution on your whole gross pay.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const impuesto = redondear(paye(v["mw.paye-bands"], e.bruto));
    const aporte = e.pension ? redondear(porcentaje(e.bruto, v["mw.pension-employee"])) : 0;
    const deducciones = redondear(impuesto + aporte);
    const neto = redondear(e.bruto - deducciones);
    return {
      neto,
      bruto: e.bruto,
      paye: impuesto,
      pension: aporte,
      deducciones,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gross pay", formato: "moneda" },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "pension", etiqueta: "Pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { pension: true } },
});
