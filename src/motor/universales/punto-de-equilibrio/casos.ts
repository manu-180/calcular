import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Fijos 5.000, precio 50, variable 30",
    detalle: "Contribución 50 − 30 = 20 (40 %). Unidades 5000 ÷ 20 = 250. Ventas 5000 ÷ 0,4 = 12500.",
    fecha: "2026-10-13",
    entrada: { fijos: 5000, precio: 50, variable: 30, objetivo: null },
    esperado: { unidades: 250, facturacion: 12500, contribucion: 20, contribucionPct: 40, unidadesObjetivo: null, facturacionObjetivo: null },
  },
  {
    nombre: "Con ganancia buscada de 500",
    detalle: "Fijos 1000, contribución 30 − 20 = 10. Equilibrio 100 unidades (3000). Con 500 de ganancia: 1500 ÷ 10 = 150 unidades, 4500.",
    fecha: "2026-10-13",
    entrada: { fijos: 1000, precio: 30, variable: 20, objetivo: 500 },
    esperado: { unidades: 100, facturacion: 3000, unidadesObjetivo: 150, facturacionObjetivo: 4500 },
  },
  {
    nombre: "Unidades no enteras se redondean hacia arriba",
    detalle: "1000 ÷ (17 − 10) = 142,86 → 143 unidades. Ventas exactas 1000 × 17 ÷ 7 = 2428,57.",
    fecha: "2026-10-13",
    entrada: { fijos: 1000, precio: 17, variable: 10, objetivo: null },
    esperado: { unidades: 143, facturacion: 2428.57 },
  },
  {
    nombre: "Costo variable igual al precio es un error",
    detalle: "Sin margen de contribución el equilibrio no existe.",
    fecha: "2026-10-13",
    entrada: { fijos: 1000, precio: 20, variable: 20, objetivo: null },
    esperaError: true,
  },
];
