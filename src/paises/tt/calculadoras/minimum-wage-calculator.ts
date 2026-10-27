import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tt.minimum-wage-calculator",
  mercado: "tt",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "publicado",
  requiere: {
    "tt.minimum-wage-hourly": "numero",
    "tt.minimum-wage-daily": "numero",
    "tt.minimum-wage-weekly": "numero",
    "tt.minimum-wage-monthly": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a week", min: 1, max: 40, porDefecto: 40, ayuda: "Up to 40, the standard week in the Minimum Wages Order." },
    { id: "pagoHora", tipo: "moneda", etiqueta: "What you are paid per hour (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.horas <= 0 || e.horas > 40) throw new ErrorEntrada("Enter between 1 and 40 hours a week.", "horas");
    const hora = v["tt.minimum-wage-hourly"];
    const semanaTuya = redondear(hora * e.horas);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (e.pagoHora !== null && e.pagoHora > 0) {
      diferencia = redondear(Math.max(0, hora - e.pagoHora) * e.horas);
      observaciones.push(
        e.pagoHora >= hora
          ? "Your hourly pay is at or above the national minimum wage."
          : "Your hourly pay is below the national minimum wage.",
      );
    }
    return {
      hora,
      dia: v["tt.minimum-wage-daily"],
      semana: v["tt.minimum-wage-weekly"],
      mes: v["tt.minimum-wage-monthly"],
      semanaTuya,
      mesTuyo: redondear((hora * e.horas * 52) / 12),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "semanaTuya", etiqueta: "Minimum pay for your hours each week", formato: "moneda", destacada: true },
    { clave: "mesTuyo", etiqueta: "Minimum pay for your hours each month", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Shortfall against the minimum each week", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum wage per hour", formato: "moneda" },
    { clave: "dia", etiqueta: "Minimum for an 8-hour day", formato: "moneda" },
    { clave: "semana", etiqueta: "Minimum for a 40-hour week", formato: "moneda" },
    { clave: "mes", etiqueta: "Minimum for a month", formato: "moneda" },
  ],
});
