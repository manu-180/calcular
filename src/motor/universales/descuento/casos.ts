import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "25 % sobre 1.000",
    detalle: "1000 × (1 − 0,25) = 750; ahorro 250; descuento efectivo 25 %.",
    fecha: "2026-10-13",
    entrada: { precio: 1000, descuento: 25, segundo: null },
    esperado: { final: 750, ahorro: 250, efectivo: 25 },
  },
  {
    nombre: "30 % más 10 % no es 40 %",
    detalle: "1000 × 0,7 × 0,9 = 630; ahorro 370; efectivo 37 %.",
    fecha: "2026-10-13",
    entrada: { precio: 1000, descuento: 30, segundo: 10 },
    esperado: { final: 630, ahorro: 370, efectivo: 37 },
  },
  {
    nombre: "Descuento de 120 % es un error",
    detalle: "Más de 100 % no existe: tiene que pedir corregir el campo.",
    fecha: "2026-10-13",
    entrada: { precio: 1000, descuento: 120, segundo: null },
    esperaError: true,
  },
];
