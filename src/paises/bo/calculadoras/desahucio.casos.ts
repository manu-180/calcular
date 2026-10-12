import { definirCasos } from "@/motor/calculo";
import desahucio from "./desahucio";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(desahucio, [
  {
    nombre: "Ejercicio del Ministerio de Trabajo: despido sin causa",
    origen: { tipo: "oficial", url: GUIA, detalle: "Ejercicio de beneficios sociales de la guía: ingreso 21/07/2021, retiro 15/09/2023, SPI Bs 3.000. Desahucio 3.000 × 3 = Bs 9.000." },
    fecha: "2026-10-12",
    entrada: { motivo: "despido", sueldo: 3000, ingreso: "2021-07-21", retiro: "2023-09-15" },
    esperado: { antiguedad: "2 años, 1 mes y 25 días", desahucio: 9000 },
  },
  {
    nombre: "Renuncia: no hay desahucio",
    origen: { tipo: "oficial", url: GUIA, detalle: "La guía aclara: «No procede el desahucio en caso de retiro voluntario»." },
    fecha: "2026-10-12",
    entrada: { motivo: "renuncia", sueldo: 5000, ingreso: "2020-01-02", retiro: "2026-10-12" },
    esperado: { desahucio: 0 },
  },
  {
    nombre: "Despido a los 90 días justos: no alcanza",
    origen: { tipo: "recalculado", detalle: "Del 1/7 al 28/9 de 2026 son 90 días contando ambos. Hace falta más de 90: desahucio 0. Un día más (29/9) ya da 3 × 3.300 = 9.900." },
    fecha: "2026-10-12",
    entrada: { motivo: "despido", sueldo: 3300, ingreso: "2026-07-01", retiro: "2026-09-28" },
    esperado: { desahucio: 0 },
  },
  {
    nombre: "Despido a los 91 días",
    origen: { tipo: "recalculado", detalle: "Del 1/7 al 29/9 de 2026 son 91 días: 3.300 × 3 = 9.900." },
    fecha: "2026-10-12",
    entrada: { motivo: "despido", sueldo: 3300, ingreso: "2026-07-01", retiro: "2026-09-29" },
    esperado: { desahucio: 9900 },
  },
  {
    nombre: "Fecha de despido anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { motivo: "despido", sueldo: 3300, ingreso: "2026-07-01", retiro: "2026-06-01" },
    esperaError: true,
  },
]);
