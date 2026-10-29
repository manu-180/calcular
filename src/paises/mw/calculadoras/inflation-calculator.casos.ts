import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K100,000 from September 2025 to September 2026",
    origen: { tipo: "recalculado", detalle: "MRA CPI: 1,120,336.60 / 938,503.34 = 1.1937481; × 100,000 = 119,374.81." },
    fecha: "2026-10-27",
    entrada: { importe: 100000, mes: "09", anio: 2025 },
    esperado: { actualizado: 119374.81, diferencia: 19374.81, ipcInicial: 938503.34, ipcFinal: 1120336.6 },
  },
  {
    nombre: "K10,000 from January 2020",
    origen: { tipo: "recalculado", detalle: "1,120,336.60 / CPI January 2020, read from the same MRA table." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, mes: "01", anio: 2020 },
    esperado: { ipcFinal: 1120336.6 },
  },
  {
    nombre: "Latest month is rejected",
    origen: { tipo: "recalculado", detalle: "September 2026 is the latest CPI." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, mes: "09", anio: 2026 },
    esperaError: true,
  },
  {
    nombre: "Before 1991 is rejected",
    origen: { tipo: "recalculado", detalle: "The monthly series starts in January 1991." },
    fecha: "2026-10-27",
    entrada: { importe: 1000, mes: "06", anio: 1990 },
    esperaError: true,
  },
]);
