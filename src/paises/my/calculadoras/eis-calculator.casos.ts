import { definirCasos } from "@/motor/calculo";
import calculadora from "./eis-calculator";

const TABLA = "https://www.perkeso.gov.my/images/dokumen/151124-Rate%20Contribution%20ACT%20800.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "RM2,500",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 29, wages over RM2,400 up to RM2,500: RM4.90 employer and RM4.90 employee." },
    fecha: "2026-10-16",
    entrada: { sueldo: 2500 },
    esperado: { empleado: 4.9, empleador: 4.9, total: 9.8, anual: 58.8 },
  },
  {
    nombre: "RM150",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 6, wages over RM140 up to RM200: 35 sen each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 150 },
    esperado: { empleado: 0.35, total: 0.7 },
  },
  {
    nombre: "RM9,000 is over the ceiling",
    origen: { tipo: "oficial", url: TABLA, detalle: "Row 65, wages over RM6,000: RM11.90 each." },
    fecha: "2026-10-16",
    entrada: { sueldo: 9000 },
    esperado: { empleado: 11.9, total: 23.8 },
  },
  {
    nombre: "Zero wages",
    origen: { tipo: "recalculado", detalle: "Wages of 0 are not a valid input." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0 },
    esperaError: true,
  },
]);
