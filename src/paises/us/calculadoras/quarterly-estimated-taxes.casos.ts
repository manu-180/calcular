import { definirCasos } from "@/motor/calculo";
import calculadora from "./quarterly-estimated-taxes";

const ES = "https://www.irs.gov/pub/irs-pdf/f1040es.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Freelancer using last year's tax as the safe harbor",
    origen: { tipo: "recalculado", url: ES, detalle: "90% of 20000 = 18000. 100% of 16000 = 16000 is smaller. 16000 - 5000 withheld = 11000, or 2750 a quarter." },
    fecha: "2026-10-14",
    entrada: { estado: "single", esperado: 20000, retencion: 5000, anterior: 16000, agiAnterior: 100000 },
    esperado: { deuda: 15000, metaActual: 18000, metaAnterior: 16000, anual: 11000, trimestral: 2750 },
  },
  {
    nombre: "Higher income couple on the 110% rule",
    origen: { tipo: "recalculado", url: ES, detalle: "Prior AGI 200000 is over 150000: 110% of 40000 = 44000, under 90% of 60000 = 54000. 44000 - 10000 = 34000." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", esperado: 60000, retencion: 10000, anterior: 40000, agiAnterior: 200000 },
    esperado: { metaAnterior: 44000, anual: 34000, trimestral: 8500 },
  },
  {
    nombre: "Owes under the minimum",
    origen: { tipo: "recalculado", url: ES, detalle: "5000 - 4200 = 800, under 1000." },
    fecha: "2026-10-14",
    entrada: { estado: "single", esperado: 5000, retencion: 4200, anterior: null, agiAnterior: null },
    esperado: { deuda: 800, anual: 0, trimestral: 0 },
  },
  {
    nombre: "Married filing separately with the lower 110% threshold",
    origen: { tipo: "recalculado", url: ES, detalle: "Prior AGI 80000 is over 75000: 110% of 10000 = 11000. 90% of 30000 = 27000. 11000 - 2000 = 9000." },
    fecha: "2026-10-14",
    entrada: { estado: "mfs", esperado: 30000, retencion: 2000, anterior: 10000, agiAnterior: 80000 },
    esperado: { metaAnterior: 11000, anual: 9000, trimestral: 2250 },
  },
  {
    nombre: "No previous return",
    origen: { tipo: "recalculado", url: ES, detalle: "Only the 90% rule: 90% of 12000 = 10800." },
    fecha: "2026-10-14",
    entrada: { estado: "single", esperado: 12000, retencion: 0, anterior: null, agiAnterior: null },
    esperado: { metaAnterior: null, anual: 10800, trimestral: 2700 },
  },
]);
