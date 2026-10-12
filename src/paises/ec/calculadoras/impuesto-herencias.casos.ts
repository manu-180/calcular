import { definirCasos } from "@/motor/calculo";
import impuestoHerencias from "./impuesto-herencias";

export default definirCasos(impuestoHerencias, [
  {
    nombre: "Hijo que hereda 200.000 en 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Tabla SRI 2026: 3.926 + (200.000 − 157.053) × 10 % = 8.220,70. Primer grado: tarifas a la mitad (LRTI art. 36 lit. d) = 4.110,35. 4.110,35 / 200.000 = 2,06 %.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 200000, caso: "primer-grado" },
    esperado: { segunTabla: 8220.7, reduccion: 4110.35, impuesto: 4110.35, tasaEfectiva: 2.06 },
  },
  {
    nombre: "Sobrino que hereda 200.000: tabla completa",
    origen: { tipo: "recalculado", detalle: "Sin reducción: 8.220,70." },
    fecha: "2026-10-07",
    entrada: { monto: 200000, caso: "otro" },
    esperado: { impuesto: 8220.7 },
  },
  {
    nombre: "Donación por debajo de la fracción exenta",
    origen: { tipo: "recalculado", detalle: "50.000 está en el primer tramo de 2026 (hasta 78.527, 0 %): impuesto 0." },
    fecha: "2026-10-07",
    entrada: { monto: 50000, caso: "donacion" },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Hija menor de edad: exenta",
    origen: { tipo: "recalculado", detalle: "LRTI art. 36 lit. d: los hijos menores de edad del causante no pagan." },
    fecha: "2026-10-07",
    entrada: { monto: 500000, caso: "menor" },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Herencia de 2025 con la tabla de ese año",
    origen: { tipo: "recalculado", detalle: "Tabla SRI 2025: (100.000 − 77.708) × 5 % = 1.114,60, sin reducción." },
    fecha: "2025-06-01",
    entrada: { monto: 100000, caso: "otro" },
    esperado: { impuesto: 1114.6 },
  },
]);
