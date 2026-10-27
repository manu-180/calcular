import { definirCasos } from "@/motor/calculo";
import calculadora from "./transfer-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K250,000 by mobile money",
    origen: { tipo: "recalculado", detalle: "Above K100,000, so 0.05% of 250,000 = 125." },
    fecha: "2026-10-27",
    entrada: { monto: 250000, canal: "mobile" },
    esperado: { levy: 125, total: 250125 },
  },
  {
    nombre: "K100,000 by mobile money pays nothing",
    origen: { tipo: "recalculado", detalle: "The levy applies to mobile money transfers in excess of K100,000." },
    fecha: "2026-10-27",
    entrada: { monto: 100000, canal: "mobile" },
    esperado: { levy: 0, total: 100000 },
  },
  {
    nombre: "K50,000 by bank transfer",
    origen: { tipo: "recalculado", detalle: "Every bank transfer pays: 0.05% of 50,000 = 25." },
    fecha: "2026-10-27",
    entrada: { monto: 50000, canal: "bank" },
    esperado: { levy: 25 },
  },
  {
    nombre: "Zero is rejected",
    origen: { tipo: "recalculado", detalle: "The amount has to be above zero." },
    fecha: "2026-10-27",
    entrada: { monto: 0, canal: "bank" },
    esperaError: true,
  },
]);
