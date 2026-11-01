import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.unemployment-benefit-calculator",
  mercado: "bb",
  concepto: "propio",
  slug: "unemployment-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bb.unemployment-benefit-rate": "numero",
    "bb.unemployment-max-weeks": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Average insurable earnings per week", min: 0, porDefecto: 1000 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks you expect to be unemployed", min: 1, max: 104, porDefecto: 20 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average insurable earnings per week.", "semanal");
    const base = Math.min(e.semanal, v["bb.nis-ceiling-weekly"]);
    const pagadas = Math.min(e.semanas, v["bb.unemployment-max-weeks"]);
    const observaciones: string[] = [];
    if (e.semanal > base) observaciones.push("Your earnings are above the NIS weekly ceiling, so the benefit is worked out on the ceiling.");
    if (e.semanas > pagadas) observaciones.push(`NIS pays unemployment benefit for a maximum of ${v["bb.unemployment-max-weeks"]} weeks, so the rest is not counted.`);
    const semanalBeneficio = redondear(porcentaje(base, v["bb.unemployment-benefit-rate"]));
    return { semanalBeneficio, pagadas, total: redondear(semanalBeneficio * pagadas), observaciones };
  },
  resultado: [
    { clave: "semanalBeneficio", etiqueta: "Unemployment benefit per week", formato: "moneda", destacada: true },
    { clave: "pagadas", etiqueta: "Weeks counted", formato: "numero", decimales: 0 },
    { clave: "total", etiqueta: "Total benefit", formato: "moneda" },
  ],
});
