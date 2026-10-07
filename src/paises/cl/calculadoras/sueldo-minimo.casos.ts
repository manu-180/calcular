import { definirCasos } from "@/motor/calculo";
import sueldoMinimo from "./sueldo-minimo";

export default definirCasos(sueldoMinimo, [
  {
    nombre: "Jornada completa en octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/06/22/44481-B/01/2829298.pdf",
      detalle: "Ley 21.830, art. 1: $553.553 desde el 1/5/2026. Por día 553.553 / 30 = 18.451,77 → 18.452. Por hora / 30 × 28 / 168 = 3.075,29 → 3.075.",
    },
    fecha: "2026-10-07",
    entrada: { edad: "general", jornada: 42 },
    esperado: { minimo: 553553, proporcional: 553553, porDia: 18452, porHora: 3075, jornadaMaxima: 42 },
  },
  {
    nombre: "Último día del mínimo de enero",
    origen: { tipo: "oficial", url: "https://www.diariooficial.interior.gob.cl/publicaciones/2025/06/28/44185/01/2665516.pdf", detalle: "Ley 21.751: $539.000 desde el 1/1/2026. Con 44 horas: 539.000 / 30 × 28 / 176 = 2.858,33 → 2.858." },
    fecha: "2026-04-25",
    entrada: { edad: "general", jornada: 44 },
    esperado: { minimo: 539000, porHora: 2858, jornadaMaxima: 44 },
  },
  {
    nombre: "Menores de 18 y mayores de 65 desde mayo",
    origen: { tipo: "oficial", url: "https://www.diariooficial.interior.gob.cl/publicaciones/2026/06/22/44481-B/01/2829298.pdf", detalle: "Ley 21.830, art. 2: $412.938 desde el 1/5/2026." },
    fecha: "2026-05-01",
    entrada: { edad: "especial", jornada: 42 },
    esperado: { minimo: 412938, proporcional: 412938 },
  },
  {
    nombre: "Media jornada",
    origen: { tipo: "recalculado", detalle: "Art. 44: 553.553 × 21 / 42 = 276.776,5 → 276.777." },
    fecha: "2026-10-07",
    entrada: { edad: "general", jornada: 21 },
    esperado: { proporcional: 276777 },
  },
  {
    nombre: "Jornada sobre la máxima",
    origen: { tipo: "recalculado", detalle: "En octubre de 2026 el máximo es 42 horas." },
    fecha: "2026-10-07",
    entrada: { edad: "general", jornada: 44 },
    esperaError: true,
  },
]);
