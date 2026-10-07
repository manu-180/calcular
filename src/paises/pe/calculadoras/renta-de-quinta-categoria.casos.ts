import { definirCasos } from "@/motor/calculo";
import renta from "./renta-de-quinta-categoria";

export default definirCasos(renta, [
  {
    nombre: "Sueldo de S/ 5,000 con gratificaciones en 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "LIR arts. 46 y 53, UIT 2026 = 5,500. Ingreso: 5,000 × 12 + 10,000 + 9 % de 10,000 = 70,900. Menos 7 UIT (38,500) = 32,400. Impuesto: 27,500 × 8 % = 2,200 más 4,900 × 14 % = 686. Total 2,886; por mes 240.50.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 5000, asignacionFamiliar: false, gratificaciones: "completas", seguro: "essalud", otrosIngresos: null, gastosDeducibles: null },
    esperado: { ingresoAnual: 70900, deduccion: 38500, rentaNeta: 32400, impuestoAnual: 2886, retencionMensual: 240.5 },
  },
  {
    nombre: "Ingreso que no llega a 7 UIT",
    origen: { tipo: "recalculado", detalle: "2,500 × 12 + 5,000 + 450 = 35,450, menos que 38,500: no paga." },
    fecha: "2026-10-07",
    entrada: { sueldo: 2500, asignacionFamiliar: false, gratificaciones: "completas", seguro: "essalud", otrosIngresos: null, gastosDeducibles: null },
    esperado: { ingresoAnual: 35450, rentaNeta: 0, impuestoAnual: 0 },
  },
  {
    nombre: "Sueldo alto: pasa por los cinco tramos",
    origen: {
      tipo: "recalculado",
      detalle:
        "25,000 × 14 + 9 % de 50,000 = 354,500; menos 38,500 = 316,000. 27,500 × 8 % = 2,200; 82,500 × 14 % = 11,550; 82,500 × 17 % = 14,025; 55,000 × 20 % = 11,000; 68,500 × 30 % = 20,550. Total 59,325.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 25000, asignacionFamiliar: false, gratificaciones: "completas", seguro: "essalud", otrosIngresos: null, gastosDeducibles: null },
    esperado: { rentaNeta: 316000, impuestoAnual: 59325, retencionMensual: 4943.75 },
  },
  {
    nombre: "Deducción por gastos por encima del tope de 3 UIT",
    origen: { tipo: "recalculado", detalle: "Gastos 20,000, tope 3 UIT = 16,500. 70,900 − 38,500 − 16,500 = 15,900; 8 % = 1,272." },
    fecha: "2026-10-07",
    entrada: { sueldo: 5000, asignacionFamiliar: false, gratificaciones: "completas", seguro: "essalud", otrosIngresos: null, gastosDeducibles: 20000 },
    esperado: { gastos: 16500, rentaNeta: 15900, impuestoAnual: 1272 },
  },
  {
    nombre: "Pequeña empresa con EPS y asignación familiar",
    origen: {
      tipo: "recalculado",
      detalle: "Mensual 4,000 + 123 = 4,123. Gratificaciones: 4,123 (dos medias); 6.75 % = 278.30. Ingreso 49,476 + 4,123 + 278.30 = 53,877.30. Neta 15,377.30; 8 % = 1,230.18.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 4000, asignacionFamiliar: true, gratificaciones: "medias", seguro: "eps", otrosIngresos: null, gastosDeducibles: null },
    esperado: { ingresoAnual: 53877.3, rentaNeta: 15377.3, impuestoAnual: 1230.18 },
  },
]);
