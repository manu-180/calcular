import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Redundancy after 5 years with leave and unpaid days",
    origen: {
      tipo: "recalculado",
      detalle: "Severance 70 days × 300 = 21,000; extra 60 days = 18,000; leave 10 × 9,000 / 26 = 3,461.54; unpaid 12 × 9,000 / 30 = 3,600. Total 46,061.54.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 9000, anios: 5, meses: 0, motivo: "redundancy", licencia: 10, diasMes: 26, diasImpagos: 12 },
    esperado: { total: 46061.54, indemnizacion: 21000, extra: 18000, licencia: 3461.54, sueldo: 3600 },
  },
  {
    nombre: "Resignation after 3 years: leave pay only",
    origen: { tipo: "recalculado", detalle: "No severance before five years. Leave 13 × 13,000 / 26 = 6,500." },
    fecha: "2026-10-27",
    entrada: { salario: 13000, anios: 3, meses: 0, motivo: "resignation", licencia: 13, diasMes: 26, diasImpagos: 0 },
    esperado: { total: 6500, indemnizacion: 0, licencia: 6500 },
  },
]);
