import { definirCasos } from "@/motor/calculo";
import diasDeVacaciones from "./dias-de-vacaciones";

export default definirCasos(diasDeVacaciones, [
  {
    nombre: "15 días hábiles desde un lunes",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 69: sábado inhábil. Lunes 5/10/2026 + 15 hábiles = hasta el viernes 23/10, con 4 días de fin de semana en medio. Vuelve el lunes 26/10: 21 días corridos.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-10-05", habiles: 15 },
    esperado: { ultimoDia: "23-10-2026", regreso: "26-10-2026", corridos: 21, inhabiles: 4 },
  },
  {
    nombre: "10 días desde un miércoles",
    origen: { tipo: "recalculado", detalle: "Miércoles 16/12/2026: 3 días esa semana, 5 la siguiente y 2 más: termina el martes 29/12 y vuelve el miércoles 30/12 (sin contar festivos)." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-12-16", habiles: 10 },
    esperado: { ultimoDia: "29-12-2026", regreso: "30-12-2026", corridos: 14 },
  },
  {
    nombre: "Empezar un sábado no vale",
    origen: { tipo: "recalculado", detalle: "10/10/2026 es sábado." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-10-10", habiles: 5 },
    esperaError: true,
  },
]);
