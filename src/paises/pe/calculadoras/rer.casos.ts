import { definirCasos } from "@/motor/calculo";
import rer from "./rer";

export default definirCasos(rer, [
  {
    nombre: "Ventas netas de S/ 30,000 en el mes",
    origen: { tipo: "recalculado", detalle: "LIR, art. 120: 1.5 % de 30,000 = 450." },
    fecha: "2026-10-12",
    entrada: { ingresos: 30000, acumulado: 280000 },
    esperado: { cuota: 450, limite: 525000 },
  },
  {
    nombre: "Ingresos del año por encima del límite",
    origen: { tipo: "recalculado", detalle: "1.5 % de 48,750.50 = 731.26; el acumulado de 530,000 pasa los S/ 525,000 del art. 118." },
    fecha: "2026-10-12",
    entrada: { ingresos: 48750.5, acumulado: 530000 },
    esperado: { cuota: 731.26 },
  },
]);
