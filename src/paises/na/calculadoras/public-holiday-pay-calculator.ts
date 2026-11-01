import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { valorDia, valorHora } from "../lib/nomina";

export default definirCalculadora({
  id: "na.public-holiday-pay-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "public-holiday-pay-calculator",
  estado: "publicado",
  requiere: {
    "na.weeks-per-month": "numero",
    "na.max-weekly-hours": "numero",
    "na.sunday-factor": "numero",
    "na.public-holiday-factor": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Basic wage a month", min: 0, porDefecto: 10000 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Ordinary hours a week", min: 1, max: 60, porDefecto: 45 },
    {
      id: "dias",
      tipo: "opcion",
      etiqueta: "Days you normally work in a week",
      opciones: [
        { valor: "5", etiqueta: "5 days" },
        { valor: "6", etiqueta: "6 days" },
      ],
      porDefecto: "5",
    },
    {
      id: "dia",
      tipo: "opcion",
      etiqueta: "The day you worked",
      opciones: [
        { valor: "holiday-normal", etiqueta: "Public holiday on one of my normal work days" },
        { valor: "holiday-off", etiqueta: "Public holiday on a day I do not normally work" },
        { valor: "sunday-off", etiqueta: "Sunday, which I do not normally work" },
        { valor: "sunday-normal", etiqueta: "Sunday, which is one of my normal work days" },
      ],
      porDefecto: "holiday-normal",
    },
    { id: "horas", tipo: "numero", etiqueta: "Hours you worked that day", min: 0, max: 24, porDefecto: 9 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your basic wage.", "salario");
    if (e.horas <= 0) throw new ErrorEntrada("Enter the hours you worked.", "horas");
    const semanas = v["na.weeks-per-month"];
    const hora = redondear(valorHora(e.salario, semanas, Math.min(e.horasSemana, v["na.max-weekly-hours"])));
    const diaria = redondear(valorDia(e.salario, semanas, Number(e.dias)));
    let extra: number;
    let total: number;
    if (e.dia === "holiday-normal" || e.dia === "sunday-normal") {
      // Secciones 21(7) y 22(5)(a)(ii): la paga del día más el valor hora por cada hora trabajada.
      extra = redondear(hora * e.horas);
      total = redondear(diaria + extra);
    } else {
      const factor = e.dia === "sunday-off" ? v["na.sunday-factor"] : v["na.public-holiday-factor"];
      extra = redondear(hora * e.horas * factor);
      total = extra;
    }
    const observaciones =
      e.dia === "holiday-normal"
        ? ["If you ask and your employer agrees, you can instead get your daily pay plus half your hourly wage for each hour, and the same time off in the next week."]
        : e.dia === "sunday-off"
          ? ["If you agree and get the same time off in the next week, your employer may pay one and a half times your hourly wage instead."]
          : [];
    return { extra, total, hora, diaria, observaciones };
  },
  resultado: [
    { clave: "extra", etiqueta: "Extra pay on top of your monthly wage", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total pay for the day", formato: "moneda" },
    { clave: "hora", etiqueta: "Your hourly basic wage", formato: "moneda" },
    { clave: "diaria", etiqueta: "Your daily pay", formato: "moneda" },
  ],
});
