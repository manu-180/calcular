import { definirCasos } from "@/motor/calculo";
import bonoNocturno from "./bono-nocturno";

export default definirCasos(bonoNocturno, [
  {
    nombre: "Veinte jornadas nocturnas con $240",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 117. $240 / 30 = 8 por jornada; 30 % = 2,40; × 20 = 48." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 240, unidad: "jornadas", cantidad: 20 },
    esperado: { baseUsd: 8, recargoUsd: 2.4, conRecargoUsd: 10.4, bonoUsd: 48, bonoBs: null },
  },
  {
    nombre: "Diez horas nocturnas en bolívares",
    origen: { tipo: "recalculado", detalle: "Bs 7.200 / 30 = 240; / 8 h = 30 la hora; 30 % = 9; × 10 = 90." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 7200, unidad: "horas", cantidad: 10 },
    esperado: { baseBs: 30, recargoBs: 9, conRecargoBs: 39, bonoBs: 90, bonoUsd: null },
  },
  {
    nombre: "Sin trabajo nocturno",
    origen: { tipo: "recalculado", detalle: "Cero jornadas dan cero bono." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 240, unidad: "jornadas", cantidad: 0 },
    esperado: { bonoUsd: 0 },
  },
]);
