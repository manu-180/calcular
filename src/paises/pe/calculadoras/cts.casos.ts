import { definirCasos } from "@/motor/calculo";
import cts from "./cts";

export default definirCasos(cts, [
  {
    nombre: "Depósito de noviembre 2026 con RMV, asignación familiar y gratificación de julio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Fórmula de la guía de CTS del MTPE. Gratificación de julio 2026 = 1,130 + 113 = 1,243; un sexto = 207.17. Remuneración computable al 31/10 = 1,230 + 123 + 207.17 = 1,560.17. CTS = 1,560.17 / 12 × 6 = 780.085, que redondea a 780.09.",
      url: "https://cdn.www.gob.pe/uploads/document/file/8050277/6757898-guia_compensacion_tiempo_servicios.pdf",
    },
    fecha: "2026-11-15",
    entrada: { sueldo: 1230, asignacionFamiliar: true, variable: null, gratificacion: 1243, meses: 6, dias: 0, regimen: "general" },
    esperado: { sextoGratificacion: 207.17, remuneracion: 1560.17, total: 780.09 },
  },
  {
    nombre: "Ingreso a mitad del semestre: 3 meses y 15 días",
    origen: { tipo: "recalculado", detalle: "2,000 / 12 × 3 = 500; 2,000 / 360 × 15 = 83.33; total 583.33." },
    fecha: "2026-11-15",
    entrada: { sueldo: 2000, asignacionFamiliar: false, variable: null, gratificacion: null, meses: 3, dias: 15, regimen: "general" },
    esperado: { porMeses: 500, porDias: 83.33, total: 583.33 },
  },
  {
    nombre: "Depósito de mayo 2026 con la RMV de S/ 1,130",
    origen: { tipo: "recalculado", detalle: "Asignación 113. Gratificación de diciembre 2025 = 1,243; sexto 207.17. 1,130 + 113 + 207.17 = 1,450.17; / 2 = 725.085, que redondea a 725.09." },
    fecha: "2026-05-15",
    entrada: { sueldo: 1130, asignacionFamiliar: true, variable: null, gratificacion: 1243, meses: 6, dias: 0, regimen: "general" },
    esperado: { remuneracion: 1450.17, total: 725.09 },
  },
  {
    nombre: "Pequeña empresa: la mitad",
    origen: { tipo: "recalculado", detalle: "15 remuneraciones diarias por año (DL 1086, art. 41). 2,400 + 1,200 / 6 = 2,600; 2,600 × 0.5 / 12 × 6 = 650." },
    fecha: "2026-11-15",
    entrada: { sueldo: 2400, asignacionFamiliar: false, variable: null, gratificacion: 1200, meses: 6, dias: 0, regimen: "pequena" },
    esperado: { remuneracion: 2600, total: 650 },
  },
  {
    nombre: "Microempresa: no corresponde",
    origen: { tipo: "recalculado", detalle: "DL 1086 no da CTS al trabajador de la microempresa." },
    fecha: "2026-11-15",
    entrada: { sueldo: 1230, asignacionFamiliar: false, variable: null, gratificacion: null, meses: 6, dias: 0, regimen: "micro" },
    esperado: { total: 0 },
  },
  {
    nombre: "Treinta días sueltos no valen: son un mes",
    origen: { tipo: "recalculado", detalle: "La función rechaza 30 días o más." },
    fecha: "2026-11-15",
    entrada: { sueldo: 1230, asignacionFamiliar: false, variable: null, gratificacion: null, meses: 2, dias: 30, regimen: "general" },
    esperaError: true,
  },
]);
