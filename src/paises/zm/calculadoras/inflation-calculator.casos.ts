import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "September 2025 to September 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.zamstats.gov.zm/wp-content/uploads/2026/09/Vol-282-of-2026-The-Monthly-September-Flnal.pdf",
      detalle: "CPI 528.56 to 560.73: annual inflation of 6.1%, as ZamStats reports. K1,000 × 560.73 / 528.56 = K1,060.86.",
    },
    fecha: "2026-10-26",
    entrada: { importe: 1000, mes: "09", anio: 2025 },
    esperado: { actualizado: 1060.86, ipcInicial: 528.56, ipcFinal: 560.73 },
  },
  {
    nombre: "January 2018 to September 2026",
    origen: { tipo: "recalculado", detalle: "K500 × 560.73 / 203.15 = K1,380.09." },
    fecha: "2026-10-26",
    entrada: { importe: 500, mes: "01", anio: 2018 },
    esperado: { actualizado: 1380.09, ipcInicial: 203.15 },
  },
  {
    nombre: "Before the series starts",
    origen: { tipo: "recalculado", detalle: "The series starts in January 2018." },
    fecha: "2026-10-26",
    entrada: { importe: 500, mes: "12", anio: 2017 },
    esperaError: true,
  },
]);
