import { definirCasos } from "@/motor/calculo";
import feriadoTrabajado from "./feriado-trabajado";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(feriadoTrabajado, [
  {
    nombre: "Un feriado con el salario mínimo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. XII: 100 % de recargo sobre el haber básico. 3.300 / 30 = 110; recargo 110." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 3300, feriados: 1 },
    esperado: { diario: 110, recargo: 110 },
  },
  {
    nombre: "Dos feriados con Bs 4.500",
    origen: { tipo: "recalculado", detalle: "4.500 / 30 = 150; 150 × 100 % × 2 = 300." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 4500, feriados: 2 },
    esperado: { diario: 150, recargo: 300 },
  },
  {
    nombre: "Sueldo que no divide justo por 30",
    origen: { tipo: "recalculado", detalle: "5.000 / 30 = 166,666...; tres feriados: 500 exactos (se redondea al final)." },
    fecha: "2026-10-12",
    entrada: { haberBasico: 5000, feriados: 3 },
    esperado: { diario: 166.67, recargo: 500 },
  },
]);
