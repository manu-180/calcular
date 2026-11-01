import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const JIS = "https://jis.gov.jm/labour-laws/";

export default definirCasos(calculadora, [
  {
    nombre: "6 years of service",
    origen: { tipo: "oficial", url: JIS, detalle: "4 weeks' notice for 5 or more but less than 10 years. Pay in lieu 4 × 40,000 = 160,000." },
    fecha: "2026-10-24",
    entrada: { anios: 6, semanal: 40000, contrato: null },
    esperado: { semanas: 4, enLugar: 160000, empleado: 2 },
  },
  {
    nombre: "2 years of service",
    origen: { tipo: "oficial", url: JIS, detalle: "2 weeks' notice for less than 5 years." },
    fecha: "2026-10-24",
    entrada: { anios: 2, semanal: 30000, contrato: null },
    esperado: { semanas: 2, enLugar: 60000 },
  },
  {
    nombre: "Exactly 10 years",
    origen: { tipo: "oficial", url: JIS, detalle: "6 weeks for 10 or more but less than 15 years." },
    fecha: "2026-10-24",
    entrada: { anios: 10, semanal: 50000, contrato: null },
    esperado: { semanas: 6 },
  },
  {
    nombre: "18 years of service",
    origen: { tipo: "oficial", url: JIS, detalle: "8 weeks for 15 or more but less than 20 years." },
    fecha: "2026-10-24",
    entrada: { anios: 18, semanal: 50000, contrato: null },
    esperado: { semanas: 8 },
  },
  {
    nombre: "25 years of service",
    origen: { tipo: "oficial", url: JIS, detalle: "12 weeks for 20 or more years." },
    fecha: "2026-10-24",
    entrada: { anios: 25, semanal: 50000, contrato: null },
    esperado: { semanas: 12, enLugar: 600000 },
  },
  {
    nombre: "Contract gives 8 weeks after 3 years",
    origen: { tipo: "recalculado", detalle: "8 weeks is more than the legal 2 weeks, so it applies." },
    fecha: "2026-10-24",
    entrada: { anios: 3, semanal: 40000, contrato: 8 },
    esperado: { semanas: 8, legal: 2, enLugar: 320000 },
  },
]);
