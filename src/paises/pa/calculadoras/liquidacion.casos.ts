import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido injustificado después de cinco años",
    origen: {
      tipo: "recalculado",
      detalle:
        "Semanal 1,300 × 12 ÷ 52 = 300. Prima 5 × 300 = 1,500. Indemnización 17 semanas = 5,100. Décimo del 16/8 al 30/9 = 1.5 meses: 1,300 × 1.5 ÷ 12 = 162.50. Total 6,762.50.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 1300,
      fechaIngreso: "2021-10-01",
      fechaSalida: "2026-09-30",
      motivo: "despido-injustificado",
      indefinido: true,
      mesesVacaciones: 0,
    },
    esperado: { prima: 1500, indemnizacion: 5100, vacaciones: 0, decimo: 162.5, total: 6762.5 },
  },
  {
    nombre: "Renuncia con vacaciones pendientes",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 16/1/2023 al 15/3/2026: 3 años y 2 meses = 38 meses. Prima 1,100 × 38 ÷ 52 = 803.85. Vacaciones 1,100 × 5.5 ÷ 11 = 550. Décimo del 16/12 al 15/3 = 3 meses: (3,300 + 550) ÷ 12 = 320.83. Total 1,674.68.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 1100,
      fechaIngreso: "2023-01-16",
      fechaSalida: "2026-03-15",
      motivo: "renuncia",
      indefinido: true,
      mesesVacaciones: 5.5,
    },
    esperado: { prima: 803.85, indemnizacion: 0, vacaciones: 550, decimo: 320.83, total: 1674.68 },
  },
  {
    nombre: "Contrato por tiempo definido: sin prima ni indemnización",
    origen: {
      tipo: "recalculado",
      detalle: "Vacaciones 1,000 × 5 ÷ 11 = 454.55. Décimo del 16/4 al 30/6 = 2.5 meses: (2,500 + 454.55) ÷ 12 = 246.21. Total 700.76.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 1000,
      fechaIngreso: "2026-01-01",
      fechaSalida: "2026-06-30",
      motivo: "despido-injustificado",
      indefinido: false,
      mesesVacaciones: 5,
    },
    esperado: { prima: 0, indemnizacion: 0, vacaciones: 454.55, decimo: 246.21, total: 700.76 },
  },
  {
    nombre: "Despido injustificado de una relación anterior a la Ley 44",
    origen: { tipo: "recalculado", detalle: "La escala del literal C no aplica: la calculadora rechaza la entrada." },
    fecha: "2026-10-07",
    entrada: {
      salario: 1000,
      fechaIngreso: "1990-01-01",
      fechaSalida: "2026-06-30",
      motivo: "despido-injustificado",
      indefinido: true,
      mesesVacaciones: 0,
    },
    esperaError: true,
  },
]);
