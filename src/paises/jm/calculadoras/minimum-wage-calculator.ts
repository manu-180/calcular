import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.minimum-wage-calculator",
  mercado: "jm",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "publicado",
  requiere: {
    "jm.minimum-wage-weekly": "numero",
    "jm.minimum-wage-hourly": "numero",
    "jm.normal-week-hours": "numero",
    "jm.overtime-multiplier": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a week", min: 0, max: 168, porDefecto: 40 },
    { id: "pagoHora", tipo: "moneda", etiqueta: "What you are paid per hour (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.horas <= 0) throw new ErrorEntrada("Enter the hours you work in a week.", "horas");
    const normales = Math.min(e.horas, v["jm.normal-week-hours"]);
    const extra = Math.max(0, e.horas - v["jm.normal-week-hours"]);
    const hora = v["jm.minimum-wage-hourly"];
    const semana = redondear(normales * hora + extra * hora * v["jm.overtime-multiplier"]);
    const observaciones: string[] = [];
    if (extra > 0) observaciones.push("Hours above 40 in the week are paid at time and a half.");
    if (e.pagoHora !== null && e.pagoHora < hora) observaciones.push("Your hourly pay is below the national minimum wage. The Ministry of Labour and Social Security takes complaints.");
    return {
      semana,
      quincena: redondear(semana * 2),
      mes: redondear((semana * 52) / 12),
      anio: redondear(semana * 52),
      minimoSemanal: v["jm.minimum-wage-weekly"],
      hora,
      horaExtra: redondear(hora * v["jm.overtime-multiplier"]),
      observaciones,
    };
  },
  resultado: [
    { clave: "semana", etiqueta: "Minimum pay for your week", formato: "moneda", destacada: true },
    { clave: "quincena", etiqueta: "Minimum pay for a fortnight", formato: "moneda" },
    { clave: "mes", etiqueta: "Monthly equivalent (52 weeks ÷ 12)", formato: "moneda" },
    { clave: "anio", etiqueta: "Over a year of 52 weeks", formato: "moneda" },
    { clave: "minimoSemanal", etiqueta: "National minimum wage for a 40-hour week", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum per hour", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Minimum overtime rate per hour", formato: "moneda" },
  ],
});
