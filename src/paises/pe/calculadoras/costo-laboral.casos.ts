import { definirCasos } from "@/motor/calculo";
import costoLaboral from "./costo-laboral";

export default definirCasos(costoLaboral, [
  {
    nombre: "Sueldo de S/ 3000 en el régimen general con EsSalud",
    origen: {
      tipo: "recalculado",
      detalle:
        "EsSalud 9 % = 270 al mes. Gratificación de un sueldo (Ley 27735) = 3000 y bonificación 9 % = 270 (Ley 30334). CTS: remuneración computable 3000 + 3000/6 = 3500; depósito semestral 3500 × 6 / 12 = 1750. Año: 36 000 + 3240 + 6540 + 3500 = 49 280; al mes 4106.67; 36.89 % sobre las 12 remuneraciones.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 3000, asignacionFamiliar: false, regimen: "general", seguro: "essalud" },
    esperado: { essalud: 270, gratificacion: 3000, bonificacion: 270, cts: 1750, costoAnual: 49280, costoMensual: 4106.67, recargo: 36.8889 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Pequeña empresa con asignación familiar",
    origen: {
      tipo: "recalculado",
      detalle:
        "Asignación familiar 10 % de la RMV de 1230 = 123; remuneración 2123. EsSalud 191.07. Gratificación media remuneración = 1061.50; bonificación 95.54. CTS: (2123 + 1061.50/6 = 2299.92) × 0,5 × 6 / 12 = 574.98. Año: 25 476 + 2292.84 + 2314.08 + 1149.96 = 31 232.88; al mes 2602.74.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 2000, asignacionFamiliar: true, regimen: "pequena", seguro: "essalud" },
    esperado: { remuneracion: 2123, essalud: 191.07, gratificacion: 1061.5, bonificacion: 95.54, cts: 574.98, costoAnual: 31232.88, costoMensual: 2602.74 },
  },
  {
    nombre: "Sueldo bajo la RMV: EsSalud sobre el mínimo",
    origen: { tipo: "recalculado", detalle: "Con S/ 900 y RMV de 1230, el aporte a EsSalud se calcula sobre 1230: 9 % = 110.70." },
    fecha: "2026-10-08",
    entrada: { sueldo: 900, asignacionFamiliar: false, regimen: "general", seguro: "essalud" },
    esperado: { essalud: 110.7 },
  },
]);
