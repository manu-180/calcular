import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { mesesCompletos } from "../lib/fechas";

export default definirCalculadora({
  id: "mu.severance-allowance-calculator",
  mercado: "mu",
  concepto: "indemnizacion-despido",
  slug: "severance-allowance-calculator",
  estado: "publicado",
  requiere: {
    "mu.severance-months": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of employment", porDefecto: "2020-01-06" },
    { id: "fin", tipo: "fecha", etiqueta: "Date the employment ended", porDefecto: "hoy" },
    { id: "ultimoMes", tipo: "moneda", etiqueta: "Pay for the last complete month", min: 0, porDefecto: 30000 },
    { id: "promedio", tipo: "moneda", etiqueta: "Average monthly pay over the last 12 months (optional)", min: 0, requerido: false, ayuda: "Include overtime, productivity and attendance bonuses, commission and other regular pay." },
    { id: "deducciones", tipo: "moneda", etiqueta: "Gratuity or pension contributions the employer can deduct", min: 0, porDefecto: 0, ayuda: "For example PRGF contributions or a gratuity already paid by the employer." },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.inicio) || !esFechaISO(e.fin)) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    if (e.fin <= e.inicio) throw new ErrorEntrada("The end date has to be after the first day of employment.", "fin");
    const meses = mesesCompletos(e.inicio, e.fin);
    const anios = Math.floor(meses / 12);
    const resto = meses % 12;
    const mensual = Math.max(e.ultimoMes, e.promedio ?? 0);
    const porAnio = v["mu.severance-months"] * mensual;
    const observaciones: string[] = [];
    let bruto = 0;
    if (meses < 12) {
      observaciones.push("Severance allowance needs at least 12 months of continuous employment.");
    } else {
      bruto = redondear(porAnio * anios + (porAnio / 12) * resto);
      observaciones.push("The Industrial Court orders severance when it finds the termination unjustified. In a justified reduction of workforce, the Redundancy Board can settle for at least 15 days' pay a year instead.");
    }
    return {
      neto: redondear(Math.max(0, bruto - e.deducciones)),
      bruto,
      mensual: redondear(mensual),
      anios,
      resto,
      deducciones: redondear(Math.min(e.deducciones, bruto)),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Severance allowance to receive", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Severance before deductions", formato: "moneda" },
    { clave: "mensual", etiqueta: "Month's remuneration used", formato: "moneda" },
    { clave: "anios", etiqueta: "Full years of service", formato: "anios" },
    { clave: "resto", etiqueta: "Extra months", formato: "meses" },
    { clave: "deducciones", etiqueta: "Deducted by the employer", formato: "moneda", ocultarSiCero: true },
  ],
});
