import { definirCasos } from "@/motor/calculo";
import calculadora from "./dmei-havraa";

export default definirCasos(calculadora, [
  {
    nombre: "Ejemplo del ministerio: media jornada, segundo año",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.il/he/pages/convalescence-pay",
      detalle: "Media jornada durante dos años: 2,5 días el primer año y 3 días el segundo. Acá el segundo año: 6 x 50 % = 3 días.",
    },
    fecha: "2026-10-24",
    entrada: { shana: 2, misra: 50, erechYom: 400 },
    esperado: { yamim: 3, schum: 1200 },
  },
  {
    nombre: "Primer año a media jornada",
    origen: { tipo: "oficial", url: "https://www.gov.il/he/pages/convalescence-pay", detalle: "El mismo ejemplo: 2,5 días el primer año." },
    fecha: "2026-10-24",
    entrada: { shana: 1, misra: 50, erechYom: 400 },
    esperado: { yamim: 2.5, schum: 1000 },
  },
  {
    nombre: "Año 12, jornada completa",
    origen: { tipo: "recalculado", detalle: "Tabla: 11 a 15 años, 8 días. 8 x 450 = 3.600." },
    fecha: "2026-10-24",
    entrada: { shana: 12, misra: 100, erechYom: 450 },
    esperado: { yamim: 8, schum: 3600 },
  },
  {
    nombre: "Sin valor del día",
    origen: { tipo: "recalculado", detalle: "Valor 0." },
    fecha: "2026-10-24",
    entrada: { shana: 3, misra: 100, erechYom: 0 },
    esperaError: true,
  },
]);
