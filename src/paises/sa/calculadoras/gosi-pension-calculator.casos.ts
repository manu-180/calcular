import { definirCasos } from "@/motor/calculo";
import calculadora from "./gosi-pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Treinta años con 15.000 de promedio",
    origen: { tipo: "recalculado", detalle: "Art. 17 ley 1445: 2,25 % x 15.000 x 360 / 12 = 10.125 (67,5 %)." },
    fecha: "2026-10-24",
    entrada: { promedio: 15000, meses: 360 },
    esperado: { pension: 10125, calculado: 10125, tasaReemplazo: 67.5, anios: 30 },
  },
  {
    nombre: "480 meses con promedio bajo: mínimo de 4.000",
    origen: { tipo: "recalculado", detalle: "2,25 % x 3.000 x 40 = 2.700 < 4.000." },
    fecha: "2026-10-24",
    entrada: { promedio: 3000, meses: 480 },
    esperado: { pension: 4000, calculado: 2700 },
  },
  {
    nombre: "Techo del 100 % del promedio",
    origen: { tipo: "recalculado", detalle: "2,25 % x 10.000 x 50 = 11.250, techo 10.000." },
    fecha: "2026-10-24",
    entrada: { promedio: 10000, meses: 600 },
    esperado: { pension: 10000, tasaReemplazo: 100 },
  },
  {
    nombre: "Promedio por encima del tope de aporte",
    origen: { tipo: "recalculado", detalle: "50.000 se toma como 45.000: 1.012,5 x 30 = 30.375." },
    fecha: "2026-10-24",
    entrada: { promedio: 50000, meses: 360 },
    esperado: { pension: 30375 },
  },
  {
    nombre: "Sin promedio",
    origen: { tipo: "recalculado", detalle: "Promedio 0." },
    fecha: "2026-10-24",
    entrada: { promedio: 0, meses: 360 },
    esperaError: true,
  },
]);
