import { definirCasos } from "@/motor/calculo";
import sueldoPorHora from "./sueldo-por-hora";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(sueldoPorHora, [
  {
    nombre: "Salario mínimo con la jornada legal",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Jornada de 8 horas (guía cap. III). 3.300 / 30 = 110 por día; 110 / 8 = 13,75 por hora; 110 × 7 = 770 por semana." },
    fecha: "2026-10-12",
    entrada: { sueldo: 3300, horasDia: null },
    esperado: { diario: 110, semanal: 770, hora: 13.75, horasDia: 8 },
  },
  {
    nombre: "Jornada de 10 horas",
    origen: { tipo: "recalculado", detalle: "6.000 / 30 = 200 por día; 200 / 10 = 20 por hora." },
    fecha: "2026-10-12",
    entrada: { sueldo: 6000, horasDia: 10 },
    esperado: { diario: 200, semanal: 1400, hora: 20, horasDia: 10 },
  },
]);
