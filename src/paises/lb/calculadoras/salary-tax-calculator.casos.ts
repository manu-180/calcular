import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Soltero con 100 millones al mes",
    origen: { tipo: "recalculado", detalle: "1.200 M − 450 M = 750 M. 2 % de 360 M = 7,2 M; 4 % de 390 M = 15,6 M. Total 22,8 M; por mes 1,9 M." },
    fecha: "2026-11-01",
    entrada: { ingreso: 100000000, periodo: "mensual", casado: false, conyugeTrabaja: null, hijos: 0 },
    esperado: { impuestoAnual: 22800000, impuestoMensual: 1900000, tenzil: 450000000, imponible: 750000000, marginal: 4 },
  },
  {
    nombre: "Casado, cónyuge sin trabajo, dos hijos",
    origen: { tipo: "recalculado", detalle: "2.400 M − (450 + 225 + 90) M = 1.635 M. 7,2 + 4 % de 540 M = 21,6 + 7 % de 735 M = 51,45. Total 80,25 M." },
    fecha: "2026-11-01",
    entrada: { ingreso: 200000000, periodo: "mensual", casado: true, conyugeTrabaja: false, hijos: 2 },
    esperado: { impuestoAnual: 80250000, tenzil: 765000000, imponible: 1635000000, marginal: 7 },
  },
  {
    nombre: "Los dos cónyuges trabajan: hijos a medias",
    origen: { tipo: "recalculado", detalle: "Art. 31: 450 M + 2 × 45 M / 2 = 495 M. 1.200 M − 495 M = 705 M. 7,2 + 4 % de 345 M = 13,8. Total 21 M." },
    fecha: "2026-11-01",
    entrada: { ingreso: 1200000000, periodo: "anual", casado: true, conyugeTrabaja: true, hijos: 2 },
    esperado: { impuestoAnual: 21000000, tenzil: 495000000 },
  },
  {
    nombre: "Más de cinco hijos: se cuentan cinco",
    origen: { tipo: "recalculado", detalle: "Art. 31: tope 5 hijos. 450 + 225 + 225 = 900 M, igual a los ingresos: impuesto 0." },
    fecha: "2026-11-01",
    entrada: { ingreso: 900000000, periodo: "anual", casado: true, conyugeTrabaja: false, hijos: 7 },
    esperado: { impuestoAnual: 0, tenzil: 900000000, imponible: 0, marginal: 0 },
  },
  {
    nombre: "Sin ingreso",
    origen: { tipo: "recalculado", detalle: "Monto vacío." },
    fecha: "2026-11-01",
    entrada: { ingreso: 0, periodo: "mensual", casado: false, conyugeTrabaja: null, hijos: 0 },
    esperaError: true,
  },
]);
