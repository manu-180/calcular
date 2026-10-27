import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_DEL_MES, indemnizacion, OPCIONES_MOTIVO, parametrosIndemnizacion, REQUIERE_INDEMNIZACION } from "../lib/terminacion";

export default definirCalculadora({
  id: "et.final-settlement-calculator",
  mercado: "et",
  concepto: "liquidacion-final",
  slug: "final-settlement-calculator",
  estado: "publicado",
  requiere: {
    ...REQUIERE_INDEMNIZACION,
    "et.days-in-month": "numero",
    "et.probation-days": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 9000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
    { id: "motivo", tipo: "opcion", etiqueta: "Why did the job end?", opciones: OPCIONES_MOTIVO, porDefecto: "redundancy" },
    { id: "licencia", tipo: "numero", etiqueta: "Annual leave days not taken", min: 0, max: 120, porDefecto: 10 },
    { id: "diasMes", tipo: "numero", etiqueta: "Working days in your month", min: 1, max: 31, porDefecto: 26, ayuda: "Used to value the leave days. Article 77(3) counts 26 days of service as one month." },
    { id: "diasImpagos", tipo: "numero", etiqueta: "Days worked in the last month and not yet paid", min: 0, max: 31, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    if (e.anios === 0 && e.meses === 0) throw new ErrorEntrada("Enter how long you worked for the employer.", "anios");
    const r = indemnizacion(e.salario, e.anios, e.meses, e.motivo, parametrosIndemnizacion(v));
    const indem = redondear(r.indemnizacion);
    const compensacion = redondear(r.compensacion);
    const extra = redondear(r.extra);
    const licencia = redondear((e.licencia * e.salario) / e.diasMes);
    const sueldo = redondear((e.diasImpagos * e.salario) / DIAS_DEL_MES);
    const observaciones: string[] = [];
    if (r.sinDerecho) observaciones.push("Resigning, sickness or death give a right to severance pay only after at least five years of service.");
    return {
      total: redondear(indem + compensacion + extra + licencia + sueldo),
      indemnizacion: indem,
      compensacion,
      extra,
      licencia,
      sueldo,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Final settlement", formato: "moneda", destacada: true },
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda" },
    { clave: "compensacion", etiqueta: "Compensation for leaving without notice", formato: "moneda", ocultarSiCero: true },
    { clave: "extra", etiqueta: "Extra 60 days for closure or redundancy", formato: "moneda", ocultarSiCero: true },
    { clave: "licencia", etiqueta: "Pay for annual leave not taken", formato: "moneda", ocultarSiCero: true },
    { clave: "sueldo", etiqueta: "Unpaid salary for the last month", formato: "moneda", ocultarSiCero: true },
  ],
});
