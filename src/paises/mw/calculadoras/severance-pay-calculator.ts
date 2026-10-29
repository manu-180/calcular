import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.severance-pay-calculator",
  mercado: "mw",
  concepto: "indemnizacion-despido",
  slug: "severance-pay-calculator",
  // La tabla vigente del First Schedule no se pudo leer completa en una fuente primaria (ver datos.json).
  estado: "borrador",
  requiere: {
    "mw.severance-weeks": "mapa",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, porDefecto: 8 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your current wage for one week", min: 0, porDefecto: 50000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your current wage for one week.", "semanal");
    const tabla = v["mw.severance-weeks"];
    const tramo1 = Math.min(e.anios, 5);
    const tramo2 = Math.min(Math.max(e.anios - 5, 0), 5);
    const tramo3 = Math.max(e.anios - 10, 0);
    const semanas = tramo1 * enMapa(tabla, "years-1-5") + tramo2 * enMapa(tabla, "years-6-10") + tramo3 * enMapa(tabla, "years-11-plus");
    const observaciones = e.anios < 1 ? ["Severance allowance starts after one completed year of service."] : [];
    return { total: e.anios < 1 ? 0 : redondear(semanas * e.semanal), semanas: e.anios < 1 ? 0 : semanas, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Severance allowance", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of wages", formato: "semanas" },
  ],
});
