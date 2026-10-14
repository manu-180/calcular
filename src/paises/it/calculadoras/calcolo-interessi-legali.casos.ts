import { definirCasos } from "@/motor/calculo";
import interessiLegali from "./calcolo-interessi-legali";

export default definirCasos(interessiLegali, [
  {
    nombre: "10.000 euro dal 1° gennaio 2025 al 1° gennaio 2026",
    origen: {
      tipo: "recalculado",
      detalle: "2025: 364 giorni al 2% su 365 = 199,45; 2026: 1 giorno all'1,6% = 0,44. Totale 199,89 su 365 giorni.",
    },
    fecha: "2026-10-14",
    entrada: { capitale: 10000, dal: "2025-01-01", al: "2026-01-01" },
    esperado: { interessi: 199.89, totale: 10199.89, giorni: 365 },
  },
  {
    nombre: "Anno bisestile 2024 al 2,5%",
    origen: { tipo: "recalculado", detalle: "5.000 × 2,5% × 366 / 366 = 125." },
    fecha: "2026-10-14",
    entrada: { capitale: 5000, dal: "2023-12-31", al: "2024-12-31" },
    esperado: { interessi: 125, giorni: 366 },
  },
  {
    nombre: "Sei mesi del 2023 al 5%",
    origen: { tipo: "recalculado", detalle: "1.000 × 5% × 181 / 365 = 24,79." },
    fecha: "2026-10-14",
    entrada: { capitale: 1000, dal: "2023-01-01", al: "2023-07-01" },
    esperado: { interessi: 24.79, giorni: 181 },
  },
  {
    nombre: "Data finale prima di quella iniziale",
    origen: { tipo: "recalculado", detalle: "Il periodo deve avere almeno un giorno." },
    fecha: "2026-10-14",
    entrada: { capitale: 1000, dal: "2025-07-01", al: "2025-01-01" },
    esperaError: true,
  },
]);
