import { definirCasos } from "@/motor/calculo";
import salarioBasico from "./salario-basico";

export default definirCasos(salarioBasico, [
  {
    nombre: "Salario básico 2026, mes completo, décimos mensualizados",
    origen: {
      tipo: "recalculado",
      detalle: "SBU 482. Aporte 9,45 % = 45,55. Décimo tercero 482 / 12 = 40,17. Décimo cuarto 482 / 12 = 40,17. Neto 482 − 45,55 + 40,17 + 40,17 = 516,79. Día 482 / 30 = 16,07; hora 16,0667 / 8 = 2,01.",
    },
    fecha: "2026-10-07",
    entrada: { dias: 30, decimos: true },
    esperado: { sbu: 482, aporte: 45.55, decimoTercero: 40.17, decimoCuarto: 40.17, neto: 516.79, dia: 16.07, hora: 2.01 },
  },
  {
    nombre: "Medio mes, décimos acumulados",
    origen: { tipo: "recalculado", detalle: "482 × 15 / 30 = 241. Aporte 9,45 % = 22,77. Neto 241 − 22,77 = 218,23." },
    fecha: "2026-10-07",
    entrada: { dias: 15, decimos: false },
    esperado: { sueldo: 241, aporte: 22.77, decimoTercero: 0, neto: 218.23 },
  },
  {
    nombre: "Último día del año: sigue el básico de 2026",
    origen: { tipo: "recalculado", detalle: "El tramo de 482 rige hasta el 31/12/2026." },
    fecha: "2026-12-31",
    entrada: { dias: 30, decimos: false },
    esperado: { sbu: 482, neto: 436.45 },
  },
]);
