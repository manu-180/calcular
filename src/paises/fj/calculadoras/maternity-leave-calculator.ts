import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.maternity-leave-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "borrador",
  requiere: { "fj.maternity-leave-days": "numero" },
  campos: [{ id: "pagoSemanal", tipo: "moneda", etiqueta: "Your weekly wage", min: 0, porDefecto: 400 }],
  calcular(e, v, { redondear }) {
    if (e.pagoSemanal <= 0) throw new ErrorEntrada("Enter your weekly wage.", "pagoSemanal");
    const dias = v["fj.maternity-leave-days"];
    return { dias, semanas: redondear(dias / 7), pago: redondear((e.pagoSemanal * dias) / 7) };
  },
  resultado: [
    { clave: "dias", etiqueta: "Days of leave", formato: "dias" },
    { clave: "semanas", etiqueta: "Weeks of leave", formato: "semanas", decimales: 1 },
    { clave: "pago", etiqueta: "Pay during the leave", formato: "moneda", destacada: true },
  ],
});
