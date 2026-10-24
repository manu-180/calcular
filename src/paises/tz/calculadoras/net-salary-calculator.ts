import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { APORTE_NSSF, paye } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.net-salary-calculator",
  mercado: "tz",
  concepto: "sueldo-neto",
  slug: "net-salary-calculator",
  estado: "publicado",
  requiere: {
    "tz.paye-bands": "escala",
    "tz.non-resident-employee-rate": "numero",
    "tz.heslb-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 1000000 },
    { id: "aporte", tipo: "opcion", etiqueta: "Your share of the NSSF contribution", opciones: APORTE_NSSF, porDefecto: "10" },
    { id: "heslb", tipo: "si-no", etiqueta: "You repay a HESLB student loan" },
    { id: "basico", tipo: "moneda", etiqueta: "Basic salary (for the HESLB deduction)", min: 0, requerido: false, visibleSi: { heslb: [true] }, ayuda: "Leave empty to use the gross salary." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross monthly salary.", "bruto");
    const r = paye(e.bruto, Number(e.aporte), "resident", "primary", v["tz.paye-bands"], v["tz.non-resident-employee-rate"]);
    const impuesto = redondear(r.paye);
    const nssf = redondear(r.nssf);
    const heslb = e.heslb ? redondear(porcentaje(e.basico ?? e.bruto, v["tz.heslb-rate"])) : 0;
    const deducciones = redondear(impuesto + nssf + heslb);
    const neto = redondear(e.bruto - deducciones);
    return {
      neto,
      paye: impuesto,
      nssf,
      heslb,
      deducciones,
      netoAnual: redondear(neto * 12),
      porcentajeNeto: (neto / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Take-home pay for the month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE", formato: "moneda" },
    { clave: "nssf", etiqueta: "NSSF", formato: "moneda" },
    { clave: "heslb", etiqueta: "HESLB loan repayment", formato: "moneda", ocultarSiCero: true },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
    { clave: "porcentajeNeto", etiqueta: "Share of gross pay you take home", formato: "porcentaje", decimales: 1 },
  ],
});
