import { definirCasos } from "@/motor/calculo";
import impuestoSobreLaRenta from "./impuesto-sobre-la-renta";

const SAR = "https://www.sar.gob.hn/2026/01/actualizacion-de-la-tabla-progresiva-2026/";

export default definirCasos(impuestoSobreLaRenta, [
  {
    nombre: "Salario de L22,360.36: el máximo exento según el SAR",
    origen: {
      tipo: "oficial",
      url: SAR,
      detalle: "Comunicado SAR 02-2026: con salario igual o menor a L22,360.36 no se paga ISR en 2026. 22360.36 × 12 = 268324.32; menos 40000 = 228324.32, el final del tramo exento.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 22360.36, otrosIngresos: null },
    esperado: { bruta: 268324.32, deduccion: 40000, gravable: 228324.32, tasaMarginal: 0, anual: 0, mensual: 0 },
  },
  {
    nombre: "Salario de L32,346.18: el final del tramo del 15 %",
    origen: {
      tipo: "oficial",
      url: SAR,
      detalle: "El comunicado pone L32,346.18 como el salario que cierra el tramo del 15 %. 32346.18 × 12 = 388154.16; menos 40000 = 348154.16. (348154.10 − 228324.32) × 15 % = 17974.47; (348154.16 − 348154.10) × 20 % = 0.01. Total 17974.48.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 32346.18, otrosIngresos: null },
    esperado: { gravable: 348154.16, tasaMarginal: 20, anual: 17974.48, mensual: 1497.87 },
  },
  {
    nombre: "Salario de L40,000",
    origen: {
      tipo: "recalculado",
      detalle: "Ley del ISR art. 22, tabla 2026. 480000 − 40000 = 440000. (348154.10 − 228324.32) × 15 % = 17974.467; (440000 − 348154.10) × 20 % = 18369.18. Total 36343.65; por mes 3028.64.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 40000, otrosIngresos: null },
    esperado: { bruta: 480000, gravable: 440000, tasaMarginal: 20, anual: 36343.65, mensual: 3028.64, tasaEfectiva: 7.57 },
  },
  {
    nombre: "Salario de L100,000 con el tramo del 25 %",
    origen: {
      tipo: "recalculado",
      detalle: "1200000 − 40000 = 1160000. 17974.467 + (809660.75 − 348154.10) × 20 % = 92301.33 + (1160000 − 809660.75) × 25 % = 87584.8125. Total 197860.61.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 100000, otrosIngresos: null },
    esperado: { gravable: 1160000, tasaMarginal: 25, anual: 197860.61, mensual: 16488.38 },
  },
  {
    nombre: "Otros ingresos que suben de tramo",
    origen: {
      tipo: "recalculado",
      detalle: "22000 × 12 + 20000 = 284000; menos 40000 = 244000. (244000 − 228324.32) × 15 % = 2351.35.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 22000, otrosIngresos: 20000 },
    esperado: { bruta: 284000, gravable: 244000, tasaMarginal: 15, anual: 2351.35, mensual: 195.95 },
  },
]);
