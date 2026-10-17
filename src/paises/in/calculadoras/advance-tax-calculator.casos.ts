import { definirCasos } from "@/motor/calculo";
import calculadora from "./advance-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹2 lakh tax with ₹50,000 TDS",
    origen: {
      tipo: "recalculado",
      detalle: "Advance tax 1,50,000. Cumulative 15%, 45%, 75%, 100%: 22,500; 67,500 − 22,500 = 45,000; 1,12,500 − 67,500 = 45,000; 37,500.",
    },
    fecha: "2026-10-15",
    entrada: { impuesto: 200000, tds: 50000, senior: false, presuntivo: false },
    esperado: { total: 150000, junio: 22500, septiembre: 45000, diciembre: 45000, marzo: 37500 },
  },
  {
    nombre: "Below the ₹10,000 threshold",
    origen: { tipo: "recalculado", detalle: "Tax after TDS 8,000 is under 10,000, so no advance tax." },
    fecha: "2026-10-15",
    entrada: { impuesto: 58000, tds: 50000, senior: false, presuntivo: false },
    esperado: { total: 0 },
  },
  {
    nombre: "Senior citizen with pension and interest only",
    origen: { tipo: "recalculado", detalle: "Section 403(3): no advance tax for a resident aged 60 or more without business income." },
    fecha: "2026-10-15",
    entrada: { impuesto: 300000, tds: 0, senior: true, presuntivo: false },
    esperado: { total: 0 },
  },
  {
    nombre: "Presumptive business income",
    origen: { tipo: "recalculado", detalle: "Section 408(2): the whole 80,000 is due by 15 March." },
    fecha: "2026-10-15",
    entrada: { impuesto: 80000, tds: 0, senior: false, presuntivo: true },
    esperado: { total: 80000, junio: 0, marzo: 80000 },
  },
]);
