import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service",
    origen: { tipo: "recalculado", url: "https://media.ulii.org/media/legislation/111709/source_file/ae0785212ae9a6b7/2006-6.pdf", detalle: "Section 57(3)(b): one month. Pay in lieu 1,000,000." },
    fecha: "2026-10-24",
    entrada: { anios: 3, meses: 0, mensual: 1000000 },
    esperado: { meses: 1, semanas: null, enLugar: 1000000 },
  },
  {
    nombre: "Eight months of service",
    origen: { tipo: "recalculado", detalle: "Section 57(3)(a): two weeks. 1,300,000 × 12 / 52 × 2 = 600,000." },
    fecha: "2026-10-24",
    entrada: { anios: 0, meses: 8, mensual: 1300000 },
    esperado: { semanas: 2, meses: null, enLugar: 600000 },
  },
  {
    nombre: "Seven years of service",
    origen: { tipo: "recalculado", detalle: "Section 57(3)(c): two months. 2 × 900,000 = 1,800,000." },
    fecha: "2026-10-24",
    entrada: { anios: 7, meses: 4, mensual: 900000 },
    esperado: { meses: 2, enLugar: 1800000 },
  },
  {
    nombre: "Twelve years of service",
    origen: { tipo: "recalculado", detalle: "Section 57(3)(d): three months." },
    fecha: "2026-10-24",
    entrada: { anios: 12, meses: 0, mensual: 2000000 },
    esperado: { meses: 3, enLugar: 6000000 },
  },
  {
    nombre: "Four months of service",
    origen: { tipo: "recalculado", detalle: "Six months or less: no statutory minimum." },
    fecha: "2026-10-24",
    entrada: { anios: 0, meses: 4, mensual: 700000 },
    esperado: { semanas: null, meses: null, enLugar: 0 },
  },
]);
