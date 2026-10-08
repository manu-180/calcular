import { definirCasos } from "@/motor/calculo";
import aguinaldo from "./aguinaldo";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(aguinaldo, [
  {
    nombre: "Ejercicio del Ministerio de Trabajo (duodécimas)",
    origen: {
      tipo: "recalculado",
      url: GUIA,
      detalle: "Ejercicio de la Guía de derechos laborales del MTEPS, con las fechas corridas tres años: retiro el 15 de septiembre, sueldo promedio 3.000. Enero a agosto: 3.000 / 12 × 8 = 2.000; septiembre: 3.000 / 360 × 15 = 125. Total 2.125.",
    },
    fecha: "2026-09-20",
    entrada: { tipo: "empleado", sueldo: 3000, ingreso: "2024-07-21", retiro: "2026-09-15" },
    esperado: { gestion: "2026", tiempo: "8 meses y 15 días", aguinaldo: 2125 },
  },
  {
    nombre: "Gestión completa",
    origen: { tipo: "recalculado", detalle: "Trabajó de enero a diciembre: un sueldo promedio entero, 4.500." },
    fecha: "2026-12-15",
    entrada: { tipo: "empleado", sueldo: 4500, ingreso: "2020-03-01", retiro: null },
    esperado: { tiempo: "12 meses y 0 días", aguinaldo: 4500 },
  },
  {
    nombre: "Ingreso el 1 de octubre: justo 3 meses",
    origen: { tipo: "recalculado", url: "https://mintrabajo.gob.bo/wp-content/uploads/2025/12/INSTRUCTIVO-DGTHSO-No0119-2025.pdf", detalle: "El instructivo incluye las incorporaciones hasta el 1 de octubre. Octubre a diciembre: 3.000 / 12 × 3 = 750." },
    fecha: "2026-12-15",
    entrada: { tipo: "empleado", sueldo: 3000, ingreso: "2026-10-01", retiro: null },
    esperado: { tiempo: "3 meses y 0 días", aguinaldo: 750 },
  },
  {
    nombre: "Ingreso el 2 de octubre: no llega a 3 meses",
    origen: { tipo: "recalculado", detalle: "Del 2 de octubre al 31 de diciembre son 2 meses y 30 días: el empleado no cobra aguinaldo." },
    fecha: "2026-12-15",
    entrada: { tipo: "empleado", sueldo: 3000, ingreso: "2026-10-02", retiro: null },
    esperado: { tiempo: "2 meses y 30 días", aguinaldo: 0 },
  },
  {
    nombre: "Obrero con 1 mes y 12 días",
    origen: { tipo: "recalculado", detalle: "Al obrero le basta un mes. Del 20 de noviembre al 31 de diciembre: 1 mes y 12 días. 3.300 / 12 + 3.300 / 360 × 12 = 275 + 110 = 385." },
    fecha: "2026-12-15",
    entrada: { tipo: "obrero", sueldo: 3300, ingreso: "2026-11-20", retiro: null },
    esperado: { tiempo: "1 mes y 12 días", aguinaldo: 385 },
  },
  {
    nombre: "Retiro antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas invertidas." },
    fecha: "2026-10-07",
    entrada: { tipo: "empleado", sueldo: 3000, ingreso: "2026-09-01", retiro: "2026-08-01" },
    esperaError: true,
  },
]);
