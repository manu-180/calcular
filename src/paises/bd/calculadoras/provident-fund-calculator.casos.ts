import { definirCasos } from "@/motor/calculo";
import calculadora from "./provident-fund-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "8 % de 20,000 por 10 años sin rendimiento",
    origen: { tipo: "recalculado", detalle: "Art. 264(9): 1,600 del trabajador + 1,600 del empleador = 3,200 al mes; 120 meses = 3,84,000." },
    fecha: "2026-10-24",
    entrada: { basico: 20000, tasa: 8, anios: 10, rendimiento: 0 },
    esperado: { propia: 1600, empleador: 1600, mensual: 3200, acumulado: 384000, aportado: 384000 },
  },
  {
    nombre: "7 % con rendimiento del 6 %",
    origen: { tipo: "recalculado", detalle: "1,050 + 1,050 = 2,100 al mes; 12 meses al 0.5 % mensual: 2,100 × ((1.005^12 − 1) / 0.005) = 25,904.68." },
    fecha: "2026-10-24",
    entrada: { basico: 15000, tasa: 7, anios: 1, rendimiento: 6 },
    esperado: { mensual: 2100, acumulado: 25904.68, ganancia: 704.68 },
  },
  {
    nombre: "Tasa fuera del rango legal",
    origen: { tipo: "recalculado", detalle: "El 10 % está fuera del 7 % a 8 % del art. 264(9)." },
    fecha: "2026-10-24",
    entrada: { basico: 20000, tasa: 10, anios: 5, rendimiento: 0 },
    esperaError: true,
  },
]);
