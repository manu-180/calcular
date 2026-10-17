import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gb.statutory-sick-pay",
  mercado: "gb",
  concepto: "propio",
  slug: "statutory-sick-pay",
  estado: "publicado",
  requiere: {
    "gb.ssp-weekly-rate": "numero",
    "gb.ssp-earnings-percent": "numero",
    "gb.ssp-max-weeks": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your average weekly earnings before tax", min: 0, porDefecto: 500 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you normally work a week (qualifying days)", min: 1, max: 7, porDefecto: 5 },
    { id: "diasEnfermo", tipo: "entero", etiqueta: "Working days off sick", min: 1, max: 200, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your average weekly earnings.", "semanal");
    const semanal = Math.min(v["gb.ssp-weekly-rate"], redondear((entrada.semanal * v["gb.ssp-earnings-percent"]) / 100));
    const maxDias = v["gb.ssp-max-weeks"] * entrada.diasSemana;
    const dias = Math.min(entrada.diasEnfermo, maxDias);
    const observaciones: string[] = [];
    if (entrada.diasEnfermo > maxDias) observaciones.push(`Statutory Sick Pay lasts up to ${v["gb.ssp-max-weeks"]} weeks, so only ${maxDias} days are paid.`);
    observaciones.push("Since 6 April 2026 Statutory Sick Pay is paid from the first day you are off sick, whatever you earn.");
    return {
      total: redondear((semanal * dias) / entrada.diasSemana),
      semanal,
      diaria: redondear(semanal / entrada.diasSemana),
      dias,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Statutory Sick Pay for your absence", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Weekly rate for you", formato: "moneda" },
    { clave: "diaria", etiqueta: "Daily rate", formato: "moneda" },
    { clave: "dias", etiqueta: "Days paid", formato: "dias", decimales: 0 },
  ],
});
