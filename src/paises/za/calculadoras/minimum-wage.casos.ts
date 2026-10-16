import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Contract cleaning Area A, 45 hours",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.za/sites/default/files/gcis_document/202602/54075rg11941gon7083.pdf",
      detalle: "Gazette 54075, Sectoral Determination 1: R33,27 an hour, R1 497,15 a week (45 hours), R6 487,15 a month (4.333 weeks).",
    },
    fecha: "2026-10-14",
    entrada: { categoria: "area-a", horas: 45, pago: null },
    esperado: { hora: 33.27, semana: 1497.15, mes: 6487.15 },
  },
  {
    nombre: "Contract cleaning rest of the country, 45 hours",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.za/sites/default/files/gcis_document/202602/54075rg11941gon7083.pdf",
      detalle: "Gazette 54075, Area C: R30,33 an hour, R1 364,85 a week, R5 913,90 a month.",
    },
    fecha: "2026-10-14",
    entrada: { categoria: "area-c", horas: 45, pago: null },
    esperado: { hora: 30.33, semana: 1364.85, mes: 5913.9 },
  },
  {
    nombre: "Domestic worker, 40 hours, paid R28 an hour",
    origen: { tipo: "recalculado", detalle: "30.23 × 40 = 1 209.20 a week; × 4.333 = 5 239.46 a month. Shortfall 30.23 − 28 = 2.23 an hour." },
    fecha: "2026-10-14",
    entrada: { categoria: "domestic", horas: 40, pago: 28 },
    esperado: { hora: 30.23, semana: 1209.2, mes: 5239.46, diferencia: 2.23 },
  },
  {
    nombre: "EPWP, 45 hours",
    origen: { tipo: "recalculado", detalle: "16.62 × 45 = 747.90 a week; × 4.333 = 3 240.65 a month." },
    fecha: "2026-10-14",
    entrada: { categoria: "epwp", horas: 45, pago: null },
    esperado: { hora: 16.62, semana: 747.9, mes: 3240.65 },
  },
  {
    nombre: "More than 45 ordinary hours",
    origen: { tipo: "recalculado", detalle: "Ordinary hours cannot pass 45 a week." },
    fecha: "2026-10-14",
    entrada: { categoria: "general", horas: 50, pago: null },
    esperaError: true,
  },
]);
