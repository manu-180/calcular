import { definirCasos } from "@/motor/calculo";
import sueldoBruto from "./sueldo-bruto";

export default definirCasos(sueldoBruto, [
  {
    nombre: "Neto de 8,525.67 a la quincena",
    origen: { tipo: "recalculado", detalle: "Inverso del caso de sueldo neto: 10000 quincenales − ISR 1204.26 − IMSS 270.07 = 8525.67. Con 9999.99 el neto da 8525.66, así que el bruto más bajo es 10000." },
    fecha: "2026-10-15",
    entrada: { neto: 8525.67, periodo: "quincenal", region: "general", antiguedad: 1 },
    esperado: { bruto: 10000, isrRetenido: 1204.26, imss: 270.07, neto: 8525.67 },
  },
  {
    nombre: "Neto mensual con subsidio para el empleo",
    origen: { tipo: "recalculado", detalle: "10000 al mes da neto 9554.10. Con 9999.99: ISR 420.95 + (9999.99 − 7168.52) × 10.88 % = 729.01 − 535.65 = 193.36; IMSS 252.53; neto 9554.10 también, así que 9999.99 es el bruto más bajo." },
    fecha: "2026-10-15",
    entrada: { neto: 9554.1, periodo: "mensual", region: "general", antiguedad: 1 },
    esperado: { bruto: 9999.99, isrRetenido: 193.36, neto: 9554.1 },
  },
  {
    nombre: "Salario mínimo: el bruto es igual al neto",
    origen: { tipo: "recalculado", detalle: "315.04 × 15 = 4725.60 sin ISR ni cuota obrera." },
    fecha: "2026-10-15",
    entrada: { neto: 4725.6, periodo: "quincenal", region: "general", antiguedad: 1 },
    esperado: { bruto: 4725.6, neto: 4725.6 },
  },
  {
    nombre: "Sueldo alto con SBC topado",
    origen: { tipo: "recalculado", detalle: "150000 al mes: ISR 39770.26, IMSS 2431.27, neto 107798.47." },
    fecha: "2026-10-15",
    entrada: { neto: 107798.47, periodo: "mensual", region: "general", antiguedad: 1 },
    esperado: { bruto: 150000 },
  },
]);
