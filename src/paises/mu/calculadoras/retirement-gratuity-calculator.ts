import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { mesesCompletos } from "../lib/fechas";

export default definirCalculadora({
  id: "mu.retirement-gratuity-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "retirement-gratuity-calculator",
  estado: "publicado",
  requiere: {
    "mu.gratuity-days": "numero",
    "mu.gratuity-days-in-month": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "First day of employment", porDefecto: "2000-01-03" },
    { id: "fin", tipo: "fecha", etiqueta: "Retirement date", porDefecto: "hoy" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly remuneration", min: 0, porDefecto: 35000, ayuda: "The higher of your last month and your 12-month average, regular bonuses and overtime included." },
    { id: "deducciones", tipo: "moneda", etiqueta: "Amount the employer can deduct", min: 0, porDefecto: 0, ayuda: "For example half of a pension fund gratuity paid from employer contributions." },
  ],
  calcular(e, v, { redondear }) {
    if (!esFechaISO(e.inicio) || !esFechaISO(e.fin)) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    if (e.fin <= e.inicio) throw new ErrorEntrada("The retirement date has to be after the first day of employment.", "fin");
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly remuneration.", "sueldo");
    const meses = mesesCompletos(e.inicio, e.fin);
    const anios = Math.floor(meses / 12);
    const resto = meses % 12;
    const diario = e.sueldo / v["mu.gratuity-days-in-month"];
    const porAnio = diario * v["mu.gratuity-days"];
    const observaciones: string[] = [];
    let bruto = 0;
    if (meses < 12) observaciones.push("The gratuity needs at least 12 months of continuous employment.");
    else bruto = redondear(porAnio * anios + (porAnio / 12) * resto);
    if (bruto > 0) observaciones.push("If you are in the PRGF, the fund pays what is in your account and your employer pays any shortfall up to this amount.");
    return {
      neto: redondear(Math.max(0, bruto - e.deducciones)),
      bruto,
      diario: redondear(diario),
      porAnio: redondear(porAnio),
      anios,
      resto,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Retirement gratuity", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Gratuity before deductions", formato: "moneda" },
    { clave: "diario", etiqueta: "One day's remuneration", formato: "moneda" },
    { clave: "porAnio", etiqueta: "Gratuity for each year of service", formato: "moneda" },
    { clave: "anios", etiqueta: "Full years of service", formato: "anios" },
    { clave: "resto", etiqueta: "Extra months", formato: "meses" },
  ],
});
