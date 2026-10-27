import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { euros } from "../lib/malta";

export default definirCalculadora({
  id: "mt.overtime-tax",
  mercado: "mt",
  concepto: "propio",
  slug: "overtime-tax",
  estado: "publicado",
  requiere: {
    "mt.overtime-tax-rate": "numero",
    "mt.overtime-tax-limits": "mapa",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Basic weekly wage", min: 0, porDefecto: 350 },
    { id: "tarifa", tipo: "moneda", etiqueta: "Overtime rate you are paid per hour", min: 0, porDefecto: 13.13 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours in the year", min: 0, max: 2000, porDefecto: 200 },
    { id: "gerencial", tipo: "si-no", etiqueta: "You hold a managerial post", porDefecto: false },
    { id: "completo", tipo: "si-no", etiqueta: "Your job is registered as full-time with Jobsplus", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your basic weekly wage.", "semanal");
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the overtime hours.", "horas");
    const limites = v["mt.overtime-tax-limits"];
    const tasa = v["mt.overtime-tax-rate"];
    const ingreso = redondear(entrada.tarifa * entrada.horas);
    const observaciones: string[] = [];
    let califica = 0;
    if (entrada.gerencial) {
      observaciones.push("Overtime in a managerial post does not qualify for the flat rate.");
    } else if (!entrada.completo) {
      observaciones.push("Only overtime in a full-time job qualifies for the flat rate.");
    } else if (entrada.semanal > enMapa(limites, "max-weekly-wage")) {
      observaciones.push(`Your basic weekly wage is above ${euros(enMapa(limites, "max-weekly-wage"))}, so your overtime does not qualify for the flat rate.`);
    } else {
      const maxima = Math.min(entrada.tarifa, (2 * entrada.semanal) / 40);
      califica = redondear(Math.min(ingreso, enMapa(limites, "max-income"), entrada.horas * maxima));
      if (entrada.tarifa > maxima) observaciones.push("Only up to twice your basic hourly rate counts for the flat rate. The rest is taxed at your normal rates.");
    }
    const impuesto = redondear(porcentaje(califica, tasa));
    const resto = redondear(ingreso - califica);
    if (resto > 0 && califica > 0) observaciones.push(`The other ${euros(resto)} of overtime pay is taxed with the rest of your income at your normal rates.`);
    observaciones.push("You can choose to have all your overtime taxed at your normal rates instead.");
    return { impuesto, califica, ingreso, resto, observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Flat-rate tax on qualifying overtime", formato: "moneda", destacada: true },
    { clave: "califica", etiqueta: "Qualifying overtime income", formato: "moneda" },
    { clave: "ingreso", etiqueta: "Total overtime pay", formato: "moneda" },
    { clave: "resto", etiqueta: "Overtime taxed at normal rates", formato: "moneda" },
  ],
});
