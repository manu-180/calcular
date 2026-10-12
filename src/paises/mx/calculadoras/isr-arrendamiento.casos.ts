import { definirCasos } from "@/motor/calculo";
import arrendamiento from "./isr-arrendamiento";

export default definirCasos(arrendamiento, [
  {
    nombre: "Renta de 20,000 a una empresa con deducción opcional",
    origen: {
      tipo: "recalculado",
      detalle: "LISR art. 115: 35 % = 7000. Base 13000. Tarifa mensual 2026: 1011.68 + (13000 − 12598.03) × 16 % = 1076.00. Art. 116: la empresa retiene 10 % = 2000; no queda nada por pagar.",
    },
    fecha: "2026-10-15",
    entrada: { renta: 20000, deduccion: "ciega", gastos: null, predial: null, inquilino: "moral" },
    esperado: { deducciones: 7000, base: 13000, isr: 1076, retencion: 2000, aPagar: 0 },
  },
  {
    nombre: "Renta de 20,000 a una persona con gastos reales y predial",
    origen: { tipo: "recalculado", detalle: "Base 20000 − 3000 − 500 = 16500. 1339.14 + (16500 − 14644.65) × 17.92 % = 1671.62. Sin retención." },
    fecha: "2026-10-15",
    entrada: { renta: 20000, deduccion: "reales", gastos: 3000, predial: 500, inquilino: "fisica" },
    esperado: { deducciones: 3500, base: 16500, isr: 1671.62, retencion: 0, aPagar: 1671.62 },
  },
]);
