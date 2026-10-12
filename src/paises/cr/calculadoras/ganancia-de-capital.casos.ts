import { definirCasos } from "@/motor/calculo";
import gananciaDeCapital from "./ganancia-de-capital";

export default definirCasos(gananciaDeCapital, [
  {
    nombre: "Lote comprado en 2021 y vendido con ganancia",
    origen: { tipo: "recalculado", detalle: "Ley 7092, art. 31 ter: 15 % de (80.000.000 − 60.000.000) = 3.000.000." },
    fecha: "2026-10-12",
    entrada: { precioVenta: 80000000, costo: 60000000, viviendaHabitual: false, anterior2019: false },
    esperado: { ganancia: 20000000, impuesto: 3000000, impuestoOpcion: null },
  },
  {
    nombre: "Comprado antes de 2019: conviene la opción del 2,25 %",
    origen: {
      tipo: "recalculado",
      detalle: "Ganancia 100.000.000 − 40.000.000 = 60.000.000 × 15 % = 9.000.000. Opción: 2,25 % de 100.000.000 = 2.250.000. Se paga lo menor.",
    },
    fecha: "2026-10-12",
    entrada: { precioVenta: 100000000, costo: 40000000, viviendaHabitual: false, anterior2019: true },
    esperado: { impuestoGanancia: 9000000, impuestoOpcion: 2250000, impuesto: 2250000 },
  },
  {
    nombre: "Vivienda habitual exenta",
    origen: { tipo: "recalculado", detalle: "Art. 28 bis, inciso 7: la ganancia por la venta de la vivienda habitual está exenta." },
    fecha: "2026-10-12",
    entrada: { precioVenta: 90000000, costo: 50000000, viviendaHabitual: true, anterior2019: false },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Venta con pérdida",
    origen: { tipo: "recalculado", detalle: "Costo mayor que el precio: no hay ganancia ni impuesto." },
    fecha: "2026-10-12",
    entrada: { precioVenta: 30000000, costo: 35000000, viviendaHabitual: false, anterior2019: false },
    esperado: { ganancia: -5000000, impuesto: 0 },
  },
]);
