import { definirCasos } from "@/motor/calculo";
import decimoCuarto from "./decimo-cuarto-sueldo";

export default definirCasos(decimoCuarto, [
  {
    nombre: "Sierra, período completo, pago de agosto de 2027",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 113 del Código del Trabajo: un SBU por año completo. Período Sierra del 1/8/2026 al 31/7/2027 (Acuerdo MDT-2015-0087, art. 5). 482 × 12 / 12 = 482.",
    },
    fecha: "2026-10-07",
    entrada: { region: "sierra", inicio: "2020-01-10", salida: null },
    esperado: { decimo: 482, meses: 12, fechaPago: "Hasta el 15 de agosto de 2027" },
  },
  {
    nombre: "Costa, entró el 16/9/2025, consulta el 10/3/2026 (antes del pago)",
    origen: {
      tipo: "recalculado",
      detalle: "Período Costa del 1/3/2025 al 28/2/2026. Del 16/9/2025 al 28/2/2026 son 5 meses y 13 días = 5,4333 meses. 482 × 5,4333 / 12 = 218,24.",
    },
    fecha: "2026-03-10",
    entrada: { region: "costa", inicio: "2025-09-16", salida: null },
    esperado: { decimo: 218.24, fechaPago: "Hasta el 15 de marzo de 2026", periodo: "Del 1 de marzo de 2025 al 28 de febrero de 2026" },
  },
  {
    nombre: "Sierra, salida el 31/5/2026",
    origen: {
      tipo: "recalculado",
      detalle: "Período Sierra del 1/8/2025 al 31/7/2026. Del 1/8/2025 al 31/5/2026 son 10 meses. 482 × 10 / 12 = 401,67.",
    },
    fecha: "2026-06-01",
    entrada: { region: "sierra", inicio: "2024-01-01", salida: "2026-05-31" },
    esperado: { decimo: 401.67, meses: 10 },
  },
  {
    nombre: "Costa, entró el 1/6/2026, próximo pago en marzo de 2027",
    origen: {
      tipo: "recalculado",
      detalle: "Período Costa del 1/3/2026 al 28/2/2027. Del 1/6/2026 al 28/2/2027 son 9 meses. 482 × 9 / 12 = 361,50.",
    },
    fecha: "2026-10-07",
    entrada: { region: "costa", inicio: "2026-06-01", salida: null },
    esperado: { decimo: 361.5, meses: 9 },
  },
  {
    nombre: "Salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { region: "sierra", inicio: "2026-05-01", salida: "2026-04-30" },
    esperaError: true,
  },
]);
