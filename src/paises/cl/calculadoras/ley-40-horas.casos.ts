import { definirCasos } from "@/motor/calculo";
import ley40Horas from "./ley-40-horas";

export default definirCasos(ley40Horas, [
  {
    nombre: "Contrato de 44 horas en octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 21.561: 42 horas desde el 26/4/2026 y 40 desde el 26/4/2028. Un contrato de 44 horas pasa en 2. En 5 días: 42 / 5 = 8,4 horas por día.",
    },
    fecha: "2026-10-07",
    entrada: { horas: 44, dias: 5 },
    esperado: { maxima: 42, exceso: 2, porDia: 8.4, proximaFecha: "26-04-2028", proximaJornada: 40 },
  },
  {
    nombre: "Antes del cambio de abril de 2026",
    origen: { tipo: "recalculado", detalle: "El 25/4/2026 todavía rige 44 horas: sin exceso. La próxima etapa es el 26/4/2026 con 42 horas." },
    fecha: "2026-04-25",
    entrada: { horas: 44, dias: 6 },
    esperado: { maxima: 44, exceso: 0, proximaFecha: "26-04-2026", proximaJornada: 42 },
  },
  {
    nombre: "Ya en 40 horas",
    origen: { tipo: "recalculado", detalle: "Desde el 26/4/2028 la jornada es de 40 horas y no hay otra etapa." },
    fecha: "2028-05-01",
    entrada: { horas: 40, dias: 5 },
    esperado: { maxima: 40, exceso: 0, porDia: 8, proximaFecha: "Sin cambios anunciados", proximaJornada: null },
  },
]);
