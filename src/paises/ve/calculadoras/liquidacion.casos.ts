import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido injustificado a los tres años justos, con $300",
    origen: {
      tipo: "recalculado",
      detalle:
        "Prestaciones: garantía estimada 186 días × 11,33 = 2.107,38 (mayor que el retroactivo de 1.019,70). Indemnización art. 92: igual, 2.107,38. Sin fracción de vacaciones. Utilidades 2025: 30 × 12/12 × 10 = 300. Total 4.514,76.",
    },
    fecha: "2026-10-08",
    entrada: {
      moneda: "USD",
      salario: 300,
      fechaIngreso: "2023-01-01",
      fechaSalida: "2025-12-31",
      motivo: "despido-injustificado",
      diasUtilidades: 30,
      periodosPendientes: 0,
      garantia: null,
    },
    esperado: { prestacionesUsd: 2107.38, indemnizacionUsd: 2107.38, vacacionesUsd: 0, mesesUtilidades: 12, utilidadesUsd: 300, totalUsd: 4514.76, totalBs: null },
  },
  {
    nombre: "Renuncia con vacaciones vencidas y fracción del año en curso",
    origen: {
      tipo: "recalculado",
      detalle:
        "2 años y 7 meses con $600 (diario 20). Retroactivo: 3 años × 30 = 90 × 24,28 = 2.185,20; garantía cargada 3.000: se paga 3.000. Vacaciones: año en curso (17 + 17) × 7/12 = 19,8333 días + año vencido 16 + 16 = 32 días; 51,8333 × 20 = 1.036,67. Utilidades 2026: 60 × 9/12 × 20 = 900. Total 4.936,67.",
    },
    fecha: "2026-10-08",
    entrada: {
      moneda: "USD",
      salario: 600,
      fechaIngreso: "2024-03-01",
      fechaSalida: "2026-09-30",
      motivo: "renuncia",
      diasUtilidades: 60,
      periodosPendientes: 1,
      garantia: 3000,
    },
    esperado: { prestacionesUsd: 3000, indemnizacionUsd: 0, vacacionesUsd: 1036.67, mesesUtilidades: 9, utilidadesUsd: 900, totalUsd: 4936.67 },
  },
  {
    nombre: "Menos de tres meses, en bolívares, despido justificado",
    origen: {
      tipo: "recalculado",
      detalle:
        "1 mes y 15 días con Bs 1.000 (diario 33,33). Prestaciones art. 142 e: 2 × 5 = 10 días × 37,50 = 375. Vacaciones fraccionadas: 30 × 1/12 = 2,5 días × 33,33 = 83,33. Utilidades: 30 × 1/12 × 33,33 = 83,33. Total 541,66.",
    },
    fecha: "2026-10-08",
    entrada: {
      moneda: "VES",
      salario: 1000,
      fechaIngreso: "2026-01-01",
      fechaSalida: "2026-02-15",
      motivo: "despido-justificado",
      diasUtilidades: 30,
      periodosPendientes: 0,
      garantia: null,
    },
    esperado: { prestacionesBs: 375, indemnizacionBs: 0, vacacionesBs: 83.33, utilidadesBs: 83.33, totalBs: 541.66, totalUsd: null },
  },
  {
    nombre: "Más años de vacaciones vencidas que años trabajados",
    origen: { tipo: "recalculado", detalle: "Con 2 años de servicio no puede haber 3 períodos vencidos." },
    fecha: "2026-10-08",
    entrada: {
      moneda: "USD",
      salario: 600,
      fechaIngreso: "2024-03-01",
      fechaSalida: "2026-09-30",
      motivo: "renuncia",
      diasUtilidades: 30,
      periodosPendientes: 3,
      garantia: null,
    },
    esperaError: true,
  },
]);
