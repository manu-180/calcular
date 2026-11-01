import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "Despido con aviso y seguro social",
    origen: { tipo: "recalculado", detalle: "600 / 30 = 20 por día. 10 días de vacaciones = 200 y 5 de sueldo = 100. Sin preaviso ni gratificación. Total 300." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2021-01-01", fin: "2026-01-01", motivo: "notice", ssc: true, vacaciones: 10, pendientes: 5 },
    esperado: { vacaciones: 200, sueldo: 100, preaviso: 0, arbitrario: 0, gratificacion: 0, total: 300 },
  },
  {
    nombre: "Despido arbitrario sin seguro social",
    origen: {
      tipo: "recalculado",
      detalle: "5,00274 años. Preaviso 600. Arbitrario 2,50137 × 600 = 1.500,822. Gratificación 5,00274 × 600 = 3.001,644. Vacaciones 7 × 20 = 140. Total 5.242,466.",
    },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2021-01-01", fin: "2026-01-01", motivo: "unfair", ssc: false, vacaciones: 7, pendientes: 0 },
    esperado: { preaviso: 600, arbitrario: 1500.822, gratificacion: 3001.644, vacaciones: 140, total: 5242.466 },
  },
  {
    nombre: "Renuncia sin seguro social",
    origen: { tipo: "recalculado", detalle: "Gratificación por cualquier causa (art. 32): 1 año × 900 = 900." },
    fecha: "2026-10-24",
    entrada: { salario: 900, inicio: "2025-01-01", fin: "2026-01-01", motivo: "resignation", ssc: false, vacaciones: 0, pendientes: 0 },
    esperado: { gratificacion: 900, preaviso: 0, total: 900 },
  },
]);
