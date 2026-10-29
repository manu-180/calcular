import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.sickness-benefit-calculator",
  mercado: "bb",
  concepto: "propio",
  slug: "sickness-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bb.sickness-benefit-rate": "numero",
    "bb.sickness-max-weeks": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Average insurable earnings per week", min: 0, porDefecto: 900 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks you expect to be off sick", min: 1, max: 104, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average insurable earnings per week.", "semanal");
    const base = Math.min(e.semanal, v["bb.nis-ceiling-weekly"]);
    const pagadas = Math.min(e.semanas, v["bb.sickness-max-weeks"]);
    const observaciones: string[] = [];
    if (e.semanal > base) observaciones.push("Your earnings are above the NIS weekly ceiling, so the benefit is worked out on the ceiling.");
    if (e.semanas > pagadas) observaciones.push(`NIS pays sickness benefit for a maximum of ${v["bb.sickness-max-weeks"]} weeks, so the rest is not counted.`);
    return {
      semanalBeneficio: redondear(porcentaje(base, v["bb.sickness-benefit-rate"])),
      pagadas,
      total: redondear(porcentaje(base * pagadas, v["bb.sickness-benefit-rate"])),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanalBeneficio", etiqueta: "Sickness benefit per week", formato: "moneda", destacada: true },
    { clave: "pagadas", etiqueta: "Weeks counted", formato: "numero", decimales: 0 },
    { clave: "total", etiqueta: "Total benefit", formato: "moneda" },
  ],
});
