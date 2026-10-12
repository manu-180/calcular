import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido sin causa después de 4 años y 7 meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 18000 / 30 = 600. Preaviso (art. 116 e): 60 × 600 = 36000. Cesantía (art. 120): 4 + 210/360 = 4.5833 meses × 18000 = 82500. Vacaciones proporcionales (arts. 345 y 346): 20 × 214 / 365 = 11.73 días × 600 = 7038. Décimo tercero: 18000 × 273 / 365 = 13463.01. Décimo cuarto: 18000 × 92 / 365 = 4536.99. Total 143538.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaSalida: "2026-09-30", motivo: "despido", preavisoDado: false, microempresa: false, diasPendientes: 0 },
    esperado: { preaviso: 36000, cesantia: 82500, diasVacacionesProporcionales: 11.73, vacacionesProporcionales: 7038, decimoTercero: 13463.01, decimoCuarto: 4536.99, total: 143538 },
  },
  {
    nombre: "Renuncia con 5 días de vacaciones pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "Sin preaviso ni cesantía (menos de 15 años) ni vacaciones proporcionales (art. 349). Vacaciones pendientes 5 × 600 = 3000. Décimos 13463.01 + 4536.99. Total 21000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaSalida: "2026-09-30", motivo: "renuncia", preavisoDado: false, microempresa: false, diasPendientes: 5 },
    esperado: { preaviso: 0, cesantia: 0, vacacionesPendientes: 3000, vacacionesProporcionales: 0, total: 21000 },
  },
  {
    nombre: "Renuncia con 16 años: 35 % de la cesantía",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 150-2008, art. 120 g: 16 años, 8 meses y 27 días = 16 + 267/360 = 16.7417 meses. 20000 × 16.7417 × 35 % = 117191.67. Décimos: 20000 × 273 / 365 = 14958.90 y 20000 × 92 / 365 = 5041.10.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 20000, fechaIngreso: "2010-01-04", fechaSalida: "2026-09-30", motivo: "renuncia", preavisoDado: false, microempresa: false, diasPendientes: 0 },
    esperado: { cesantia: 117191.67, decimoTercero: 14958.9, decimoCuarto: 5041.1, total: 137191.67 },
  },
  {
    nombre: "Despido justificado: solo lo ganado",
    origen: { tipo: "recalculado", detalle: "Sin preaviso, cesantía ni vacaciones proporcionales. Solo los décimos proporcionales: 13463.01 + 4536.99 = 18000." },
    fecha: "2026-10-12",
    entrada: { salario: 18000, fechaIngreso: "2022-03-01", fechaSalida: "2026-09-30", motivo: "despido-justificado", preavisoDado: false, microempresa: false, diasPendientes: 0 },
    esperado: { preaviso: 0, cesantia: 0, total: 18000 },
  },
]);
