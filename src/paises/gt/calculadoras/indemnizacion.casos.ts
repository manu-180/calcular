import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion";

export default definirCasos(indemnizacion, [
  {
    nombre: "Despido después de 4 años y medio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 01/03/2022 al 31/08/2026: 1645 días. Salario indemnizable 6000 + 6000/12 + 6000/12 = 7000 (CT art. 82, Decreto 76-78 art. 9, Decreto 42-92 art. 4). Indemnización 7000 × 1645 / 365 = 31547.95. Aguinaldo 01/12/2025 a 31/08/2026, 274 días: 4504.11. Bono 14 01/07 a 31/08/2026, 62 días: 1019.18. Vacaciones desde el aniversario 01/03/2026, 184 días: 15 × 184 / 365 = 7.56 días × 200 = 1512. Total 38583.24.",
    },
    fecha: "2026-09-01",
    entrada: { fechaIngreso: "2022-03-01", fechaSalida: "2026-08-31", motivo: "despido", promedio: 6000, vacacionesPendientes: 0 },
    esperado: {
      diasServicio: 1645,
      salarioIndemnizable: 7000,
      indemnizacion: 31547.95,
      aguinaldo: 4504.11,
      bono14: 1019.18,
      diasVacaciones: 7.56,
      vacaciones: 1512,
      total: 38583.24,
    },
  },
  {
    nombre: "Renuncia a los tres meses: sin indemnización",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 15/11/2025 al 14/02/2026: 92 días. Aguinaldo desde el 01/12/2025, 76 días: 4000 × 76 / 365 = 832.88. Bono 14 desde el ingreso, 92 días: 1008.22. Vacaciones 15 × 92 / 365 = 3.78 días × 4000 / 30 = 504.00. Total 2345.10.",
    },
    fecha: "2026-02-15",
    entrada: { fechaIngreso: "2025-11-15", fechaSalida: "2026-02-14", motivo: "renuncia", promedio: 4000, vacacionesPendientes: 0 },
    esperado: { diasServicio: 92, indemnizacion: 0, aguinaldo: 832.88, bono14: 1008.22, diasVacaciones: 3.78, vacaciones: 504, total: 2345.1 },
  },
  {
    nombre: "Renuncia por falta del patrono con vacaciones pendientes, justo al cumplir un año",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 01/12/2025 al 30/11/2026: 365 días, indemnización de un mes con sextos: 3650 + 2 × 304.1667 = 4258.33. Aguinaldo 365 días: 3650. Bono 14 desde el 01/07/2026, 153 días: 1530. Vacaciones 15 + 5 pendientes = 20 días × 3650 / 30 = 2433.33. Total 11871.66.",
    },
    fecha: "2026-12-01",
    entrada: { fechaIngreso: "2025-12-01", fechaSalida: "2026-11-30", motivo: "despido-indirecto", promedio: 3650, vacacionesPendientes: 5 },
    esperado: { diasServicio: 365, salarioIndemnizable: 4258.33, indemnizacion: 4258.33, aguinaldo: 3650, bono14: 1530, diasVacaciones: 20, vacaciones: 2433.33, total: 11871.66 },
  },
  {
    nombre: "Fecha de ingreso posterior a la salida",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { fechaIngreso: "2026-10-01", fechaSalida: "2026-09-01", motivo: "despido", promedio: 5000, vacacionesPendientes: 0 },
    esperaError: true,
  },
]);
