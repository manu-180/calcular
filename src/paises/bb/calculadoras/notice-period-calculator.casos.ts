import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const URL = "https://labour.gov.bb/wp-content/uploads/PDF/Employment-Rights-Act-2012-9-Corrected-Copy.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Monthly paid, 6 years, employer gives notice",
    origen: { tipo: "recalculado", url: URL, detalle: "Section 22(3)(a): one month where service is under 10 years. 1 × 5,000 = 5,000.00 in lieu." },
    fecha: "2026-10-27",
    entrada: { pago: "monthly", quien: "empleador", anios: 6, sueldo: 5000 },
    esperado: { aviso: "1 month", enLugar: 5000 },
  },
  {
    nombre: "Weekly paid, 7 years",
    origen: { tipo: "recalculado", url: URL, detalle: "Section 22(1)(c): 4 weeks for 5 to under 10 years. 4 × 700 = 2,800.00." },
    fecha: "2026-10-27",
    entrada: { pago: "weekly", quien: "empleador", anios: 7, sueldo: 700 },
    esperado: { aviso: "4 weeks", enLugar: 2800 },
  },
  {
    nombre: "Fortnightly paid, 12 years",
    origen: { tipo: "recalculado", url: URL, detalle: "Section 22(2): 6 weeks for 10 to under 15 years, which is 3 pay periods. 3 × 1,400 = 4,200.00." },
    fecha: "2026-10-27",
    entrada: { pago: "fortnightly", quien: "empleador", anios: 12, sueldo: 1400 },
    esperado: { aviso: "6 weeks", enLugar: 4200 },
  },
  {
    nombre: "Monthly paid, 16 years",
    origen: { tipo: "recalculado", url: URL, detalle: "Section 22(3)(c): 2.5 months. 2.5 × 4,000 = 10,000.00." },
    fecha: "2026-10-27",
    entrada: { pago: "monthly", quien: "empleador", anios: 16, sueldo: 4000 },
    esperado: { aviso: "2.5 months", enLugar: 10000 },
  },
  {
    nombre: "Employee resigning, monthly paid",
    origen: { tipo: "recalculado", url: URL, detalle: "Section 22(4)(c): one month." },
    fecha: "2026-10-27",
    entrada: { pago: "monthly", quien: "empleado", anios: 3, sueldo: 0 },
    esperado: { aviso: "1 month" },
  },
  {
    nombre: "Under one year of service",
    origen: { tipo: "recalculado", detalle: "The statutory minimum applies from one year." },
    fecha: "2026-10-27",
    entrada: { pago: "monthly", quien: "empleador", anios: 0.5, sueldo: 0 },
    esperaError: true,
  },
]);
