import { definirCasos } from "@/motor/calculo";
import fondosDeReserva from "./fondos-de-reserva";

export default definirCasos(fondosDeReserva, [
  {
    nombre: "Sueldo de $1.000 con más de un año",
    origen: {
      tipo: "recalculado",
      detalle: "IESS: 8,33 % de la remuneración de aportación cada mes. 1.000 × 8,33 % = 83,30; en un año, 999,60.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000, inicio: "2024-03-01" },
    esperado: { mensual: 83.3, anual: 999.6 },
  },
  {
    nombre: "Menos de un año: todavía no corresponde",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 196 del Código del Trabajo: se paga por cada año completo posterior al primero. Entró el 15/1/2026: desde el 15/1/2027 recibirá 482 × 8,33 % = 40,15.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, inicio: "2026-01-15" },
    esperado: { mensual: 0, valorMensualFuturo: 40.15, desde: "Desde el 15 de enero de 2027" },
  },
  {
    nombre: "El día que cumple un año",
    origen: { tipo: "recalculado", detalle: "Entró el 7/10/2025. El 7/10/2026 cumple un año y empieza el fondo: 482 × 8,33 % = 40,15." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, inicio: "2025-10-07" },
    esperado: { mensual: 40.15 },
  },
  {
    nombre: "Un día antes de cumplir el año",
    origen: { tipo: "recalculado", detalle: "El 6/10/2026 todavía no cumple el año: fondo 0." },
    fecha: "2026-10-06",
    entrada: { sueldo: 482, inicio: "2025-10-07" },
    esperado: { mensual: 0 },
  },
]);
