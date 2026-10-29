import { definirCasos } from "@/motor/calculo";
import calculadora from "./ssf-calculator";

const SSF = "https://ssf.gov.np/list/act_regulation/social-security-operation-procedure-2075-with-5th-ammendment" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 40,000 basic pay",
    origen: {
      tipo: "recalculado",
      url: SSF,
      detalle: "11% × 40,000 = 4,400. 20% × 40,000 = 8,000. Total 12,400 (31%). Old-age 28.33% = 11,332. Health 1.20% = 480. Accident 0.80% = 320. Dependants 0.67% = 268.",
    },
    fecha: "2026-10-29",
    entrada: { basico: 40000 },
    esperado: { trabajador: 4400, empleador: 8000, total: 12400, anual: 148800, vejez: 11332, salud: 480, accidente: 320, dependientes: 268, previsional: 8000, gratificacion: 3332 },
  },
  {
    nombre: "NPR 12,170 basic pay, the minimum",
    origen: { tipo: "recalculado", detalle: "11% × 12,170 = 1,338.70. 20% × 12,170 = 2,434. Total 3,772.70." },
    fecha: "2026-10-29",
    entrada: { basico: 12170 },
    esperado: { trabajador: 1338.7, empleador: 2434, total: 3772.7 },
  },
  {
    nombre: "No basic pay",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { basico: 0 },
    esperaError: true,
  },
]);
