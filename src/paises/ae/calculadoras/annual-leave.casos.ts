import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "Six months into the third year, nothing taken",
    origen: { tipo: "recalculado", detalle: "Article 29: 30 days a year, pro rata for part of the year: 30 x 6 / 12 = 15 days. 9,000 / 30 = 300 a day: 4,500." },
    fecha: "2026-10-17",
    entrada: { mesesTotales: 30, mesesAnio: 6, tomados: 0, arrastre: 0, basico: 9000, metodoDiario: "30" },
    esperado: { ganados: 15, pendientes: 15, pago: 4500, anual: 30 },
  },
  {
    nombre: "Nine months of service: 2 days a month",
    origen: { tipo: "recalculado", detalle: "More than six months and less than one year: 2 days x 9 months = 18 days." },
    fecha: "2026-10-17",
    entrada: { mesesTotales: 9, mesesAnio: 9, tomados: 5, arrastre: 0, basico: 6000, metodoDiario: "30" },
    esperado: { ganados: 18, pendientes: 13, pago: 2600 },
  },
  {
    nombre: "Five months of service: no paid leave yet",
    origen: { tipo: "recalculado", detalle: "Service of six months or less." },
    fecha: "2026-10-17",
    entrada: { mesesTotales: 5, mesesAnio: 5, tomados: 0, arrastre: 0, basico: 6000, metodoDiario: "30" },
    esperado: { ganados: 0, pago: 0 },
  },
  {
    nombre: "Carried-over days are added",
    origen: { tipo: "recalculado", detalle: "Full year 30 + 10 carried - 12 taken = 28 days x (12,000 x 12 / 365 = 394.52) = 11,046.58." },
    fecha: "2026-10-17",
    entrada: { mesesTotales: 48, mesesAnio: 12, tomados: 12, arrastre: 10, basico: 12000, metodoDiario: "365" },
    esperado: { pendientes: 28, pago: 11046.58 },
  },
]);
