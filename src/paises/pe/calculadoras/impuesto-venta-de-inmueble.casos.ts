import { definirCasos } from "@/motor/calculo";
import ventaInmueble from "./impuesto-venta-de-inmueble";

export default definirCasos(ventaInmueble, [
  {
    nombre: "Departamento comprado en S/ 300,000 y vendido en S/ 420,000",
    origen: {
      tipo: "recalculado",
      detalle: "LIR, art. 84-A: ganancia 120,000; menos 20 % = 96,000; 6.25 % = 6,000 (5 % de la ganancia).",
    },
    fecha: "2026-10-12",
    entrada: { precioVenta: 420000, costo: 300000, casaHabitacion: false },
    esperado: { ganancia: 120000, deduccion: 24000, rentaNeta: 96000, impuesto: 6000 },
  },
  {
    nombre: "Casa habitación",
    origen: { tipo: "recalculado", detalle: "LIR, art. 2: no constituye ganancia de capital la venta del inmueble ocupado como casa habitación." },
    fecha: "2026-10-12",
    entrada: { precioVenta: 500000, costo: 250000, casaHabitacion: true },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "Venta con pérdida",
    origen: { tipo: "recalculado", detalle: "Precio menor que el costo: ganancia 0, impuesto 0." },
    fecha: "2026-10-12",
    entrada: { precioVenta: 200000, costo: 230000, casaHabitacion: false },
    esperado: { ganancia: 0, impuesto: 0 },
  },
]);
