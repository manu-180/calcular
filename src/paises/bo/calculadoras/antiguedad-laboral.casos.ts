import { definirCasos } from "@/motor/calculo";
import antiguedadLaboral from "./antiguedad-laboral";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(antiguedadLaboral, [
  {
    nombre: "Ejercicio del Ministerio de Trabajo",
    origen: { tipo: "oficial", url: GUIA, detalle: "Ejercicio de beneficios sociales: del 21/07/2021 al 15/09/2023 son 2 años 1 mes 25 días. Bono 5 % (2 a 4 años), vacación 15 días." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2021-07-21", hasta: "2023-09-15" },
    esperado: { antiguedad: "2 años, 1 mes y 25 días", anios: 2, aniosDecimales: 2.15, tasaBono: 5, vacacion: 15, quinquenios: 0, proximoQuinquenio: "2026-07-21" },
  },
  {
    nombre: "Cinco años justos",
    origen: { tipo: "recalculado", detalle: "Del 12/10/2021 al 12/10/2026: 5 años. Bono 11 %, vacación del 5.º año 15 días, 1 quinquenio, el próximo el 12/10/2031." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2021-10-12", hasta: "2026-10-12" },
    esperado: { anios: 5, tasaBono: 11, vacacion: 15, quinquenios: 1, proximoQuinquenio: "2031-10-12" },
  },
  {
    nombre: "Dieciséis años",
    origen: { tipo: "recalculado", detalle: "Del 01/03/2010 al 12/10/2026: 16 años, 7 meses y 11 días. Bono 34 %, vacación 30 días, 3 quinquenios, el próximo el 01/03/2030." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2010-03-01", hasta: "2026-10-12" },
    esperado: { antiguedad: "16 años, 7 meses y 11 días", aniosDecimales: 16.61, tasaBono: 34, vacacion: 30, quinquenios: 3, proximoQuinquenio: "2030-03-01" },
  },
  {
    nombre: "Fecha final anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { ingreso: "2026-10-12", hasta: "2026-01-01" },
    esperaError: true,
  },
]);
