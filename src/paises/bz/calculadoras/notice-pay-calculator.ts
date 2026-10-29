import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { semanalDesdeMensual, tramoDeAviso } from "../lib/pago";

export default definirCalculadora({
  id: "bz.notice-pay-calculator",
  mercado: "bz",
  concepto: "preaviso",
  slug: "notice-pay-calculator",
  estado: "publicado",
  requiere: {
    "bz.notice-weeks": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 2000 },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of work", porDefecto: "2020-03-02" },
    { id: "fin", tipo: "fecha", etiqueta: "Date the notice is given", porDefecto: "hoy" },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Who ends the job",
      opciones: [
        { valor: "empleador", etiqueta: "The employer, with no notice or less notice than required" },
        { valor: "trabajador", etiqueta: "The worker, with no notice or less notice than required" },
      ],
      porDefecto: "empleador",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly pay.", "sueldo");
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of work.", "inicio");
    if (!esFechaISO(e.fin)) throw new ErrorEntrada("Enter the date the notice is given.", "fin");
    if (e.fin < e.inicio) throw new ErrorEntrada("The notice date cannot be before the first day of work.", "fin");
    const tramo = tramoDeAviso(e.inicio, e.fin, 14);
    const semanas = tramo === "none" ? 0 : enMapa(v["bz.notice-weeks"], tramo);
    const salarioSemana = semanalDesdeMensual(e.sueldo);
    // Sección 38(3) y (4): el empleador que no avisa paga todo el período; el trabajador, la mitad.
    const pago = redondear(salarioSemana * semanas * (e.quien === "empleador" ? 1 : 0.5));
    const observaciones = ["The notice period starts on the first day of the pay period after the notice is served."];
    if (tramo === "none") observaciones.push("Notice is due after more than two weeks of continuous service.");
    observaciones.push("A collective agreement, a longer period in the contract or a waiver can change the period.");
    return { semanas, pago, salarioSemana: redondear(salarioSemana), observaciones };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Notice required", formato: "semanas" },
    { clave: "pago", etiqueta: "Amount due for the missing notice", formato: "moneda", destacada: true },
    { clave: "salarioSemana", etiqueta: "One week of your pay", formato: "moneda" },
  ],
});
