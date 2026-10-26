import { definirCasos } from "@/motor/calculo";
import calculadora from "./terminal-benefits-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after four years, no notice worked",
    origen: {
      tipo: "recalculado",
      detalle: "Severance 4 × 1,000,000 = 4,000,000. Notice (1 to 5 years) one month = 1,000,000. Daily pay 1,000,000 × 12 / 260 = 46,153.85; 10 leave days = 461,538; 5 salary days = 230,769. Total 5,692,307.",
    },
    fecha: "2026-10-24",
    entrada: { anios: 4, meses: 0, mensual: 1000000, motivo: "redundancy", preaviso: false, vacaciones: 10, diasSueldo: 5, semana: "5" },
    esperado: { total: 5692307, severance: 4000000, preaviso: 1000000, licencia: 461538, sueldo: 230769 },
  },
  {
    nombre: "Resignation with leave owed",
    origen: { tipo: "recalculado", detalle: "No severance, no pay in lieu. 7 leave days × (1,300,000 × 12 / 312 = 50,000) = 350,000." },
    fecha: "2026-10-24",
    entrada: { anios: 2, meses: 3, mensual: 1300000, motivo: "resignation", preaviso: true, vacaciones: 7, diasSueldo: 0, semana: "6" },
    esperado: { total: 350000, severance: 0, preaviso: 0, licencia: 350000 },
  },
  {
    nombre: "Termination after eight months without notice",
    origen: { tipo: "recalculado", detalle: "No severance case. Notice two weeks: 1,300,000 × 12 / 52 × 2 = 600,000." },
    fecha: "2026-10-24",
    entrada: { anios: 0, meses: 8, mensual: 1300000, motivo: "termination", preaviso: false, vacaciones: 0, diasSueldo: 0, semana: "5" },
    esperado: { total: 600000, severance: 0, preaviso: 600000 },
  },
]);
