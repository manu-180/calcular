import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.minimum-wage-calculator",
  mercado: "bb",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  // Borrador: el valor desde el 2026-01-21 sale de un aviso de intención del Ministerio, no de la Orden publicada.
  estado: "borrador",
  requiere: {
    "bb.minimum-wage-hourly": "numero",
    "bb.minimum-wage-weekly": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a week", min: 1, max: 80, porDefecto: 40 },
    { id: "pagoHora", tipo: "moneda", etiqueta: "Your pay per hour, if you want to compare", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.horas <= 0) throw new ErrorEntrada("Enter the hours you work in a week.", "horas");
    const porSemana = redondear(v["bb.minimum-wage-hourly"] * e.horas);
    const observaciones: string[] = [];
    const diferencia = e.pagoHora > 0 ? redondear(e.pagoHora - v["bb.minimum-wage-hourly"]) : 0;
    if (e.pagoHora > 0) {
      observaciones.push(diferencia >= 0 ? "Your hourly pay is at or above the national minimum wage." : "Your hourly pay is below the national minimum wage.");
    }
    return {
      porHora: v["bb.minimum-wage-hourly"],
      porSemana,
      semanaOficial: v["bb.minimum-wage-weekly"],
      porMes: redondear((porSemana * 52) / 12),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "porHora", etiqueta: "National minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "porSemana", etiqueta: "Minimum for your hours in a week", formato: "moneda" },
    { clave: "semanaOficial", etiqueta: "Minimum per week stated in the Order", formato: "moneda" },
    { clave: "porMes", etiqueta: "Minimum per month for your hours", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay per hour minus the minimum", formato: "moneda" },
  ],
});
