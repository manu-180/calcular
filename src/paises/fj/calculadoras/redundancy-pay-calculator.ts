import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.redundancy-pay-calculator",
  mercado: "fj",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay-calculator",
  estado: "borrador",
  requiere: { "fj.redundancy-weeks-per-year": "numero" },
  campos: [
    { id: "pagoSemanal", tipo: "moneda", etiqueta: "Your weekly wage", min: 0, porDefecto: 400 },
    { id: "anios", tipo: "entero", etiqueta: "Complete years of service", min: 0, max: 60, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.pagoSemanal <= 0) throw new ErrorEntrada("Enter your weekly wage.", "pagoSemanal");
    const semanas = v["fj.redundancy-weeks-per-year"] * e.anios;
    return { semanas, pago: redondear(e.pagoSemanal * semanas) };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Weeks of wages", formato: "semanas" },
    { clave: "pago", etiqueta: "Redundancy pay, at the minimum", formato: "moneda", destacada: true },
  ],
});
