import { definirCasos } from "@/motor/calculo";
import licenciasLaborales from "./licencias-laborales";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(licenciasLaborales, [
  {
    nombre: "Licencia por matrimonio con el salario mínimo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. XVII: 3 jornadas con el 100 % (D.S. 4708). 3.300 / 30 × 3 = 330." },
    fecha: "2026-10-12",
    entrada: { licencia: "matrimonio", sueldo: 3300 },
    esperado: { dias: 3, valor: 330 },
  },
  {
    nombre: "Cumpleaños: media jornada",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Media jornada: 6.000 / 30 × 0,5 = 100." },
    fecha: "2026-10-12",
    entrada: { licencia: "cumpleanios", sueldo: 6000 },
    esperado: { dias: 0.5, valor: 100 },
  },
  {
    nombre: "Paternidad sin sueldo cargado",
    origen: { tipo: "recalculado", detalle: "D.S. 1212: 3 días. Sin sueldo no se muestra el valor." },
    fecha: "2026-10-12",
    entrada: { licencia: "paternidad", sueldo: null },
    esperado: { dias: 3, valor: null },
  },
]);
