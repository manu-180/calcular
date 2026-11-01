import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.overtime-pay-calculator",
  mercado: "bt",
  concepto: "horas-extra",
  slug: "overtime-pay-calculator",
  estado: "publicado",
  requiere: {
    "bt.overtime-min-factor": "numero",
    "bt.night-duty-premium": "numero",
    "bt.public-holiday-premium": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Normal rate of pay for one month (basic pay only)", min: 0, porDefecto: 25000, ayuda: "Leave out allowances and bonuses. The Act's normal rate of pay excludes them." },
    { id: "horasMes", tipo: "numero", etiqueta: "Normal working hours in your month", min: 1, max: 400, porDefecto: 208, ayuda: "The Ministry fixes working hours by executive order. Use the hours in your contract." },
    { id: "horasExtra", tipo: "numero", etiqueta: "Overtime hours", min: 0, porDefecto: 10 },
    { id: "factor", tipo: "numero", etiqueta: "Overtime rate as a multiple of your normal rate", min: 1, max: 5, porDefecto: 1, ayuda: "The Act sets a floor of 1. Your contract or company rules may pay more." },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your normal monthly pay.", "mensual");
    if (e.factor < v["bt.overtime-min-factor"]) throw new ErrorEntrada("The overtime rate cannot be lower than the normal rate of pay.", "factor");
    const hora = e.mensual / e.horasMes;
    return {
      total: redondear(hora * e.factor * e.horasExtra),
      hora: redondear(hora),
      tarifa: redondear(hora * e.factor),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Normal hourly rate", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Rate for each overtime hour", formato: "moneda" },
  ],
});
