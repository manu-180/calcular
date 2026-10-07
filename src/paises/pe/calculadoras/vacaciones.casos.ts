import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Vacaciones truncas: 5 meses y 10 días en el régimen general",
    origen: { tipo: "recalculado", detalle: "DL 713, art. 22: dozavos y treintavos. 3,000 / 12 × 5 = 1,250; 3,000 / 360 × 10 = 83.33. Total 1,333.33." },
    fecha: "2026-10-07",
    entrada: { sueldo: 3000, asignacionFamiliar: false, variable: null, regimen: "general", meses: 5, dias: 10, periodosVencidos: 0 },
    esperado: { diasPorAnio: 30, remuneracionVacacional: 3000, truncas: 1333.33, total: 1333.33 },
  },
  {
    nombre: "Un año vencido en el régimen general (triple pago)",
    origen: { tipo: "recalculado", detalle: "DL 713, art. 23: remuneración vacacional 2,000 más indemnización de una remuneración 2,000. El sueldo del mes trabajado se paga aparte." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2000, asignacionFamiliar: false, variable: null, regimen: "general", meses: 0, dias: 0, periodosVencidos: 1 },
    esperado: { vencidas: 2000, indemnizacion: 2000, total: 4000 },
  },
  {
    nombre: "Pequeña empresa: 15 días por año",
    origen: { tipo: "recalculado", detalle: "DL 1086, art. 46: 2,400 × 15 / 30 = 1,200 por año; 6 meses = 600." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2400, asignacionFamiliar: false, variable: null, regimen: "pequena", meses: 6, dias: 0, periodosVencidos: 0 },
    esperado: { diasPorAnio: 15, remuneracionVacacional: 1200, truncas: 600, total: 600 },
  },
  {
    nombre: "Con asignación familiar después del aumento de la RMV",
    origen: { tipo: "recalculado", detalle: "1,230 + 123 = 1,353 por año; 3 meses = 338.25." },
    fecha: "2026-10-01",
    entrada: { sueldo: 1230, asignacionFamiliar: true, variable: null, regimen: "general", meses: 3, dias: 0, periodosVencidos: 0 },
    esperado: { remuneracionVacacional: 1353, truncas: 338.25 },
  },
  {
    nombre: "Doce meses no son vacaciones truncas",
    origen: { tipo: "recalculado", detalle: "La función rechaza 12 meses o más." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2000, asignacionFamiliar: false, variable: null, regimen: "general", meses: 12, dias: 0, periodosVencidos: 0 },
    esperaError: true,
  },
]);
