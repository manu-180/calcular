import { definirCasos } from "@/motor/calculo";
import calculadora from "./dividend-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "ETB 10,000 dividend",
    origen: { tipo: "recalculado", detalle: "Article 57(1): 15% of the gross dividend = 1,500." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, tipo: "dividend" },
    esperado: { impuesto: 1500, neto: 8500, tasa: 15 },
  },
  {
    nombre: "ETB 10,000 interest",
    origen: { tipo: "recalculado", detalle: "Article 58(1): 10% = 1,000." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, tipo: "interest" },
    esperado: { impuesto: 1000, tasa: 10 },
  },
  {
    nombre: "ETB 10,000 royalty from art and culture",
    origen: { tipo: "recalculado", detalle: "Article 56(1)(b): 5% = 500." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, tipo: "royalty-art" },
    esperado: { impuesto: 500, tasa: 5 },
  },
  {
    nombre: "ETB 10,000 royalty",
    origen: { tipo: "recalculado", detalle: "Article 56(1)(a): 10% = 1,000." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, tipo: "royalty" },
    esperado: { impuesto: 1000 },
  },
  {
    nombre: "ETB 50,000 lottery win",
    origen: { tipo: "recalculado", detalle: "Article 59(1): 20% = 10,000." },
    fecha: "2026-10-27",
    entrada: { importe: 50000, tipo: "winnings" },
    esperado: { impuesto: 10000, neto: 40000, tasa: 20 },
  },
]);
