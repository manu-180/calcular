import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { MOTIVOS, tieneIndemnizacion } from "../lib/terminacion";

export default definirCalculadora({
  id: "na.severance-pay-calculator",
  mercado: "na",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "na.severance-weeks-per-year": "numero",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly remuneration", min: 0, porDefecto: 12000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, max: 60, porDefecto: 5 },
    { id: "motivo", tipo: "opcion", etiqueta: "How the job ended", opciones: MOTIVOS, porDefecto: "dismissed" },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly remuneration.", "salario");
    const semanal = redondear(e.salario / v["na.weeks-per-month"]);
    const corresponde = tieneIndemnizacion(e.motivo, e.anios);
    const semanas = corresponde ? e.anios * v["na.severance-weeks-per-year"] : 0;
    const observaciones: string[] = [];
    if (e.anios < 1) observaciones.push("Severance pay starts after 12 months of continuous service.");
    else if (!corresponde) observaciones.push("The Labour Act does not give severance pay in this situation.");
    return { indemnizacion: redondear(semanal * semanas), semanas, semanal, observaciones };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Minimum severance pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "semanas", decimales: 0 },
    { clave: "semanal", etiqueta: "One week's remuneration", formato: "moneda" },
  ],
});
