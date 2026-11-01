import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Leaving after eight months with 5 days taken",
    origen: {
      tipo: "recalculado",
      detalle: "Labour Act 2023, s. 109(2): leave accrues month by month. 24 × 8 / 12 = 16 days, minus 5 taken = 11. Daily rate 11,000 / 22 = 500. Pay 5,500.",
    },
    fecha: "2026-10-27",
    entrada: { derecho: 24, meses: 8, tomados: 5, salario: 11000, laborables: 22 },
    esperado: { acumulados: 16, pendientes: 11, diario: 500, pago: 5500 },
  },
  {
    nombre: "Full year, nothing taken",
    origen: { tipo: "recalculado", detalle: "21 days × 10,000 / 22 = 9,545.45." },
    fecha: "2026-10-27",
    entrada: { derecho: 21, meses: 12, tomados: 0, salario: 10000, laborables: 22 },
    esperado: { pendientes: 21, pago: 9545.45 },
  },
  {
    nombre: "More leave taken than built up",
    origen: { tipo: "recalculado", detalle: "21 × 3 / 12 = 5.25 built up, 10 taken: nothing to pay." },
    fecha: "2026-10-27",
    entrada: { derecho: 21, meses: 3, tomados: 10, salario: 10000, laborables: 22 },
    esperado: { pendientes: 0, pago: 0 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { derecho: 21, meses: 12, tomados: 0, salario: 0, laborables: 22 },
    esperaError: true,
  },
]);
