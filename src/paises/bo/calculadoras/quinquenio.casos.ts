import { definirCasos } from "@/motor/calculo";
import quinquenio from "./quinquenio";

export default definirCasos(quinquenio, [
  {
    nombre: "Diez años, dos quinquenios",
    origen: {
      tipo: "recalculado",
      url: "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf",
      detalle: "D.S. 522 (guía del MTEPS, cap. XVI): el quinquenio consolida la indemnización de 5 años, un sueldo por año. 10 años: 2 quinquenios de 6.000 × 5 = 30.000; total 60.000. El próximo consolida a los 15 años.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 6000, ingreso: "2016-03-01", solicitud: "2026-10-07", cobrados: 0 },
    esperado: { anios: 10, aCobrar: 2, porQuinquenio: 30000, total: 60000, proximo: "2031-03-01" },
  },
  {
    nombre: "El día que cumple 5 años",
    origen: { tipo: "recalculado", detalle: "Ingreso 7/10/2021, solicitud 7/10/2026: 5 años justos, un quinquenio de 4.000 × 5 = 20.000." },
    fecha: "2026-10-07",
    entrada: { sueldo: 4000, ingreso: "2021-10-07", solicitud: "2026-10-07", cobrados: 0 },
    esperado: { anios: 5, aCobrar: 1, total: 20000 },
  },
  {
    nombre: "Un día antes de los 5 años",
    origen: { tipo: "recalculado", detalle: "Ingreso 8/10/2021, solicitud 7/10/2026: 4 años. Todavía no consolida; el primero llega el 8/10/2026." },
    fecha: "2026-10-07",
    entrada: { sueldo: 4000, ingreso: "2021-10-08", solicitud: "2026-10-07", cobrados: 0 },
    esperado: { anios: 4, aCobrar: 0, total: 0, proximo: "2026-10-08" },
  },
  {
    nombre: "Once años con uno ya cobrado",
    origen: { tipo: "recalculado", detalle: "11 años: 2 quinquenios consolidados, 1 ya cobrado. Queda 1: 5.000 × 5 = 25.000." },
    fecha: "2026-10-07",
    entrada: { sueldo: 5000, ingreso: "2015-06-15", solicitud: "2026-10-07", cobrados: 1 },
    esperado: { anios: 11, aCobrar: 1, total: 25000 },
  },
  {
    nombre: "Más quinquenios cobrados que consolidados",
    origen: { tipo: "recalculado", detalle: "Con 6 años solo hay un quinquenio consolidado." },
    fecha: "2026-10-07",
    entrada: { sueldo: 5000, ingreso: "2020-01-01", solicitud: "2026-10-07", cobrados: 2 },
    esperaError: true,
  },
]);
