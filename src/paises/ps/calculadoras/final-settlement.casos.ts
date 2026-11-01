import { definirCasos } from "@/motor/calculo";
import calculadora from "./final-settlement";

export default definirCasos(calculadora, [
  {
    nombre: "Despido arbitrario tras siete años",
    origen: {
      tipo: "recalculado",
      detalle: "2.557 días: indemnización 21.016,44 (art. 45); preaviso 3.000 (art. 46); arbitrario 2.557/365 × 2 × 3.000 = 42.032,88 (art. 47); 2 semanas de vacaciones 1.384,62; 10 días 1.000. Total 68.433,94.",
    },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2019-01-01", fin: "2026-01-01", motivo: "unfair", vacaciones: 2, pendientes: 10 },
    esperado: { gratificacion: 21016.44, preaviso: 3000, arbitrario: 42032.88, vacaciones: 1384.62, sueldo: 1000, total: 68433.94 },
  },
  {
    nombre: "Renuncia a los tres años con una semana de vacaciones",
    origen: { tipo: "recalculado", detalle: "Un tercio de 9.008,22 = 3.002,74 (art. 42.2); 1 semana 692,31. Total 3.695,05." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2023-01-01", fin: "2026-01-01", motivo: "resignation", vacaciones: 1, pendientes: 0 },
    esperado: { gratificacion: 3002.74, preaviso: 0, arbitrario: 0, total: 3695.05 },
  },
  {
    nombre: "Fin con preaviso antes del año",
    origen: { tipo: "recalculado", detalle: "181 días: sin indemnización; 5 días pendientes × 100 = 500." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, inicio: "2026-01-01", fin: "2026-07-01", motivo: "notice", vacaciones: 0, pendientes: 5 },
    esperado: { gratificacion: 0, total: 500 },
  },
]);
