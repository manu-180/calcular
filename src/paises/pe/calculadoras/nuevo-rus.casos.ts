import { definirCasos } from "@/motor/calculo";
import nuevoRus from "./nuevo-rus";

export default definirCasos(nuevoRus, [
  {
    nombre: "La bodega de Pedro: ventas de S/ 4,500 y compras de S/ 3,500",
    origen: {
      tipo: "oficial",
      url: "https://orientacion.sunat.gob.pe/3100-04-determinacion-y-pago-categorias-del-nrus",
      detalle: "Ejemplo de la SUNAT: ningún monto pasa de S/ 5,000, así que es Categoría 1 y paga S/ 20.",
    },
    fecha: "2026-10-08",
    entrada: { ingresos: 4500, compras: 3500, acumulado: null },
    esperado: { categoria: "Categoría 1", cuota: 20, montoUsado: 4500 },
  },
  {
    nombre: "Justo en el límite de la categoría 1",
    origen: { tipo: "recalculado", detalle: "Hasta S/ 5,000 inclusive es Categoría 1 (cuota S/ 20)." },
    fecha: "2026-10-08",
    entrada: { ingresos: 5000, compras: 2000, acumulado: null },
    esperado: { categoria: "Categoría 1", cuota: 20 },
  },
  {
    nombre: "Compras de S/ 6,000 con ventas menores",
    origen: { tipo: "recalculado", detalle: "Manda el mayor de los dos montos: 6,000 está entre 5,000 y 8,000, Categoría 2, cuota S/ 50 (S/ 600 al año)." },
    fecha: "2026-10-08",
    entrada: { ingresos: 4000, compras: 6000, acumulado: 50000 },
    esperado: { categoria: "Categoría 2", cuota: 50, cuotaAnual: 600 },
  },
  {
    nombre: "Ventas sobre el límite mensual",
    origen: { tipo: "recalculado", detalle: "Más de S/ 8,000 en el mes queda fuera del Nuevo RUS: no hay cuota." },
    fecha: "2026-10-08",
    entrada: { ingresos: 8500, compras: 1000, acumulado: null },
    esperado: { categoria: "Fuera del Nuevo RUS", cuota: null },
  },
]);
