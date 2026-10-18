import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// La ley da 28 días por ciclo de 12 meses y no fija una regla proporcional: el cálculo por meses es
// una estimación y así se avisa en el resultado.
export default definirCalculadora({
  id: "tz.annual-leave-calculator",
  mercado: "tz",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "tz.annual-leave-days": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Completed months in this leave cycle", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses > 12) throw new ErrorEntrada("A leave cycle has 12 months.", "meses");
    const ganados = redondear((v["tz.annual-leave-days"] * e.meses) / 12);
    const pendientes = Math.max(0, redondear(ganados - e.tomados));
    const observaciones: string[] = [];
    if (e.meses < 12) observaciones.push("For part of a cycle the days are shown in proportion to the months worked. Check your contract or ask your employer how they count it.");
    return { pendientes, ganados, observaciones };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Leave days still due", formato: "dias", decimales: 1, destacada: true },
    { clave: "ganados", etiqueta: "Leave days earned", formato: "dias", decimales: 1 },
  ],
});
