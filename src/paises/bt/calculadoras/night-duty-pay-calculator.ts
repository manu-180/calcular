import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.night-duty-pay-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "night-duty-pay-calculator",
  estado: "publicado",
  requiere: {
    "bt.night-duty-premium": "numero",
    "bt.night-work-start-hour": "numero",
    "bt.night-work-end-hour": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Normal rate of pay for one month", min: 0, porDefecto: 25000, ayuda: "Basic pay only. Allowances and bonuses are not part of the normal rate." },
    { id: "horasMes", tipo: "numero", etiqueta: "Normal working hours in your month", min: 1, max: 400, porDefecto: 208, ayuda: "Use the hours in your contract. The Ministry fixes them by executive order." },
    { id: "horasNoche", tipo: "numero", etiqueta: "Hours of night duty", min: 0, porDefecto: 16 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your normal monthly pay.", "mensual");
    const hora = e.mensual / e.horasMes;
    const extra = redondear(hora * (v["bt.night-duty-premium"] / 100) * e.horasNoche);
    return {
      extra,
      hora: redondear(hora),
      extraPorHora: redondear(hora * (v["bt.night-duty-premium"] / 100)),
      inicio: v["bt.night-work-start-hour"],
      fin: v["bt.night-work-end-hour"],
      observaciones: ["The extra applies to employees below supervisory level who are required to do night duty besides the normal day shift."],
    };
  },
  resultado: [
    { clave: "extra", etiqueta: "Extra pay for night duty", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Normal hourly rate", formato: "moneda" },
    { clave: "extraPorHora", etiqueta: "Extra for each hour of night duty", formato: "moneda" },
    { clave: "inicio", etiqueta: "Night work starts at (24-hour clock)", formato: "numero" },
    { clave: "fin", etiqueta: "Night work ends at (24-hour clock)", formato: "numero" },
  ],
});
