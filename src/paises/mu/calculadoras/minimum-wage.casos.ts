import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Minimum wage in 2026",
    origen: {
      tipo: "oficial",
      url: "https://labour.govmu.org/Documents/Legislations/NWCC/The%20National%20Minimum%20Wage_Amd_Regulations%202026%20gazetted%20on%2017.1.2026.pdf",
      detalle: "GN 8 of 2026: 17,745 rupees from 1 January 2026. Hourly 17,745 / 195 = 91.",
    },
    fecha: "2026-10-24",
    entrada: { sueldo: 17000 },
    esperado: { minimo: 17745, anual: 212940, porHora: 91, faltante: 745 },
  },
  {
    nombre: "December 2025, before the increase",
    origen: { tipo: "oficial", url: "https://labour.govmu.org/Documents/NWCC/The%20NMW_Amd%20Reg%202025.pdf", detalle: "GN 8 of 2025: 17,110 rupees." },
    fecha: "2025-12-31",
    entrada: { sueldo: null },
    esperado: { minimo: 17110, faltante: null },
  },
]);
