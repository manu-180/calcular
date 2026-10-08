import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido con cuatro años y siete meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 01/03/2022 al 30/09/2026: 4 años y 214 días (4.5863 años). Art. 45: 3 + 1.5863 × 20 / 30 = 4.0575 meses × 12000 = 48690.41. Aguinaldo del 01/12/2025 al 30/09/2026: 304 días, 12000 × 304 / 365 = 9994.52. Vacaciones: 30 × 214 / 365 = 17.59 días × 400 = 7036. Total 65720.93.",
    },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2022-03-01", fechaSalida: "2026-09-30", motivo: "despido", salario: 12000, vacacionesPendientes: null },
    esperado: { anios: 4.59, indemnizacion: 48690.41, diasAguinaldo: 304, aguinaldo: 9994.52, diasVacaciones: 17.59, vacaciones: 7036, total: 65720.93 },
  },
  {
    nombre: "Renuncia al cumplir un año, con 10 días de vacaciones pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 43 y 45: 1 año = 1 mes, 9000. Aguinaldo del 01/12/2025 al 30/06/2026: 212 días, 9000 × 212 / 365 = 5227.40. Vacaciones: 10 × 300 = 3000. Total 17227.40.",
    },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2025-07-01", fechaSalida: "2026-06-30", motivo: "renuncia", salario: 9000, vacacionesPendientes: 10 },
    esperado: { anios: 1, meses: 1, indemnizacion: 9000, aguinaldo: 5227.4, vacaciones: 3000, total: 17227.4 },
  },
  {
    nombre: "Despido con causa justificada justo al cumplir seis años",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 48 y 42: sin indemnización. Año completo de vacaciones: 30 días × 200 = 6000. Aguinaldo: 304 días, 6000 × 304 / 365 = 4997.26. Total 10997.26.",
    },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2020-10-01", fechaSalida: "2026-09-30", motivo: "despido-justificado", salario: 6000, vacacionesPendientes: null },
    esperado: { anios: 6, indemnizacion: 0, diasVacaciones: 30, vacaciones: 6000, aguinaldo: 4997.26, total: 10997.26 },
  },
]);
