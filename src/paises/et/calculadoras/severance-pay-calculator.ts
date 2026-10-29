import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { indemnizacion, OPCIONES_MOTIVO, parametrosIndemnizacion, REQUIERE_INDEMNIZACION } from "../lib/terminacion";

export default definirCalculadora({
  id: "et.severance-pay-calculator",
  mercado: "et",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: REQUIERE_INDEMNIZACION,
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 9000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
    { id: "motivo", tipo: "opcion", etiqueta: "Why did the job end?", opciones: OPCIONES_MOTIVO, porDefecto: "redundancy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    if (e.anios === 0 && e.meses === 0) throw new ErrorEntrada("Enter how long you worked for the employer.", "anios");
    const r = indemnizacion(e.salario, e.anios, e.meses, e.motivo, parametrosIndemnizacion(v));
    const observaciones: string[] = [];
    if (r.sinDerecho) observaciones.push("Resigning, sickness or death give a right to severance pay only after at least five years of service.");
    if (r.topada) observaciones.push("Severance pay is capped at twelve months' wages.");
    return {
      total: redondear(r.total),
      indemnizacion: redondear(r.indemnizacion),
      diasIndemnizacion: r.diasIndemnizacion,
      compensacion: redondear(r.compensacion),
      extra: redondear(r.extra),
      diario: redondear(e.salario / 30),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total due", formato: "moneda", destacada: true },
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda" },
    { clave: "diasIndemnizacion", etiqueta: "Days of wages counted for severance", formato: "dias", decimales: 1 },
    { clave: "compensacion", etiqueta: "Compensation for leaving without notice", formato: "moneda", ocultarSiCero: true },
    { clave: "extra", etiqueta: "Extra 60 days for closure or redundancy", formato: "moneda", ocultarSiCero: true },
    { clave: "diario", etiqueta: "Daily wage used", formato: "moneda" },
  ],
});
