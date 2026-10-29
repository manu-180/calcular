import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

const ACT = "https://lpr.adb.org/sites/default/files/resource/%5Bnid%5D/bhutan-labour-and-employement-act-2007-english.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Resignation on Nu. 25,000 a month",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 68: at least 30 days. Pay in lieu: 25,000 / 30 × 30 = 25,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "standard", anios: null, salario: 25000, contrato: null },
    esperado: { dias: 30, legal: 30, extra: 0, enLugar: 25000 },
  },
  {
    nombre: "Redundancy after 4 years",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 91(b): 30 + 7 × 4 = 58 days. Pay in lieu: 30,000 / 30 × 58 = 58,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "redundancy", anios: 4, salario: 30000, contrato: null },
    esperado: { dias: 58, extra: 28, enLugar: 58000 },
  },
  {
    nombre: "Redundancy after 10 years hits the cap",
    origen: { tipo: "recalculado", url: ACT, detalle: "7 × 10 = 70, capped at 42. 30 + 42 = 72 days. 20,000 / 30 × 72 = 48,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "redundancy", anios: 10, salario: 20000, contrato: null },
    esperado: { dias: 72, extra: 42, enLugar: 48000 },
  },
  {
    nombre: "Probation",
    origen: { tipo: "recalculado", url: ACT, detalle: "Section 72: 7 days. 15,000 / 30 × 7 = 3,500." },
    fecha: "2026-10-29",
    entrada: { motivo: "probation", anios: null, salario: 15000, contrato: null },
    esperado: { dias: 7, enLugar: 3500 },
  },
  {
    nombre: "Contract gives 45 days",
    origen: { tipo: "recalculado", detalle: "45 is more than 30. 24,000 / 30 × 45 = 36,000." },
    fecha: "2026-10-29",
    entrada: { motivo: "standard", anios: null, salario: 24000, contrato: 45 },
    esperado: { dias: 45, legal: 30, enLugar: 36000 },
  },
]);
