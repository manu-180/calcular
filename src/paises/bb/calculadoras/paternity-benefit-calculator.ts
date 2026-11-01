import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.paternity-benefit-calculator",
  mercado: "bb",
  concepto: "propio",
  slug: "paternity-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bb.paternity-benefit-rate": "numero",
    "bb.paternity-benefit-weeks": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [{ id: "semanal", tipo: "moneda", etiqueta: "Average insurable earnings per week", min: 0, porDefecto: 1000 }],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average insurable earnings per week.", "semanal");
    const base = Math.min(e.semanal, v["bb.nis-ceiling-weekly"]);
    const semanalBeneficio = redondear(porcentaje(base, v["bb.paternity-benefit-rate"]));
    const observaciones: string[] = [];
    if (e.semanal > base) observaciones.push("Your earnings are above the NIS weekly ceiling, so the benefit is worked out on the ceiling.");
    return { semanalBeneficio, semanas: v["bb.paternity-benefit-weeks"], total: redondear(semanalBeneficio * v["bb.paternity-benefit-weeks"]), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Total paternity benefit", formato: "moneda", destacada: true },
    { clave: "semanalBeneficio", etiqueta: "Benefit per week", formato: "moneda" },
    { clave: "semanas", etiqueta: "Weeks of benefit", formato: "numero", decimales: 0 },
  ],
});
