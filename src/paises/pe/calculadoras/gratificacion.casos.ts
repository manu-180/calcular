import { definirCasos } from "@/motor/calculo";
import gratificacion from "./gratificacion";

export default definirCasos(gratificacion, [
  {
    nombre: "Diciembre 2026 con la RMV nueva y asignación familiar",
    origen: {
      tipo: "recalculado",
      detalle: "Plan de Fase 1 (ADR 0001): (1,230 + 123) × 1.09 = 1,474.77. RMV del DS 015-2026-TR, asignación del 10 % (Ley 25129), bonificación del 9 % (Ley 30334).",
    },
    fecha: "2026-12-15",
    entrada: { sueldo: 1230, asignacionFamiliar: true, variable: null, meses: 6, regimen: "general", seguro: "essalud" },
    esperado: { asignacion: 123, remuneracion: 1353, gratificacion: 1353, bonificacion: 121.77, total: 1474.77 },
  },
  {
    nombre: "Ejemplo de Sunafil: Navidad con comisiones (RMV de S/ 1,025)",
    origen: {
      tipo: "oficial",
      url: "https://www.gob.pe/institucion/sunafil/noticias/1069971-aprende-a-calcular-cuanto-te-corresponde-por-gratificacion-de-navidad",
      detalle: "Sunafil, 11/12/2024: S/ 1,025 + S/ 102.50 + S/ 338.33 = S/ 1,465.83 de gratificación. La bonificación del 9 % (131.92) la recalculamos.",
    },
    fecha: "2026-12-15",
    entrada: { sueldo: 1025, asignacionFamiliar: true, variable: 338.33, meses: 6, regimen: "general", seguro: "essalud" },
    valores: { "pe.rmv": 1025 },
    esperado: { asignacion: 102.5, gratificacion: 1465.83, bonificacion: 131.92, total: 1597.75 },
  },
  {
    nombre: "Julio 2026, todavía con la RMV de S/ 1,130",
    origen: { tipo: "recalculado", detalle: "RMV 1,130 hasta el 30/9/2026: asignación 113. (1,130 + 113) = 1,243; 9 % = 111.87; total 1,354.87." },
    fecha: "2026-07-15",
    entrada: { sueldo: 1130, asignacionFamiliar: true, variable: null, meses: 6, regimen: "general", seguro: "essalud" },
    esperado: { asignacion: 113, gratificacion: 1243, bonificacion: 111.87, total: 1354.87 },
  },
  {
    nombre: "Último día con la RMV vieja y primer día con la nueva",
    origen: { tipo: "recalculado", detalle: "El 30/9/2026 la asignación es 10 % de 1,130 = 113." },
    fecha: "2026-09-30",
    entrada: { sueldo: 1500, asignacionFamiliar: true, variable: null, meses: 6, regimen: "general", seguro: "essalud" },
    esperado: { asignacion: 113, gratificacion: 1613 },
  },
  {
    nombre: "Primer día con la RMV nueva",
    origen: { tipo: "recalculado", detalle: "El 1/10/2026 la asignación es 10 % de 1,230 = 123." },
    fecha: "2026-10-01",
    entrada: { sueldo: 1500, asignacionFamiliar: true, variable: null, meses: 6, regimen: "general", seguro: "essalud" },
    esperado: { asignacion: 123, gratificacion: 1623 },
  },
  {
    nombre: "Cuatro meses en el régimen general",
    origen: { tipo: "recalculado", detalle: "1,500 × 4 / 6 = 1,000; 9 % = 90; total 1,090." },
    fecha: "2026-12-15",
    entrada: { sueldo: 1500, asignacionFamiliar: false, variable: null, meses: 4, regimen: "general", seguro: "essalud" },
    esperado: { gratificacion: 1000, bonificacion: 90, total: 1090 },
  },
  {
    nombre: "Pequeña empresa con EPS",
    origen: { tipo: "recalculado", detalle: "Media remuneración (DL 1086, art. 41): 2,000 × 0.5 = 1,000; 6.75 % = 67.50; total 1,067.50." },
    fecha: "2026-12-15",
    entrada: { sueldo: 2000, asignacionFamiliar: false, variable: null, meses: 6, regimen: "pequena", seguro: "eps" },
    esperado: { gratificacion: 1000, bonificacion: 67.5, total: 1067.5 },
  },
  {
    nombre: "Microempresa: no corresponde",
    origen: { tipo: "recalculado", detalle: "DL 1086 no da gratificación al trabajador de la microempresa." },
    fecha: "2026-12-15",
    entrada: { sueldo: 1230, asignacionFamiliar: false, variable: null, meses: 6, regimen: "micro", seguro: "essalud" },
    esperado: { gratificacion: 0, total: 0 },
  },
  {
    nombre: "Siete meses no existen en un semestre",
    origen: { tipo: "recalculado", detalle: "La función rechaza más de 6 meses." },
    fecha: "2026-12-15",
    entrada: { sueldo: 1230, asignacionFamiliar: false, variable: null, meses: 7, regimen: "general", seguro: "essalud" },
    esperaError: true,
  },
]);
