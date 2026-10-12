import { definirCasos } from "@/motor/calculo";
import cuotaFija from "./cuota-fija";

const LCT = "Ley 822, art. 246, 251 y 253:";

export default definirCasos(cuotaFija, [
  {
    nombre: "Ventas de C$15,000 al mes",
    origen: { tipo: "recalculado", detalle: `${LCT} estrato 2 (C$10,000.01 a C$20,000), cuota de C$200 a C$500.` },
    fecha: "2026-10-12",
    entrada: { ingresos: 15000, inventario: 100000 },
    esperado: { califica: "Sí", estrato: 2, minima: 200, maxima: 500 },
  },
  {
    nombre: "Ventas de C$8,000: estrato exento",
    origen: { tipo: "recalculado", detalle: `${LCT} estrato 1 (hasta C$10,000), exento.` },
    fecha: "2026-10-12",
    entrada: { ingresos: 8000, inventario: null },
    esperado: { estrato: 1, minima: 0, maxima: 0 },
  },
  {
    nombre: "Ventas de C$95,000",
    origen: { tipo: "recalculado", detalle: `${LCT} estrato 6 (C$80,000.01 a C$100,000), cuota de C$4,000 a C$5,500.` },
    fecha: "2026-10-12",
    entrada: { ingresos: 95000, inventario: null },
    esperado: { estrato: 6, minima: 4000, maxima: 5500 },
  },
  {
    nombre: "Ventas de C$120,000: fuera del régimen",
    origen: { tipo: "recalculado", detalle: `${LCT} solo hasta C$100,000 de ventas mensuales.` },
    fecha: "2026-10-12",
    entrada: { ingresos: 120000, inventario: null },
    esperado: { califica: "No", estrato: null },
  },
  {
    nombre: "Inventario de C$600,000: fuera del régimen",
    origen: { tipo: "recalculado", detalle: `${LCT} inventario de hasta C$500,000.` },
    fecha: "2026-10-12",
    entrada: { ingresos: 30000, inventario: 600000 },
    esperado: { califica: "No" },
  },
]);
