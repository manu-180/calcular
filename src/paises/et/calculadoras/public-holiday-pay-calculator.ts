import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.public-holiday-pay-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "public-holiday-pay-calculator",
  estado: "publicado",
  requiere: {
    "et.holiday-pay-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 10400 },
    { id: "horasMes", tipo: "numero", etiqueta: "Normal hours you work in a month", min: 1, max: 300, porDefecto: 208, ayuda: "48 hours a week over 52 weeks is 208 hours a month." },
    { id: "horas", tipo: "numero", etiqueta: "Hours worked on public holidays", min: 0, max: 400, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    if (e.horas <= 0) throw new ErrorEntrada("Enter the hours you worked on public holidays.", "horas");
    const hora = e.salario / e.horasMes;
    return {
      pago: redondear(e.horas * hora * v["et.holiday-pay-rate"]),
      hora: redondear(hora),
      factor: v["et.holiday-pay-rate"],
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pay for the hours worked on public holidays", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your ordinary hourly rate", formato: "moneda" },
    { clave: "factor", etiqueta: "Multiplier", formato: "numero", decimales: 1 },
  ],
});
