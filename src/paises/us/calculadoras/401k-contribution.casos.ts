import { definirCasos } from "@/motor/calculo";
import calculadora from "./401k-contribution";

const N = "https://www.irs.gov/pub/irs-drop/n-25-67.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Age 35, 6% with a 50% match up to 6%",
    origen: { tipo: "recalculado", url: N, detalle: "6% of 75000 = 4500. Match 50% of 4500 = 2250. Total 6750. Limit 24500; 24500 / 75000 = 32.67%." },
    fecha: "2026-10-14",
    entrada: { sueldo: 75000, aporte: 6, edad: 35, coincidencia: 50, topeCoincidencia: 6 },
    esperado: { limite: 24500, catchUp: 0, aporte: 4500, porMes: 375, coincidencia: 2250, total: 6750, paraElMaximo: 32.67 },
  },
  {
    nombre: "Age 61 with the higher catch-up",
    origen: { tipo: "recalculado", url: N, detalle: "Limit 24500 + 11250 = 35750. 15% of 300000 = 45000, capped. Match 100% up to 4% = 12000." },
    fecha: "2026-10-14",
    entrada: { sueldo: 300000, aporte: 15, edad: 61, coincidencia: 100, topeCoincidencia: 4 },
    esperado: { limite: 35750, catchUp: 11250, aporte: 35750, coincidencia: 12000, total: 47750 },
  },
  {
    nombre: "Age 55 with the regular catch-up",
    origen: { tipo: "recalculado", url: N, detalle: "Limit 24500 + 8000 = 32500. 30% of 100000 = 30000 fits." },
    fecha: "2026-10-14",
    entrada: { sueldo: 100000, aporte: 30, edad: 55, coincidencia: 0, topeCoincidencia: 0 },
    esperado: { limite: 32500, aporte: 30000, coincidencia: 0 },
  },
  {
    nombre: "Age 64 goes back to the regular catch-up",
    origen: { tipo: "recalculado", url: N, detalle: "The 11250 amount is only for ages 60 to 63." },
    fecha: "2026-10-14",
    entrada: { sueldo: 200000, aporte: 50, edad: 64, coincidencia: 0, topeCoincidencia: 0 },
    esperado: { limite: 32500, aporte: 32500 },
  },
]);
