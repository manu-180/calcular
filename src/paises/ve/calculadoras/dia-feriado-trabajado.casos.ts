import { definirCasos } from "@/motor/calculo";
import diaFeriado from "./dia-feriado-trabajado";

export default definirCasos(diaFeriado, [
  {
    nombre: "Domingo completo con $240",
    origen: {
      tipo: "recalculado",
      detalle: "LOTTT arts. 120 y 188. $240 / 30 = 8; / 8 h = 1 la hora; con 50 % = 1,50; × 8 h = 12. Más de 4 horas: un día de descanso compensatorio.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 240, dia: "descanso", horas: 8 },
    esperado: { horaUsd: 1, horaRecargoUsd: 1.5, pagoUsd: 12, diasCompensatorio: 1, pagoBs: null },
  },
  {
    nombre: "Tres horas en el día de descanso: medio día compensatorio",
    origen: { tipo: "recalculado", detalle: "Art. 188: menos de 4 horas da medio día. 3 × 1,50 = 4,50." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 240, dia: "descanso", horas: 3 },
    esperado: { pagoUsd: 4.5, diasCompensatorio: 0.5 },
  },
  {
    nombre: "1 de mayo trabajado en bolívares, sin compensatorio",
    origen: { tipo: "recalculado", detalle: "Bs 9.600 / 30 = 320; / 8 = 40; con 50 % = 60; × 6 h = 360. Feriado de fecha fija: sin descanso compensatorio (art. 188)." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 9600, dia: "feriado", horas: 6 },
    esperado: { horaBs: 40, horaRecargoBs: 60, pagoBs: 360, diasCompensatorio: 0 },
  },
]);
