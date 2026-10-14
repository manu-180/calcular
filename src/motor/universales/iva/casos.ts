import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Agregar el 21 % a 1.000",
    detalle: "1000 × 21 ÷ 100 = 210; total 1210.",
    fecha: "2026-10-13",
    valores: { tasa: 21 },
    entrada: { operacion: "agregar", monto: 1000, otraTasa: null },
    esperado: { neto: 1000, impuesto: 210, total: 1210, tasaUsada: 21 },
  },
  {
    nombre: "Quitar el 21 % de 1.210",
    detalle: "1210 ÷ 1,21 = 1000; IVA 210.",
    fecha: "2026-10-13",
    valores: { tasa: 21 },
    entrada: { operacion: "quitar", monto: 1210, otraTasa: null },
    esperado: { neto: 1000, impuesto: 210, total: 1210 },
  },
  {
    nombre: "Quitar el 20 % con centavos",
    detalle: "100 ÷ 1,20 = 83,333 → 83,33; IVA 100 − 83,33 = 16,67.",
    fecha: "2026-10-13",
    valores: { tasa: 20 },
    entrada: { operacion: "quitar", monto: 100, otraTasa: null },
    esperado: { neto: 83.33, impuesto: 16.67, total: 100 },
  },
  {
    nombre: "Tasa reducida escrita a mano",
    detalle: "Con otra tasa de 10 % (la general es 21 %): 500 × 10 ÷ 100 = 50; total 550.",
    fecha: "2026-10-13",
    valores: { tasa: 21 },
    entrada: { operacion: "agregar", monto: 500, otraTasa: 10 },
    esperado: { impuesto: 50, total: 550, tasaUsada: 10 },
  },
  {
    nombre: "Tasa cero",
    detalle: "Con tasa 0 el precio no cambia: 300 + 0 = 300.",
    fecha: "2026-10-13",
    valores: { tasa: 0 },
    entrada: { operacion: "agregar", monto: 300, otraTasa: null },
    esperado: { impuesto: 0, total: 300 },
  },
  {
    nombre: "Sin tasa del país es un error",
    detalle: "Si el dato no llega y no hay otra tasa, no se puede calcular.",
    fecha: "2026-10-13",
    entrada: { operacion: "agregar", monto: 300, otraTasa: null },
    esperaError: true,
  },
];
