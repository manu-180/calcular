import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Monthly salary of KSh 50,000",
    origen: { tipo: "recalculado", url: "https://new.kenyalaw.org/akn/ke/act/2007/11/eng@2024-04-26", detalle: "Section 35(1)(c): 28 days. Pay in lieu: 50,000 / 28 × 28 = 50,000." },
    fecha: "2026-10-17",
    entrada: { pago: "monthly", salario: 50000, contrato: null },
    esperado: { dias: 28, enLugar: 50000 },
  },
  {
    nombre: "Contract gives 60 days",
    origen: { tipo: "recalculado", detalle: "60 days is more than 28, so it applies. 50,000 / 28 × 60 = 107,142.86." },
    fecha: "2026-10-17",
    entrada: { pago: "monthly", salario: 50000, contrato: 60 },
    esperado: { dias: 60, enLugar: 107142.86 },
  },
  {
    nombre: "Weekly pay",
    origen: { tipo: "recalculado", detalle: "One pay period of 7 days. Pay in lieu 7,000." },
    fecha: "2026-10-17",
    entrada: { pago: "weekly", salario: 7000, contrato: null },
    esperado: { dias: 7, enLugar: 7000 },
  },
  {
    nombre: "Daily pay",
    origen: { tipo: "recalculado", detalle: "Section 35(1)(a): no notice." },
    fecha: "2026-10-17",
    entrada: { pago: "daily", salario: 800, contrato: null },
    esperado: { dias: 0, enLugar: 0 },
  },
]);
