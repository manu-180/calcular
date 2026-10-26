import { definirCasos } from "@/motor/calculo";
import calculadora from "./service-benefit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Renuncia con 6 años",
    origen: { tipo: "recalculado", detalle: "Art. 27(4)(খ) reformado en 2026: más de 3 y menos de 10 años, 15 días por año. 30,000 / 30 × 15 × 6 = 90,000." },
    fecha: "2026-10-24",
    entrada: { salario: 30000, anios: 6, aviso: true, gratuity: null },
    esperado: { neto: 90000, compensacion: 90000, dias: 15 },
  },
  {
    nombre: "Renuncia con 2 años",
    origen: { tipo: "recalculado", detalle: "Hasta 3 años: 7 días por año. 18,000 / 30 × 7 × 2 = 8,400." },
    fecha: "2026-10-24",
    entrada: { salario: 18000, anios: 2, aviso: true, gratuity: null },
    esperado: { neto: 8400, dias: 7 },
  },
  {
    nombre: "12 años con gratuity mayor",
    origen: { tipo: "recalculado", detalle: "10 años o más: 30 días por año = 30,000 × 12 = 3,60,000; gratuity de la empresa 5,40,000 es mayor." },
    fecha: "2026-10-24",
    entrada: { salario: 30000, anios: 12, aviso: true, gratuity: 540000 },
    esperado: { compensacion: 360000, neto: 540000, dias: 30 },
  },
  {
    nombre: "Sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 27(1) y (3): 60 días de salario a favor del empleador. 30,000 / 30 × 60 = 60,000; 90,000 − 60,000 = 30,000." },
    fecha: "2026-10-24",
    entrada: { salario: 30000, anios: 6, aviso: false, gratuity: null },
    esperado: { descuento: 60000, neto: 30000, diasAviso: 60 },
  },
  {
    nombre: "Tres años justos",
    origen: { tipo: "recalculado", detalle: "Hasta 3 años inclusive: 7 días por año. 30,000 / 30 × 7 × 3 = 21,000." },
    fecha: "2026-10-24",
    entrada: { salario: 30000, anios: 3, aviso: true, gratuity: null },
    esperado: { neto: 21000, dias: 7 },
  },
]);
