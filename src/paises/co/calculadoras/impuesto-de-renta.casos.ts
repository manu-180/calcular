import { definirCasos } from "@/motor/calculo";
import renta from "./impuesto-de-renta";

export default definirCasos(renta, [
  {
    nombre: "100 millones de renta gravable en 2025",
    origen: {
      tipo: "recalculado",
      detalle: "ET art. 241 con UVT 2025 de 49.799: 100.000.000 = 2.008,07 UVT. (2.008,07 − 1.700) × 28 % + 116 = 202,26 UVT = 10.072.360.",
    },
    fecha: "2026-10-15",
    entrada: { anio: "2025", base: 100000000 },
    esperado: { uvt: 49799, tarifaMarginal: 28, impuesto: 10072360 },
  },
  {
    nombre: "Por debajo de 1.090 UVT no paga",
    origen: { tipo: "recalculado", detalle: "50.000.000 / 52.374 = 954,67 UVT: primer tramo, 0 %." },
    fecha: "2026-10-15",
    entrada: { anio: "2026", base: 50000000 },
    esperado: { uvt: 52374, tarifaMarginal: 0, impuesto: 0 },
  },
  {
    nombre: "Tramo del 19 % en 2026",
    origen: { tipo: "recalculado", detalle: "70.000.000 − 1.090 × 52.374 = 12.912.340 × 19 % = 2.453.344,6." },
    fecha: "2026-10-15",
    entrada: { anio: "2026", base: 70000000 },
    esperado: { tarifaMarginal: 19, impuesto: 2453345 },
  },
  {
    nombre: "Último tramo",
    origen: { tipo: "recalculado", detalle: "2.000.000.000 con UVT 52.374: (2.000.000.000 − 31.000 × 52.374) × 39 % + 10.352 × 52.374 = 376.406.000 × 39 % + 542.175.648 = 688.973.988." },
    fecha: "2026-10-15",
    entrada: { anio: "2026", base: 2000000000 },
    esperado: { tarifaMarginal: 39, impuesto: 688973988 },
  },
]);
