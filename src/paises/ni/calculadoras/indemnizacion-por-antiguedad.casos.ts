import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-por-antiguedad";

export default definirCasos(indemnizacion, [
  {
    nombre: "Despido con cinco años",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo art. 45: 1 mes por cada uno de los 3 primeros años y 20 días por año desde el cuarto. 3 + 2 × 20 / 30 = 4.3333 meses. 15000 × 4.3333 = 65000.",
    },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2021-10-01", fechaSalida: "2026-09-30", motivo: "despido", salario: 15000 },
    esperado: { anios: 5, meses: 4.33, indemnizacion: 65000 },
  },
  {
    nombre: "Seis años: justo el máximo de cinco meses",
    origen: { tipo: "recalculado", detalle: "3 + 3 × 20 / 30 = 5 meses, que es el tope del art. 45. 9000 × 5 = 45000." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2020-01-01", fechaSalida: "2025-12-31", motivo: "despido", salario: 9000 },
    esperado: { anios: 6, meses: 5, indemnizacion: 45000 },
  },
  {
    nombre: "Ocho años: se topea en cinco meses",
    origen: { tipo: "recalculado", detalle: "3 + 5 × 20 / 30 = 6.33 meses; el art. 45 lo limita a 5. 10000 × 5 = 50000." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2018-01-01", fechaSalida: "2025-12-31", motivo: "despido", salario: 10000 },
    esperado: { anios: 8, meses: 5, indemnizacion: 50000 },
  },
  {
    nombre: "Despido a los seis meses: mínimo de un mes",
    origen: { tipo: "recalculado", detalle: "Del 01/04 al 30/09/2026: 183 días = 0.50 años. El art. 45 dice que nunca es menor de un mes: 8000." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2026-04-01", fechaSalida: "2026-09-30", motivo: "despido", salario: 8000 },
    esperado: { anios: 0.5, meses: 1, indemnizacion: 8000 },
  },
  {
    nombre: "Renuncia a los seis meses: proporcional, sin mínimo",
    origen: { tipo: "recalculado", detalle: "Art. 43. 183 / 365 = 0.50137 meses. 8000 × 183 / 365 = 4010.96." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2026-04-01", fechaSalida: "2026-09-30", motivo: "renuncia", salario: 8000 },
    esperado: { meses: 0.5, indemnizacion: 4010.96 },
  },
  {
    nombre: "Renuncia con dos años y 73 días",
    origen: { tipo: "recalculado", detalle: "Del 01/01/2024 al 14/03/2026: 2 años y 73 días (73 / 365 = 0.2). 2.2 meses × 12000 = 26400." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2024-01-01", fechaSalida: "2026-03-14", motivo: "renuncia", salario: 12000 },
    esperado: { anios: 2.2, meses: 2.2, indemnizacion: 26400 },
  },
  {
    nombre: "Despido con causa justificada",
    origen: { tipo: "recalculado", detalle: "Art. 48: el empleador solo paga lo del art. 42 (vacaciones y décimo tercer mes proporcionales)." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2020-01-01", fechaSalida: "2026-09-30", motivo: "despido-justificado", salario: 10000 },
    esperado: { meses: 0, indemnizacion: 0 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2026-09-30", fechaSalida: "2026-01-01", motivo: "despido", salario: 10000 },
    esperaError: true,
  },
]);
