import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bt.public-holiday-pay-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "public-holiday-pay-calculator",
  estado: "publicado",
  requiere: {
    "bt.public-holiday-premium": "numero",
    "bt.public-holidays-min": "numero",
    "bt.night-duty-premium": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Normal rate of pay for one month", min: 0, porDefecto: 25000, ayuda: "Basic pay only. Allowances and bonuses are not part of the normal rate." },
    { id: "diasMes", tipo: "entero", etiqueta: "Days your employer divides a month into", min: 1, max: 31, porDefecto: 30, ayuda: "The Act does not fix this. Use the divisor in your contract or payslip." },
    { id: "diasTrabajados", tipo: "entero", etiqueta: "Public holidays you were required to work", min: 0, max: 31, porDefecto: 2 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your normal monthly pay.", "mensual");
    const dia = e.mensual / e.diasMes;
    const extra = redondear(dia * (v["bt.public-holiday-premium"] / 100) * e.diasTrabajados);
    const normal = redondear(dia * e.diasTrabajados);
    return {
      extra,
      dia: redondear(dia),
      totalDias: redondear(normal + extra),
      feriados: v["bt.public-holidays-min"],
      observaciones: ["The holiday itself is paid leave at your normal rate. The extra amount is on top of that."],
    };
  },
  resultado: [
    { clave: "extra", etiqueta: "Extra pay for working the holidays", formato: "moneda", destacada: true },
    { clave: "dia", etiqueta: "Normal pay for one day", formato: "moneda" },
    { clave: "totalDias", etiqueta: "Normal pay plus extra for those days", formato: "moneda" },
    { clave: "feriados", etiqueta: "Paid public holidays you are owed each year, at least", formato: "numero" },
  ],
});
