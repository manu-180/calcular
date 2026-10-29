import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.maternity-benefit-calculator",
  mercado: "bb",
  concepto: "propio",
  slug: "maternity-benefit-calculator",
  estado: "publicado",
  requiere: {
    "bb.maternity-benefit-rate": "numero",
    "bb.maternity-leave-weeks": "numero",
    "bb.child-grant": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Average insurable earnings per week", min: 0, porDefecto: 800 },
    { id: "semanas", tipo: "entero", etiqueta: "Weeks of benefit you expect", min: 1, max: 26, porDefecto: 12, ayuda: "NISSS confirms the number of weeks when it approves your claim." },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average insurable earnings per week.", "semanal");
    const base = Math.min(e.semanal, v["bb.nis-ceiling-weekly"]);
    const semanalBeneficio = redondear(porcentaje(base, v["bb.maternity-benefit-rate"]));
    const observaciones: string[] = [];
    if (e.semanal > base) observaciones.push("Your earnings are above the NIS weekly ceiling, so the benefit is worked out on the ceiling.");
    observaciones.push(`The Maternity Leave Act gives at least ${v["bb.maternity-leave-weeks"]} weeks of leave. NIS qualifying conditions apply.`);
    return {
      semanalBeneficio,
      total: redondear(semanalBeneficio * e.semanas),
      grant: v["bb.child-grant"],
      conGrant: redondear(semanalBeneficio * e.semanas + v["bb.child-grant"]),
      licencia: v["bb.maternity-leave-weeks"],
      observaciones,
    };
  },
  resultado: [
    { clave: "semanalBeneficio", etiqueta: "Maternity benefit per week", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Benefit for the weeks entered", formato: "moneda" },
    { clave: "grant", etiqueta: "NIS child grant", formato: "moneda" },
    { clave: "conGrant", etiqueta: "Benefit plus child grant", formato: "moneda" },
    { clave: "licencia", etiqueta: "Minimum maternity leave (weeks)", formato: "numero", decimales: 0 },
  ],
});
