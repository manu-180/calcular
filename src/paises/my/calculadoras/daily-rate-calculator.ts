import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "my.daily-rate-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "daily-rate-calculator",
  estado: "publicado",
  requiere: {
    "my.ordinary-rate-divisor": "numero",
    "my.ordinary-rate-divisor-weekly": "numero",
    "my.overtime-multipliers": "mapa",
  },
  campos: [
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "How you are paid",
      opciones: [
        { valor: "monthly", etiqueta: "By the month" },
        { valor: "weekly", etiqueta: "By the week" },
      ],
      porDefecto: "monthly",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Your wages for that period", min: 0, porDefecto: 3000 },
    { id: "horasDia", tipo: "numero", etiqueta: "Normal hours of work a day", min: 1, max: 8, porDefecto: 8 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.pago <= 0) throw new ErrorEntrada("Enter your wages.", "pago");
    if (entrada.horasDia <= 0 || entrada.horasDia > 8) throw new ErrorEntrada("Normal hours are between 1 and 8 a day.", "horasDia");
    const divisor = entrada.base === "monthly" ? v["my.ordinary-rate-divisor"] : v["my.ordinary-rate-divisor-weekly"];
    const diario = redondear(entrada.pago / divisor);
    const hora = redondear(diario / entrada.horasDia);
    return {
      diario,
      hora,
      horaExtra: redondear(hora * enMapa(v["my.overtime-multipliers"], "overtime")),
      divisor,
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Ordinary rate of pay (a day)", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Hourly rate of pay", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Overtime rate on a normal working day", formato: "moneda" },
    { clave: "divisor", etiqueta: "Divisor used", formato: "numero", decimales: 0 },
  ],
});
