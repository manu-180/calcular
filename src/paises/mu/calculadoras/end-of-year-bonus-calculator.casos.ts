import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-year-bonus-calculator";

const WRA = "https://www.mra.mu/download/WorkersRightsAct2019.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Full year on Rs 30,000",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 54: 360,000 / 12 = 30,000. 75% = 22,500 before Christmas, 7,500 by year end." },
    fecha: "2026-10-24",
    entrada: { sueldo: 30000, meses: 12, extras: 0, situacion: "employed" },
    esperado: { bono: 30000, primera: 22500, saldo: 7500 },
  },
  {
    nombre: "Joined in April, with overtime",
    origen: { tipo: "recalculado", url: WRA, detalle: "9 × 24,000 + 18,000 = 234,000; / 12 = 19,500. 75% = 14,625." },
    fecha: "2026-10-24",
    entrada: { sueldo: 24000, meses: 9, extras: 18000, situacion: "employed" },
    esperado: { bono: 19500, ganancias: 234000, primera: 14625, saldo: 4875 },
  },
  {
    nombre: "Resigned after 7 months",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 54(3)(c): at least 8 months before resigning." },
    fecha: "2026-10-24",
    entrada: { sueldo: 30000, meses: 7, extras: 0, situacion: "resigned" },
    esperado: { bono: 0, primera: null },
  },
  {
    nombre: "Resigned after 8 months",
    origen: { tipo: "recalculado", url: WRA, detalle: "8 × 30,000 / 12 = 20,000." },
    fecha: "2026-10-24",
    entrada: { sueldo: 30000, meses: 8, extras: 0, situacion: "resigned" },
    esperado: { bono: 20000, primera: null, saldo: null },
  },
  {
    nombre: "Contract ended after 5 months",
    origen: { tipo: "recalculado", url: WRA, detalle: "Section 54(3)(aa): 5 × 18,000 / 12 = 7,500." },
    fecha: "2026-10-24",
    entrada: { sueldo: 18000, meses: 5, extras: 0, situacion: "left" },
    esperado: { bono: 7500 },
  },
]);
