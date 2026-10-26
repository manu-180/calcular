import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const AVISO = {
  tipo: "oficial",
  url: "https://labourdept.gov.lk/wp-content/uploads/2025/07/minimum-wages-ammend-2025-july.pdf",
} as const;

export default definirCasos(calculadora, [
  {
    nombre: "Monthly wage of Rs. 28,000 in October 2026",
    origen: { ...AVISO, detalle: "From 1 January 2026 the national minimum monthly wage is Rs. 30,000: Rs. 2,000 short." },
    fecha: "2026-10-26",
    entrada: { periodo: "mes", pago: 28000 },
    esperado: { minimo: 30000, diaria: 1200, falta: 2000 },
  },
  {
    nombre: "Daily wage of Rs. 1,300",
    origen: { ...AVISO, detalle: "National minimum daily wage Rs. 1,200 from 1 January 2026: Rs. 100 above." },
    fecha: "2026-10-26",
    entrada: { periodo: "dia", pago: 1300 },
    esperado: { minimo: 1200, sobre: 100 },
  },
  {
    nombre: "December 2025, before the second increase",
    origen: { ...AVISO, detalle: "From 1 April 2025 to 31 December 2025: Rs. 27,000 a month and Rs. 1,080 a day." },
    fecha: "2025-12-31",
    entrada: { periodo: "mes", pago: null },
    esperado: { minimo: 27000, diaria: 1080 },
  },
]);
