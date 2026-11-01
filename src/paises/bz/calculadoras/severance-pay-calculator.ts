import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { semanalDesdeMensual } from "../lib/pago";
import { MOTIVOS_SEVERANCE, semanasDeSeverance } from "../lib/terminacion";

export default definirCalculadora({
  id: "bz.severance-pay-calculator",
  mercado: "bz",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "bz.severance-weeks-mid": "numero",
    "bz.severance-weeks-long": "numero",
    "bz.severance-min-years": "numero",
    "bz.severance-long-years": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic pay", min: 0, porDefecto: 2000, ayuda: "Average basic wages over the last 12 months." },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of work", porDefecto: "2015-02-02" },
    { id: "fin", tipo: "fecha", etiqueta: "Last day of work", porDefecto: "hoy" },
    { id: "motivo", tipo: "opcion", etiqueta: "Why the job ended", opciones: MOTIVOS_SEVERANCE, porDefecto: "empleador" },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly basic pay.", "sueldo");
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of work.", "inicio");
    if (!esFechaISO(e.fin)) throw new ErrorEntrada("Enter the last day of work.", "fin");
    if (e.fin < e.inicio) throw new ErrorEntrada("The last day cannot be before the first day.", "fin");
    const r = semanasDeSeverance(e.inicio, e.fin, e.motivo, {
      semanasMedio: v["bz.severance-weeks-mid"],
      semanasLargo: v["bz.severance-weeks-long"],
      aniosMinimo: v["bz.severance-min-years"],
      aniosLargo: v["bz.severance-long-years"],
    });
    const semanal = semanalDesdeMensual(e.sueldo);
    const observaciones: string[] = [];
    if (r.anios < v["bz.severance-min-years"]) observaciones.push(`Severance pay starts after ${v["bz.severance-min-years"]} years of continuous service.`);
    else if (!r.aplica) observaciones.push("For this reason severance pay is due only after more than 10 years of service.");
    if (r.anios > v["bz.severance-long-years"] && e.inicio < "2011-05-01")
      observaciones.push("Service before 1 May 2011 counts at one week a year. The Act does not say how to treat a year that straddles that date, so this calculator counts it at the higher rate.");
    observaciones.push("Only complete years count. A dismissal for cause carries no severance pay.");
    return { total: redondear(semanal * r.semanas), semanas: r.semanas, anios: r.anios, semanal: redondear(semanal), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "anios", etiqueta: "Complete years of service", formato: "anios" },
    { clave: "semanas", etiqueta: "Weeks of wages", formato: "semanas" },
    { clave: "semanal", etiqueta: "One week of your basic pay", formato: "moneda" },
  ],
});
