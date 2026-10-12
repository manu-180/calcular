import { definirCasos } from "@/motor/calculo";
import costo from "./costo-de-un-trabajador";

export default definirCasos(costo, [
  {
    nombre: "Sueldo de 15,000 al mes con 3 % de impuesto sobre nómina",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 500; SBC 500 × 1.0493151 = 524.66. Aguinaldo 500 × 15 / 12 = 625. Prima 500 × 12 × 25 % / 12 = 125. IMSS (23.93124 + 172.73 × 1.10 % + 524.66 × 5.04355 %) × 30.4 = 1589.70. RCV 524.66 × 9.513 % × 30.4 = 1517.29. Infonavit 26.233 × 30.4 = 797.48. ISN 3 % × 15750 = 472.50. Total 20126.97.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 15000, region: "general", antiguedad: 1, clase: "clase-i", primaRiesgo: null, isn: 3 },
    esperado: { aguinaldo: 625, primaVacacional: 125, imss: 1589.7, rcv: 1517.29, infonavit: 797.48, isn: 472.5, total: 20126.97, anual: 241523.64 },
  },
  {
    nombre: "Salario mínimo sin impuesto sobre nómina",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 315.04 × 30 = 9451.20 al mes. SBC 315.04 × 1.0493151 = 330.58, ya no es el mínimo: la cuota obrera la paga el trabajador. Aguinaldo 315.04 × 15 / 12 = 393.80. Prima 315.04 × 12 × 25 % / 12 = 78.76.",
    },
    fecha: "2026-10-15",
    entrada: { sueldo: 9451.2, region: "general", antiguedad: 1, clase: "clase-i", primaRiesgo: null, isn: null },
    esperado: { aguinaldo: 393.8, primaVacacional: 78.76, isn: 0 },
  },
]);
