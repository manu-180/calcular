import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.overtime-calculator",
  mercado: "zm",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "zm.overtime-factor": "numero",
    "zm.rest-day-factor": "numero",
    "zm.hourly-divisor": "numero",
    "zm.guard-hourly-divisor": "numero",
    "zm.weekly-hours": "numero",
    "zm.guard-weekly-hours": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 5000 },
    { id: "guardia", tipo: "si-no", etiqueta: "You work as a watchperson or guard", porDefecto: false },
    {
      id: "horasExtra",
      tipo: "numero",
      etiqueta: "Overtime hours in the month",
      min: 0,
      porDefecto: 10,
      ayuda: "Hours above the weekly limit, added up for the month.",
    },
    {
      id: "horasDescanso",
      tipo: "numero",
      etiqueta: "Hours worked on public holidays or your weekly rest day",
      min: 0,
      porDefecto: 0,
      ayuda: "Only days that are not part of your normal working week.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const divisor = e.guardia ? v["zm.guard-hourly-divisor"] : v["zm.hourly-divisor"];
    const hora = e.basico / divisor;
    const extra = redondear(e.horasExtra * hora * v["zm.overtime-factor"]);
    const descanso = redondear(e.horasDescanso * hora * v["zm.rest-day-factor"]);
    return {
      total: redondear(extra + descanso),
      hora: redondear(hora),
      extra,
      descanso,
      limite: e.guardia ? v["zm.guard-weekly-hours"] : v["zm.weekly-hours"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay for the month", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your hourly rate", formato: "moneda" },
    { clave: "extra", etiqueta: "Pay for hours above the weekly limit", formato: "moneda" },
    { clave: "descanso", etiqueta: "Pay for public holidays and rest days", formato: "moneda", ocultarSiCero: true },
    { clave: "limite", etiqueta: "Weekly hours before overtime", formato: "horas" },
  ],
});
