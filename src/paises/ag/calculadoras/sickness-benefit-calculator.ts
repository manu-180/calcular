import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.sickness-benefit-calculator",
  mercado: "ag",
  concepto: "propio",
  slug: "sickness-benefit-calculator",
  estado: "publicado",
  requiere: {
    "ag.sickness-benefit-rate": "numero",
    "ag.sickness-benefit-max-weeks": "numero",
    "ag.ss-ceiling-weekly": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Average weekly insurable earnings", min: 0, porDefecto: 800, ayuda: "Your average over the three months before the illness." },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks of illness", min: 1, max: 52, porDefecto: 4 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average weekly earnings.", "semanal");
    const maxSemanas = v["ag.sickness-benefit-max-weeks"];
    if (e.semanas > maxSemanas) throw new ErrorEntrada("Sickness benefit runs for up to 26 weeks of continuous illness before a medical referral.", "semanas");
    const base = Math.min(e.semanal, v["ag.ss-ceiling-weekly"]);
    const semanal = redondear(porcentaje(base, v["ag.sickness-benefit-rate"]));
    const observaciones: string[] = ["The first three days of an illness are not paid, and Sundays are excluded, so the first week pays less than the full weekly amount."];
    if (e.semanal > base) observaciones.push("Your earnings are above the weekly ceiling, so the benefit is worked out on the ceiling.");
    return { base, semanal, total: redondear(semanal * e.semanas), observaciones };
  },
  resultado: [
    { clave: "semanal", etiqueta: "Weekly sickness benefit", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Benefit for the weeks entered", formato: "moneda" },
    { clave: "base", etiqueta: "Weekly earnings used", formato: "moneda" },
  ],
});
