import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-por-anos-de-servicio";

export default definirCasos(indemnizacion, [
  {
    nombre: "5 años y 7 meses, sin aviso",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 163: 30 días por año y fracción superior a 6 meses. 5 años y 7 meses = 6 años = 180 días. 1.200.000 × 180 / 30 = 7.200.000. Aviso previo (art. 162): una remuneración, 1.200.000. Total 8.400.000.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2021-03-01", termino: "2026-10-05", remuneracion: 1200000, sinAviso: true },
    esperado: { aniosServicio: 6, indemnizacionAnios: 7200000, indemnizacionAviso: 1200000, total: 8400000 },
  },
  {
    nombre: "15 años con sueldo sobre el tope y con aviso",
    origen: {
      tipo: "recalculado",
      detalle: "UF 7/10/2026 41.114,54. Tope 90 UF = 3.700.308,6 → 3.700.309. 15 años topan en 330 días (11 años). 3.700.309 × 330 / 30 = 40.703.399. Con aviso, sin indemnización sustitutiva.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2011-09-01", termino: "2026-10-05", remuneracion: 5000000, sinAviso: false },
    esperado: { tope: 3700309, base: 3700309, aniosServicio: 11, indemnizacionAnios: 40703399, indemnizacionAviso: 0, total: 40703399 },
  },
  {
    nombre: "Menos de un año: solo el aviso previo",
    origen: { tipo: "recalculado", detalle: "10 meses de contrato: no hay indemnización por años (art. 163). Sin aviso: una remuneración de 800.000." },
    fecha: "2026-10-07",
    entrada: { inicio: "2025-12-01", termino: "2026-10-01", remuneracion: 800000, sinAviso: true },
    esperado: { indemnizacionAnios: 0, aniosServicio: 0, total: 800000 },
  },
  {
    nombre: "Exactamente 6 meses de fracción no suma un año",
    origen: { tipo: "recalculado", detalle: "2 años y 6 meses justos: la fracción no es superior a 6 meses, se pagan 2 años = 60 días. 900.000 × 2 = 1.800.000." },
    fecha: "2026-10-07",
    entrada: { inicio: "2024-04-01", termino: "2026-10-01", remuneracion: 900000, sinAviso: false },
    esperado: { aniosServicio: 2, indemnizacionAnios: 1800000 },
  },
  {
    nombre: "Fecha de término anterior al inicio",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-05-01", termino: "2026-01-01", remuneracion: 900000, sinAviso: false },
    esperaError: true,
  },
]);
