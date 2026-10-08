import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(vacaciones, [
  {
    nombre: "Ejercicio del Ministerio de Trabajo",
    origen: {
      tipo: "recalculado",
      url: GUIA,
      detalle: "Ejercicio de la guía del MTEPS con fechas corridas tres años: 2 años 1 mes 25 días, SPI 3.000. Vacación por gestión 3.000 / 30 × 15 = 1.500. Fracción 15/12 × 1 + 15/360 × 25 = 2,2917 días; 100 × 2,2917 = 229,17 (la guía trunca y suma 125 + 104,1).",
    },
    fecha: "2026-09-20",
    entrada: { ingreso: "2024-07-21", corte: "2026-09-15", sueldo: 3000 },
    esperado: { anios: 2, diasUltimoAnio: 15, diasAnioEnCurso: 15, fraccion: 2.29, montoAnual: 1500, montoFraccion: 229.17 },
  },
  {
    nombre: "Cinco años justos: el quinto año todavía da 15 días",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Escala de 1 a 5 años: 15 días; de 5 a 10: 20. Al cumplir el 5.º año gana 15; el 6.º año ya suma 20." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2021-10-07", corte: "2026-10-07", sueldo: null },
    esperado: { anios: 5, diasUltimoAnio: 15, diasAnioEnCurso: 20, fraccion: 0, montoAnual: null },
  },
  {
    nombre: "Once años: 30 días",
    origen: { tipo: "recalculado", detalle: "Con 11 años cumplidos, el último año fue el 11.º: 30 días. 4.500 / 30 × 30 = 4.500." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2015-10-01", corte: "2026-10-07", sueldo: 4500 },
    esperado: { anios: 11, diasUltimoAnio: 30, diasAnioEnCurso: 30, montoAnual: 4500 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Con 8 meses todavía no hay vacación ni fracción." },
    fecha: "2026-10-07",
    entrada: { ingreso: "2026-02-01", corte: "2026-10-07", sueldo: 3300 },
    esperado: { anios: 0, diasUltimoAnio: 0, diasAnioEnCurso: 15, fraccion: 0, montoAnual: 0, montoFraccion: 0 },
  },
]);
