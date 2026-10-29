import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.severance-pay-calculator",
  mercado: "bb",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  estado: "publicado",
  requiere: {
    "bb.severance-weeks": "mapa",
    "bb.severance-max-years": "numero",
    "bb.severance-min-weeks": "numero",
    "bb.nis-ceiling-weekly": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Average basic pay per week over your last 104 weeks", min: 0, porDefecto: 900 },
    { id: "anios", tipo: "entero", etiqueta: "Complete years of continuous employment", min: 0, max: 60, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your average weekly basic pay.", "semanal");
    if (e.anios * 52 < v["bb.severance-min-weeks"]) {
      throw new ErrorEntrada(`Severance pay needs at least ${v["bb.severance-min-weeks"]} weeks of continuous employment, which is 2 years.`, "anios");
    }
    const anios = Math.min(e.anios, v["bb.severance-max-years"]);
    const w = v["bb.severance-weeks"];
    const primeros = Math.min(anios, 10);
    const medios = Math.max(0, Math.min(anios, 20) - 10);
    const ultimos = Math.max(0, anios - 20);
    const semanas = primeros * enMapa(w, "up-to-10") + medios * enMapa(w, "11-20") + ultimos * enMapa(w, "21-33");
    const base = Math.min(e.semanal, v["bb.nis-ceiling-weekly"]);
    const observaciones: string[] = [];
    if (e.semanal > base) observaciones.push("Basic pay under the Act follows insurable earnings, so weekly pay above the NIS weekly ceiling is not counted.");
    if (e.anios > anios) observaciones.push(`Only the first ${v["bb.severance-max-years"]} years count.`);
    return { semanas, base, pago: redondear(semanas * base), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay owed", formato: "numero", decimales: 1 },
    { clave: "base", etiqueta: "Weekly pay used", formato: "moneda" },
  ],
});
