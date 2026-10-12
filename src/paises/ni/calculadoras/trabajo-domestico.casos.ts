import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Despido con alimentos y habitación después de dos años y nueve meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Código del Trabajo art. 146: 6000 + 50 % = 9000 de base. Del 01/01/2024 al 30/09/2026: 2 años y 273 días (2.7479). Art. 45: 2.7479 meses × 9000 = 24731.51. Aguinaldo del 01/12/2025 al 30/09/2026: 304 días, 9000 × 304 / 365 = 7495.89. Vacaciones: 30 × 273 / 365 = 22.44 días × 300 = 6732. Total 38959.40.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2024-01-01", fechaSalida: "2026-09-30", motivo: "despido", salario: 6000, especie: true, vacacionesPendientes: null },
    esperado: { especie: 3000, base: 9000, indemnizacion: 24731.51, aguinaldo: 7495.89, diasVacaciones: 22.44, vacaciones: 6732, total: 38959.4 },
  },
  {
    nombre: "Termina dentro de los quince días de prueba",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 148: los primeros 15 días son de prueba, sin indemnización. Del 20/09 al 30/09/2026: 11 días. Aguinaldo 6000 × 11 / 365 = 180.82. Vacaciones 30 × 11 / 365 = 0.90 días × 200 = 180. Total 360.82.",
    },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-09-20", fechaSalida: "2026-09-30", motivo: "despido", salario: 6000, especie: false, vacacionesPendientes: null },
    esperado: { base: 6000, indemnizacion: 0, aguinaldo: 180.82, vacaciones: 180, total: 360.82 },
  },
]);
