import { definirCasos } from "@/motor/calculo";
import jornadaParcial from "./jornada-parcial";

export default definirCasos(jornadaParcial, [
  {
    nombre: "Medio tiempo con el salario básico",
    origen: { tipo: "recalculado", detalle: "Art. 82 del Código del Trabajo: 20 / 40 horas = 50 %. 482 × 50 % = 241. Aporte 9,45 % = 22,77. Neto 218,23. Décimo tercero 241 / 12 = 20,08." },
    fecha: "2026-10-07",
    entrada: { horas: 20, sueldoCompleto: null },
    esperado: { proporcion: 50, sueldo: 241, minimo: 241, aporte: 22.77, neto: 218.23, decimoTercero: 20.08 },
  },
  {
    nombre: "32 horas con un sueldo completo de 1.000",
    origen: { tipo: "recalculado", detalle: "32 / 40 = 80 %. 1.000 × 80 % = 800. Mínimo 482 × 80 % = 385,60. Aporte 75,60. Neto 724,40." },
    fecha: "2026-10-07",
    entrada: { horas: 32, sueldoCompleto: 1000 },
    esperado: { proporcion: 80, sueldo: 800, minimo: 385.6, aporte: 75.6, neto: 724.4 },
  },
  {
    nombre: "Más horas que la jornada completa",
    origen: { tipo: "recalculado", detalle: "45 horas pasa la jornada de 40: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { horas: 45, sueldoCompleto: null },
    esperaError: true,
  },
]);
