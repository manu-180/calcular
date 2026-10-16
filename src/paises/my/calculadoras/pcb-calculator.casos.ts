import { definirCasos } from "@/motor/calculo";
import calculadora from "./pcb-calculator";

const SPEC = "https://www.hasil.gov.my/wp-content/uploads/spesifikasi-kaedah-pengiraan-berkomputer-pcb-2026.pdf";
const BASE = { otrosAlivios: 0, zakat: 0, discapacidad: false, hijosEstudios: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "HASiL example: RM5,500, spouse working, 3 children, January",
    origen: { tipo: "oficial", url: SPEC, detalle: "Example of calculation in the PCB 2026 specification: K2 = 308.63, P = 47,000.07, MTD = [(47,000.07 − 35,000) × 6% + 600] / 12 = RM110.00." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 5500, epf: 605, categoria: "spouse-working", hijos: 3, mes: "1" },
    esperado: { pcb: 110, gravable: 47000.07 },
  },
  {
    nombre: "HASiL example: same employee in February",
    origen: { tipo: "oficial", url: SPEC, detalle: "K2 = 279.00, P = 47,000.00, MTD = [(47,000 − 35,000) × 6% + 600 − 110] / 11 = RM110." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 5500, epf: 605, categoria: "spouse-working", hijos: 3, mes: "2" },
    esperado: { pcb: 110, gravable: 47000, pagado: 110 },
  },
  {
    nombre: "RM10,000 a month, single, January",
    origen: {
      tipo: "recalculado",
      detalle: "K2 = (4,000 − 1,100) / 11 = 263.63. P = 8,900 + (10,000 − 263.63) × 11 − 9,000 = 107,000.07. Tax (107,000.07 − 100,000) × 25% + 9,400 = 11,150.01; / 12 = 929.16, rounded up to 929.20.",
    },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 10000, epf: 1100, categoria: "single", hijos: 0, mes: "1" },
    esperado: { pcb: 929.2, gravable: 107000.07 },
  },
  {
    nombre: "RM3,500 a month: PCB under RM10 is not deducted",
    origen: { tipo: "recalculado", detalle: "P = 29,000.07. (9,000.07 × 3% − 250) / 12 = 1.66, below the RM10 minimum, so PCB is 0." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 3500, epf: 385, categoria: "single", hijos: 0, mes: "1" },
    esperado: { pcb: 0, gravable: 29000.07 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "A salary of 0 is not a valid input." },
    fecha: "2026-10-16",
    entrada: { ...BASE, bruto: 0, epf: 0, categoria: "single", hijos: 0, mes: "1" },
    esperaError: true,
  },
]);
