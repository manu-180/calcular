import { definirCasos } from "@/motor/calculo";
import finiquito from "./finiquito";

const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";

export default definirCasos(finiquito, [
  {
    nombre: "Baja voluntaria el 15 de octubre de 2026 con 14 pagas",
    origen: {
      tipo: "recalculado",
      url: ET,
      detalle:
        "Día: 25.000 / 14 / 30 = 59,5238. Salario de 15 días: 892,86. Vacaciones: 30 × 288 / 365 = 23,67 − 10 = 13,67 días = 813,69. Paga de Navidad: 1.785,71 × 107 / 184 = 1.038,43. Total 2.744,98.",
    },
    fecha: "2026-10-15",
    entrada: { alta: "2024-03-01", baja: "2026-10-15", bruto: 25000, pagas: "14", diasSinCobrar: 15, vacacionesDisfrutadas: 10, motivo: "voluntaria" },
    esperado: { salarioPendiente: 892.86, vacacionesPendientes: 13.67, vacaciones: 813.69, pagasExtra: 1038.43, indemnizacion: 0, total: 2744.98 },
  },
  {
    nombre: "Fin de contrato temporal de seis meses con pagas prorrateadas",
    origen: {
      tipo: "recalculado",
      url: ET,
      detalle: "181 días. Vacaciones 14,88 × 2.000 / 30 = 992. Indemnización: 12 × 181 / 365 = 5,95 días × 24.000 / 365 = 391,28. Total 1.383,28.",
    },
    fecha: "2026-10-14",
    entrada: { alta: "2026-01-01", baja: "2026-06-30", bruto: 24000, pagas: "12", diasSinCobrar: 0, vacacionesDisfrutadas: 0, motivo: "fin-temporal" },
    esperado: { vacaciones: 992, pagasExtra: 0, indemnizacion: 391.28, total: 1383.28 },
  },
  {
    nombre: "Fecha de baja anterior al alta",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-14",
    entrada: { alta: "2026-06-01", baja: "2026-05-01", bruto: 24000, pagas: "12", diasSinCobrar: 0, vacacionesDisfrutadas: 0, motivo: "voluntaria" },
    esperaError: true,
  },
]);
