import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre, esFechaISO } from "@/motor/vigencia";
import { euros } from "../lib/impuestos";

function cumple16(nacimiento: string): FechaISO {
  const fecha = `${Number(nacimiento.slice(0, 4)) + 16}${nacimiento.slice(4)}`;
  return (esFechaISO(fecha) ? fecha : `${fecha.slice(0, 4)}-03-01`) as FechaISO;
}

export default definirCalculadora({
  id: "ie.redundancy-pay",
  mercado: "ie",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay",
  estado: "publicado",
  requiere: {
    "ie.redundancy-weekly-ceiling": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date you started with this employer", porDefecto: "2015-01-05" },
    { id: "fin", tipo: "fecha", etiqueta: "Date you are made redundant", porDefecto: "hoy" },
    { id: "semanal", tipo: "moneda", etiqueta: "Gross weekly pay", min: 0, porDefecto: 700 },
    {
      id: "nacimiento",
      tipo: "fecha",
      etiqueta: "Your date of birth (optional)",
      requerido: false,
      ayuda: "Work before your 16th birthday does not count. Leave it empty if you started after 16.",
    },
    {
      id: "noComputables",
      tipo: "entero",
      etiqueta: "Days of absence that do not count (for example lay-off)",
      min: 0,
      porDefecto: 0,
      ayuda: "Some absences, such as maternity leave, still count as service. Lay-off does not.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("The redundancy date has to be after your start date.", "fin");
    const inicio = (entrada.nacimiento && cumple16(entrada.nacimiento) > entrada.inicio ? cumple16(entrada.nacimiento) : entrada.inicio) as FechaISO;
    if (inicio > entrada.fin) throw new ErrorEntrada("You were under 16 for all of this job, so none of it counts.", "nacimiento");
    const dias = diasEntre(inicio, entrada.fin as FechaISO) + 1 - entrada.noComputables;
    if (dias <= 0) throw new ErrorEntrada("The days that do not count are more than your whole service.", "noComputables");
    const tope = v["ie.redundancy-weekly-ceiling"];
    const pagaSemanal = Math.min(entrada.semanal, tope);
    const anios = redondear(dias / 365);
    const observaciones: string[] = [];
    if (inicio !== entrada.inicio) observaciones.push("Your service before your 16th birthday is left out.");
    if (dias < 728) {
      observaciones.push("You need at least 2 years (104 weeks) of continuous service with this employer to get statutory redundancy.");
      return { total: 0, semanas: 0, anios, dias, pagaSemanal, observaciones };
    }
    const semanas = redondear(anios * 2 + 1);
    if (entrada.semanal > tope) observaciones.push(`Weekly pay is capped at ${euros(tope)} for statutory redundancy.`);
    observaciones.push("Statutory redundancy is exempt from USC. Your contract may give you more than the legal minimum.");
    return { total: redondear(semanas * pagaSemanal), semanas, anios, dias, pagaSemanal, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Statutory redundancy payment", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay (2 per year plus 1 bonus week)", formato: "numero", decimales: 2 },
    { clave: "anios", etiqueta: "Years of reckonable service", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "Days of reckonable service", formato: "numero", decimales: 0 },
    { clave: "pagaSemanal", etiqueta: "Weekly pay used", formato: "moneda" },
  ],
});
