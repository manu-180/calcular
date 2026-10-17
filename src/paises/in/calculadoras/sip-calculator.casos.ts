import { definirCasos } from "@/motor/calculo";
import calculadora from "./sip-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹10,000 a month for 10 years at 12%",
    origen: { tipo: "recalculado", detalle: "i = 1% a month, n = 120: FV = 10,000 × ((1.01^120 − 1) / 0.01) × 1.01 = 23,23,390.76." },
    fecha: "2026-10-15",
    entrada: { cuota: 10000, retorno: 12, anios: 10, aumento: 0 },
    esperado: { valor: 2323390.76, invertido: 1200000, ganancia: 1123390.76 },
  },
  {
    nombre: "₹5,000 a month for 20 years at 10%",
    origen: { tipo: "recalculado", detalle: "i = 10 / 1200, n = 240: FV = 38,28,484.55 on 12,00,000 invested." },
    fecha: "2026-10-15",
    entrada: { cuota: 5000, retorno: 10, anios: 20, aumento: 0 },
    esperado: { valor: 3828484.55, invertido: 1200000 },
  },
  {
    nombre: "Step-up of 10% at 0% return",
    origen: { tipo: "recalculado", detalle: "Year 1: 12 × 1,000 = 12,000; year 2: 12 × 1,100 = 13,200. Total 25,200." },
    fecha: "2026-10-15",
    entrada: { cuota: 1000, retorno: 0, anios: 2, aumento: 10 },
    esperado: { valor: 25200, invertido: 25200, ganancia: 0 },
  },
]);
