import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Omaní, 10 días",
    origen: { tipo: "recalculado", detalle: "Diario 600/30 = 20. Días 1 a 7 al empleador: 140. Días 8 a 10 al fondo al 100 %: 60. Total 200." },
    fecha: "2026-10-26",
    entrada: { salario: 600, previos: 0, dias: 10, nacionalidad: "omani", diasMes: 30 },
    esperado: { total: 200, empleador: 140, fondo: 60, sinPago: 0 },
  },
  {
    nombre: "Extranjero que cruza tramos",
    origen: { tipo: "recalculado", detalle: "Previos 20, actuales 20 (días 21 a 40). Día 21: 20. Días 22 a 35: 14 × 15 = 210. Días 36 a 40: 5 × 10 = 50. Total 280, todo del empleador." },
    fecha: "2026-10-26",
    entrada: { salario: 600, previos: 20, dias: 20, nacionalidad: "expat", diasMes: 30 },
    esperado: { total: 280, empleador: 280, fondo: 0 },
  },
  {
    nombre: "Pasa el máximo anual",
    origen: { tipo: "recalculado", detalle: "Previos 180, actuales 5: días 181 y 182 al 35 % (7 × 2 = 14), 3 días sin pago." },
    fecha: "2026-10-26",
    entrada: { salario: 600, previos: 180, dias: 5, nacionalidad: "expat", diasMes: 30 },
    esperado: { total: 14, sinPago: 3 },
  },
]);
