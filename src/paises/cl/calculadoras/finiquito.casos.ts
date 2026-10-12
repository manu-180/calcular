import { definirCasos } from "@/motor/calculo";
import finiquito from "./finiquito";

export default definirCasos(finiquito, [
  {
    nombre: "Despido sin aviso con 6 años y 7 meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "1/3/2020 al 15/10/2026: 6 años, 7 meses y 14 días; más de 6 meses suma un año: 7 × 30 = 210 días → 1.200.000 × 7 = 8.400.000. Aviso: 1.200.000. Feriado: 1,25 × 7 + 1,25 / 30 × 14 = 9,3333 hábiles desde el 16/10; caen 4 sábados y domingos hasta el 29/10 → 13,3333 corridos × 40.000 = 533.333.",
    },
    fecha: "2026-10-15",
    entrada: { inicio: "2020-03-01", termino: "2026-10-15", remuneracion: 1200000, causal: "necesidades-empresa", avisoPrevio: false, diasPendientes: 0, zonaAustral: false },
    esperado: { aniosServicio: 7, indemnizacionAnios: 8400000, indemnizacionAviso: 1200000, diasFeriado: 13.3333, feriado: 533333, total: 10133333 },
    tolerancia: 0.001,
  },
  {
    nombre: "Tope de 90 UF y de 11 años",
    origen: {
      tipo: "recalculado",
      detalle:
        "El caso se evalúa al 9/10/2026 (fecha con UF ya publicada, así no cambia cuando el cron agrega días): UF 41.130,94 × 90 = 3.701.785. 16 años y 9 meses → 17 años, tope 330 días = 11 × 3.701.785 = 40.719.635. Con aviso dado no hay sustitutiva. Feriado 1,25 × 9 + 1,25 / 30 × 5 = 11,4583 hábiles + 6 inhábiles = 17,4583 × 5.000.000 / 30 = 2.909.722.",
    },
    fecha: "2026-10-09",
    entrada: { inicio: "2010-01-10", termino: "2026-10-15", remuneracion: 5000000, causal: "necesidades-empresa", avisoPrevio: true, diasPendientes: 0, zonaAustral: false },
    esperado: { base: 3701785, indemnizacionAnios: 40719635, indemnizacionAviso: 0, feriado: 2909722, total: 43629357 },
  },
  {
    nombre: "Renuncia antes del año: solo vacaciones",
    origen: {
      tipo: "recalculado",
      detalle: "15/3/2026 al 7/10/2026: 6 meses y 22 días → 7,5 + 0,9167 = 8,4167 hábiles desde el 8/10, con 4 días de fin de semana → 12,4167 × 30.000 = 372.500.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-03-15", termino: "2026-10-07", remuneracion: 900000, causal: "renuncia", avisoPrevio: false, diasPendientes: 0, zonaAustral: false },
    esperado: { indemnizacionAnios: 0, indemnizacionAviso: 0, feriado: 372500, total: 372500 },
  },
  {
    nombre: "Contrato anterior al 14/8/1981: sin tope de 11 años",
    origen: {
      tipo: "recalculado",
      detalle: "Código del Trabajo, art. 7 transitorio. 1/5/1980 al 7/10/2026: 46 años, 5 meses y 6 días → 46 años × 1.000.000. Feriado 6,5 hábiles + 2 inhábiles = 8,5 × 33.333,33 = 283.333.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "1980-05-01", termino: "2026-10-07", remuneracion: 1000000, causal: "necesidades-empresa", avisoPrevio: true, diasPendientes: 0, zonaAustral: false },
    esperado: { aniosServicio: 46, indemnizacionAnios: 46000000, feriado: 283333, total: 46283333 },
  },
  {
    nombre: "Exactamente 1 año y 6 meses: no suma otro año",
    origen: { tipo: "recalculado", detalle: "7/4/2025 al 7/10/2026: la fracción tiene que ser superior a seis meses. 1 año → 1.000.000 + aviso 1.000.000. Feriado 7,5 + 4 = 11,5 × 33.333,33 = 383.333." },
    fecha: "2026-10-07",
    entrada: { inicio: "2025-04-07", termino: "2026-10-07", remuneracion: 1000000, causal: "necesidades-empresa", avisoPrevio: false, diasPendientes: 0, zonaAustral: false },
    esperado: { aniosServicio: 1, indemnizacionAnios: 1000000, indemnizacionAviso: 1000000, feriado: 383333, total: 2383333 },
  },
  {
    nombre: "Un día más: la fracción pasa de seis meses",
    origen: { tipo: "recalculado", detalle: "7/4/2025 al 8/10/2026: 1 año, 6 meses y 1 día → 2 años = 2.000.000. Feriado 7,5417 + 4 = 11,5417 × 33.333,33 = 384.722." },
    fecha: "2026-10-08",
    entrada: { inicio: "2025-04-07", termino: "2026-10-08", remuneracion: 1000000, causal: "necesidades-empresa", avisoPrevio: false, diasPendientes: 0, zonaAustral: false },
    esperado: { aniosServicio: 2, indemnizacionAnios: 2000000, feriado: 384722, total: 3384722 },
  },
  {
    nombre: "Fecha de término anterior al inicio",
    origen: { tipo: "recalculado", detalle: "La función rechaza fechas invertidas." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-10-01", termino: "2026-09-01", remuneracion: 1000000, causal: "renuncia", avisoPrevio: false, diasPendientes: 0, zonaAustral: false },
    esperaError: true,
  },
]);
