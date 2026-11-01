import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.annual-leave-calculator",
  mercado: "mw",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "mw.leave-six-day-week": "numero",
    "mw.leave-five-day-week": "numero",
  },
  campos: [
    {
      id: "semana",
      tipo: "opcion",
      etiqueta: "Days you work each week",
      opciones: [
        { valor: "5", etiqueta: "Five days" },
        { valor: "6", etiqueta: "Six days" },
      ],
      porDefecto: "5",
    },
    { id: "meses", tipo: "entero", etiqueta: "Months worked in the leave year", min: 1, max: 12, porDefecto: 12 },
    {
      id: "diario",
      tipo: "moneda",
      etiqueta: "Your wage for one day",
      min: 0,
      requerido: false,
      ayuda: "Optional. Add it to see what the leave is worth, for example when you leave the job.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.meses < 1 || e.meses > 12) throw new ErrorEntrada("Enter between 1 and 12 months.", "meses");
    const completo = e.semana === "6" ? v["mw.leave-six-day-week"] : v["mw.leave-five-day-week"];
    const dias = Math.round(((completo * e.meses) / 12) * 100) / 100;
    return {
      dias,
      completo,
      pago: e.diario === null ? null : redondear(dias * e.diario),
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Annual leave you have earned", formato: "dias", decimales: 2, destacada: true },
    { clave: "completo", etiqueta: "Leave for a full year", formato: "dias" },
    { clave: "pago", etiqueta: "Leave pay", formato: "moneda" },
  ],
});
