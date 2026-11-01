import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

export default definirCasos(calculadora, [
  {
    nombre: "50 horas semanales con sueldo 20.000",
    origen: {
      tipo: "recalculado",
      detalle: "Hora normal 20.000 x 12 / (40 x 52) = 115,38. Art. 39 CCGT: 8 h (41 a 48) x 115,38 x 1,15 = 1.061,54; 2 h (49 y 50) x 1,40 = 323,08. Semana 1.384,62; mes x 52 / 12 = 6.000.",
    },
    fecha: "2026-10-29",
    entrada: { salaire: 20000, heures: 50, nuit: 0, reposJour: 0, reposNuit: 0 },
    esperado: { horaire: 115.38, p1: 1061.54, p2: 323.08, semaine: 1384.62, mensuel: 6000, heuresSup: 10 },
  },
  {
    nombre: "56 horas y horas de noche en día de descanso",
    origen: { tipo: "recalculado", detalle: "Hora 104 (sueldo 18.026,67). 8 x 104 x 1,15 = 956,80; 6 x 104 x 1,40 = 873,60; 2 x 104 x 1,50 = 312; 3 h noche en descanso x 104 x 2 = 624. Semana 2.766,40." },
    fecha: "2026-10-29",
    entrada: { salaire: 18026.67, heures: 56, nuit: 0, reposJour: 0, reposNuit: 3 },
    esperado: { semaine: 2766.4, speciales: 624, heuresSup: 19 },
    tolerancia: 0.05,
  },
  {
    nombre: "Sin horas extra",
    origen: { tipo: "recalculado", detalle: "40 horas: nada que pagar aparte." },
    fecha: "2026-10-29",
    entrada: { salaire: 20000, heures: 40, nuit: 0, reposJour: 0, reposNuit: 0 },
    esperado: { mensuel: 0, heuresSup: 0 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-29",
    entrada: { salaire: 0, heures: 45, nuit: 0, reposJour: 0, reposNuit: 0 },
    esperaError: true,
  },
]);
