import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.annual-leave-calculator",
  mercado: "fj",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "borrador",
  requiere: { "fj.annual-leave-days": "numero" },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months worked", min: 0, max: 12, porDefecto: 12 },
    { id: "pagoDiario", tipo: "moneda", etiqueta: "Pay for one working day", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.pagoDiario <= 0) throw new ErrorEntrada("Enter the pay for one working day.", "pagoDiario");
    const dias = redondear((v["fj.annual-leave-days"] * e.meses) / 12);
    return { dias, pago: redondear(dias * e.pagoDiario) };
  },
  resultado: [
    { clave: "dias", etiqueta: "Annual leave days", formato: "dias", decimales: 2 },
    { clave: "pago", etiqueta: "Pay for the leave", formato: "moneda", destacada: true },
  ],
});
