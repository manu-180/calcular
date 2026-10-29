import { definirCasos } from "@/motor/calculo";
import calculadora from "./gratuity-calculator";

const ACT = "https://ssf.gov.np/images/news/16430171669623_labor-act-2074.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "NPR 40,000 basic pay, 5 years",
    origen: { tipo: "recalculado", url: ACT, detalle: "8.33% × 40,000 = 3,332 a month. × 60 = 199,920. Provident 10% × 40,000 = 4,000 a month × 60 = 240,000 each side." },
    fecha: "2026-10-29",
    entrada: { basico: 40000, meses: 60 },
    esperado: { gratificacion: 199920, mensual: 3332, anual: 39984, previsionalTrabajador: 240000, previsionalEmpleador: 240000 },
  },
  {
    nombre: "One year on NPR 12,170",
    origen: { tipo: "recalculado", url: ACT, detalle: "8.33% × 12,170 = 1,013.76 (1,013.761 rounded). × 12 = 12,165.12." },
    fecha: "2026-10-29",
    entrada: { basico: 12170, meses: 12 },
    esperado: { mensual: 1013.76, gratificacion: 12165.12 },
  },
  {
    nombre: "No basic pay",
    origen: { tipo: "recalculado", detalle: "Basic pay has to be more than zero." },
    fecha: "2026-10-29",
    entrada: { basico: 0, meses: 12 },
    esperaError: true,
  },
]);
