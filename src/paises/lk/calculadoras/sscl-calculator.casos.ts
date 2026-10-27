import { definirCasos } from "@/motor/calculo";
import calculadora from "./sscl-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Retailer with Rs. 20 million in the quarter",
    origen: { tipo: "recalculado", detalle: "Wholesale or retail: 50% of turnover is liable. 10,000,000 × 2.5% = 250,000." },
    fecha: "2026-10-26",
    entrada: { actividad: "trade", facturacion: 20000000 },
    esperado: { sscl: 250000, parte: 50, sujeta: 10000000, tasaEfectiva: 1.25 },
  },
  {
    nombre: "Manufacturer with Rs. 20 million in the quarter",
    origen: { tipo: "recalculado", detalle: "85% liable: 17,000,000 × 2.5% = 425,000." },
    fecha: "2026-10-26",
    entrada: { actividad: "manufacture", facturacion: 20000000 },
    esperado: { sscl: 425000, sujeta: 17000000 },
  },
  {
    nombre: "Registered distributor with Rs. 40 million",
    origen: { tipo: "recalculado", detalle: "25% liable: 10,000,000 × 2.5% = 250,000." },
    fecha: "2026-10-26",
    entrada: { actividad: "distributor", facturacion: 40000000 },
    esperado: { sscl: 250000 },
  },
  {
    nombre: "Service provider with Rs. 12 million in the quarter",
    origen: { tipo: "recalculado", detalle: "100% liable: 12,000,000 × 2.5% = 300,000, below the quarterly threshold." },
    fecha: "2026-10-26",
    entrada: { actividad: "service", facturacion: 12000000 },
    esperado: { sscl: 300000, porMes: 100000 },
  },
]);
