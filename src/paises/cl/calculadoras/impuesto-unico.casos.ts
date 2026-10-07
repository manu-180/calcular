import { definirCasos } from "@/motor/calculo";
import impuestoUnico from "./impuesto-unico";

export default definirCasos(impuestoUnico, [
  {
    nombre: "Tasa efectiva máxima del segundo tramo (2,20 %)",
    origen: {
      tipo: "oficial",
      url: "https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm",
      detalle: "Tabla SII octubre 2026: hasta $2.164.530, factor 0,04, rebaja 38.961,54, tasa efectiva máxima 2,20 %. 2.164.530 × 0,04 − 38.961,54 = 47.619,66 → 47.620.",
    },
    fecha: "2026-10-07",
    entrada: { tributable: 2164530 },
    esperado: { impuesto: 47620, tasaEfectiva: 2.2 },
  },
  {
    nombre: "Justo bajo el límite exento",
    origen: { tipo: "oficial", url: "https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm", detalle: "Exento hasta $974.038,50 en octubre 2026." },
    fecha: "2026-10-07",
    entrada: { tributable: 974038 },
    esperado: { impuesto: 0, tasaMarginal: 0, exentoHasta: 974038.5 },
  },
  {
    nombre: "Tercer tramo",
    origen: { tipo: "recalculado", detalle: "3.000.000 × 0,08 − 125.542,74 = 114.457,26 → 114.457." },
    fecha: "2026-10-07",
    entrada: { tributable: 3000000 },
    esperado: { impuesto: 114457, tasaMarginal: 8 },
  },
  {
    nombre: "Último tramo",
    origen: { tipo: "recalculado", detalle: "25.000.000 × 0,40 − 2.800.901,82 = 7.199.098,18 → 7.199.098." },
    fecha: "2026-10-07",
    entrada: { tributable: 25000000 },
    esperado: { impuesto: 7199098, tasaMarginal: 40 },
  },
  {
    nombre: "Mismo sueldo en enero, con otra UTM",
    origen: { tipo: "recalculado", detalle: "UTM enero 69.751, rebaja 0,54 UTM = 37.665,54. 1.500.000 × 0,04 − 37.665,54 = 22.334,46 → 22.334." },
    fecha: "2026-01-15",
    entrada: { tributable: 1500000 },
    esperado: { impuesto: 22334 },
  },
]);
