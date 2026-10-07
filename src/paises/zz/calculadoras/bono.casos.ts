import { definirCasos } from "@/motor/calculo";
import bono from "./bono";

export default definirCasos(bono, [
  {
    nombre: "Semestre completo en la zona norte, después del aumento",
    origen: { tipo: "recalculado", detalle: "2000 × 6 / 6 = 2000; 9 % de 2000 = 180; total 2180." },
    fecha: "2026-10-15",
    entrada: { sueldo: 2000, meses: 6, region: "norte", regimen: "general" },
    esperado: { base: 2000, bono: 2000, bonificacion: 180, total: 2180 },
  },
  {
    nombre: "Sueldo bajo el mínimo el día anterior al aumento",
    origen: { tipo: "recalculado", detalle: "Mínimo norte hasta el 30/9/2026: 1000. 1000 × 3 / 6 = 500; 9 % = 45." },
    fecha: "2026-09-30",
    entrada: { sueldo: 900, meses: 3, region: "norte", regimen: "general" },
    esperado: { base: 1000, bono: 500, bonificacion: 45, total: 545 },
  },
  {
    nombre: "Mismo sueldo el día del aumento",
    origen: { tipo: "recalculado", detalle: "Mínimo norte desde el 1/10/2026: 1100. 1100 × 3 / 6 = 550; 9 % = 49,5." },
    fecha: "2026-10-01",
    entrada: { sueldo: 900, meses: 3, region: "norte", regimen: "general" },
    esperado: { base: 1100, bono: 550, bonificacion: 49.5, total: 599.5 },
  },
  {
    nombre: "Pequeña empresa en la zona sur",
    origen: { tipo: "recalculado", detalle: "3000 × 4 × 0,5 / 6 = 1000; 9 % = 90." },
    fecha: "2026-10-15",
    entrada: { sueldo: 3000, meses: 4, region: "sur", regimen: "pequena" },
    esperado: { bono: 1000, bonificacion: 90, total: 1090 },
  },
  {
    nombre: "Redondeo a centavos en cada paso",
    origen: { tipo: "recalculado", detalle: "1234,57 × 5 / 6 = 1028,8083 → 1028,81; 9 % = 92,5929 → 92,59; total 1121,40." },
    fecha: "2026-10-15",
    entrada: { sueldo: 1234.57, meses: 5, region: "norte", regimen: "general" },
    esperado: { bono: 1028.81, bonificacion: 92.59, total: 1121.4 },
  },
  {
    nombre: "Valores fijos para probar solo la fórmula",
    origen: { tipo: "recalculado", detalle: "Con bonificación 0 % el total es el bono." },
    fecha: "2026-10-15",
    entrada: { sueldo: 600, meses: 6, region: "sur", regimen: "general" },
    valores: { "zz.bonificacion": 0, "zz.minimo": { norte: 500, sur: 500 } },
    esperado: { base: 600, bono: 600, bonificacion: 0, total: 600 },
  },
  {
    nombre: "Siete meses no existen en un semestre",
    origen: { tipo: "recalculado", detalle: "La función rechaza meses fuera de 1 a 6." },
    fecha: "2026-10-15",
    entrada: { sueldo: 1000, meses: 7, region: "norte", regimen: "general" },
    esperaError: true,
  },
]);
