import { definirCasos } from "@/motor/calculo";
import asignacionFamiliar from "./asignacion-familiar";

export default definirCasos(asignacionFamiliar, [
  {
    nombre: "Hogar de $ 40.000 con dos hijos",
    origen: {
      tipo: "oficial",
      url: "https://www.bps.gub.uy/5470/asignacion-familiar.html",
      detalle: "BPS, vigencia 1/2026: hasta $ 50.502 corresponden $ 1.347 por mes por beneficiario. 2 × 1.347 = 2.694; por bimestre 5.388.",
    },
    fecha: "2026-10-12",
    entrada: { ingresos: 40000, hijos: 2, discapacidad: 0 },
    esperado: { porHijo: 1347, mensual: 2694, bimestral: 5388, topeHogar: 84688 },
  },
  {
    nombre: "Hogar en la segunda franja",
    origen: { tipo: "oficial", url: "https://www.bps.gub.uy/5470/asignacion-familiar.html", detalle: "Hasta $ 84.688: $ 674 por beneficiario." },
    fecha: "2026-10-12",
    entrada: { ingresos: 70000, hijos: 1, discapacidad: 0 },
    esperado: { porHijo: 674, mensual: 674 },
  },
  {
    nombre: "Tres hijos: el tope sube",
    origen: { tipo: "oficial", url: "https://www.bps.gub.uy/5470/asignacion-familiar.html", detalle: "Con 3 hijos el tope es $ 93.156,80. Con $ 90.000 cobra 3 × 674 = 2.022." },
    fecha: "2026-10-12",
    entrada: { ingresos: 90000, hijos: 3, discapacidad: 0 },
    esperado: { topeHogar: 93156.8, porHijo: 674, mensual: 2022 },
  },
  {
    nombre: "Dos hijos y $ 90.000: sin asignación",
    origen: { tipo: "recalculado", detalle: "90.000 pasa el tope de 84.688 para dos beneficiarios." },
    fecha: "2026-10-12",
    entrada: { ingresos: 90000, hijos: 2, discapacidad: 0 },
    esperado: { porHijo: 0, mensual: 0 },
  },
  {
    nombre: "Hijo con discapacidad: asignación doble",
    origen: { tipo: "recalculado", detalle: "BPS: la asignación es doble para personas con discapacidad. 2 × 1.347 = 2.694." },
    fecha: "2026-10-12",
    entrada: { ingresos: 40000, hijos: 1, discapacidad: 1 },
    esperado: { mensual: 2694 },
  },
]);
