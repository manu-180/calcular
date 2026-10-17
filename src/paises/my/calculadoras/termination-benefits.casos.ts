import { definirCasos } from "@/motor/calculo";
import calculadora from "./termination-benefits";

const FAQ = "https://jtksm.mohr.gov.my/en/frequently-asked-questions/employees-retrenchment/how-termination-benefit-payment-calculated-and";

export default definirCasos(calculadora, [
  {
    nombre: "RM3,000 after 3 years",
    origen: { tipo: "oficial", url: FAQ, detalle: "JTKSM formula: 12 months / 365 days' salary × years × 15 days. 36,000 / 365 = 98.63; 98.63 × 15 × 3 = 4,438.35." },
    fecha: "2026-10-16",
    entrada: { sueldo: 3000, anios: 3, meses: 0 },
    esperado: { total: 4438.35, diasPorAnio: 15, dias: 45, diario: 98.63 },
  },
  {
    nombre: "RM4,000 after 5 years and 6 months",
    origen: { tipo: "recalculado", detalle: "48,000 / 365 = 131.51; 20 days × 5.5 years = 110 days; 131.51 × 110 = 14,466.10." },
    fecha: "2026-10-16",
    entrada: { sueldo: 4000, anios: 5, meses: 6 },
    esperado: { total: 14466.1, diasPorAnio: 20, dias: 110 },
  },
  {
    nombre: "RM2,000 after 1 year and 6 months",
    origen: { tipo: "recalculado", detalle: "24,000 / 365 = 65.75; 10 days × 1.5 = 15 days; 986.25." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2000, anios: 1, meses: 6 },
    esperado: { total: 986.25, diasPorAnio: 10 },
  },
  {
    nombre: "12 extra months",
    origen: { tipo: "recalculado", detalle: "Extra months go from 0 to 11." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2000, anios: 1, meses: 12 },
    esperaError: true,
  },
]);
