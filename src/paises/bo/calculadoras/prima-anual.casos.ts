import { definirCasos } from "@/motor/calculo";
import primaAnual from "./prima-anual";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;
const SIN_DATOS = { utilidad: null, primasTotales: null, trabajadores: null } as const;

export default definirCasos(primaAnual, [
  {
    nombre: "Gestión completa: un sueldo",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Guía cap. IX: el equivalente a un mes de sueldo. 12 meses: 6.000." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 6000, meses: 12, dias: 0, ...SIN_DATOS },
    esperado: { prima: 6000, fondo: null },
  },
  {
    nombre: "Ocho meses y quince días: duodécimas",
    origen: { tipo: "recalculado", detalle: "3.000 / 12 × 8 = 2.000; 3.000 / 360 × 15 = 125. Total 2.125." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 3000, meses: 8, dias: 15, ...SIN_DATOS },
    esperado: { prima: 2125 },
  },
  {
    nombre: "Empleado con dos meses: no alcanza",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Hace falta más de 3 meses para empleados: con 2 meses y 20 días, prima 0." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 3000, meses: 2, dias: 20, ...SIN_DATOS },
    esperado: { prima: 0 },
  },
  {
    nombre: "Obrero con un mes y diez días",
    origen: { tipo: "recalculado", detalle: "Obreros: más de 1 mes. 3.300 / 12 = 275 más 3.300 / 360 × 10 = 91,67. Total 366,67." },
    fecha: "2026-10-12",
    entrada: { tipo: "obrero", sueldo: 3300, meses: 1, dias: 10, ...SIN_DATOS },
    esperado: { prima: 366.67 },
  },
  {
    nombre: "Empleado con tres meses justos: no alcanza",
    origen: { tipo: "recalculado", detalle: "La guía pide más de 3 meses: con 3 meses y 0 días, prima 0." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 3300, meses: 3, dias: 0, ...SIN_DATOS },
    esperado: { prima: 0 },
  },
  {
    nombre: "El 25 % de las utilidades no alcanza: partes iguales",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Utilidad 100.000: fondo 25.000. Las primas suman 40.000. Se reparte en partes iguales entre 10: 2.500." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 6000, meses: 12, dias: 0, utilidad: 100000, primasTotales: 40000, trabajadores: 10 },
    esperado: { fondo: 25000, prima: 2500 },
  },
  {
    nombre: "El fondo alcanza: un sueldo",
    origen: { tipo: "recalculado", detalle: "Utilidad 400.000: fondo 100.000 contra 40.000 de primas. Cada uno cobra su sueldo." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 6000, meses: 12, dias: 0, utilidad: 400000, primasTotales: 40000, trabajadores: 10 },
    esperado: { fondo: 100000, prima: 6000 },
  },
  {
    nombre: "Doce meses y días sueltos",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { tipo: "empleado", sueldo: 6000, meses: 12, dias: 5, ...SIN_DATOS },
    esperaError: true,
  },
]);
