import { definirCasos } from "@/motor/calculo";
import jornadaNocturna from "./jornada-nocturna";

export default definirCasos(jornadaNocturna, [
  {
    nombre: "Comercio al por mayor, jornada nocturna",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 31: 7 horas de noche se pagan como 8 de día. 3.02 × 8 = 24.16 por jornada; 24.16 ÷ 7 = 3.45 por hora; 6 jornadas = 144.96.",
    },
    fecha: "2026-10-12",
    entrada: { tarifaHora: 3.02, jornada: "nocturna", dias: 6 },
    esperado: { horasJornada: 7, jornada: 24.16, horaEfectiva: 3.45, semanal: 144.96, horasSemana: 42 },
  },
  {
    nombre: "Jornada mixta de cinco días",
    origen: { tipo: "recalculado", detalle: "7.5 horas mixtas = 8 de día. 4 × 8 = 32; 32 ÷ 7.5 = 4.27; 5 jornadas = 160; 37.5 horas." },
    fecha: "2026-10-12",
    entrada: { tarifaHora: 4, jornada: "mixta", dias: 5 },
    esperado: { horasJornada: 7.5, jornada: 32, horaEfectiva: 4.27, semanal: 160, horasSemana: 37.5 },
  },
]);
