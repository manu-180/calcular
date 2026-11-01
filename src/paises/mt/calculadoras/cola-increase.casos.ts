import { definirCasos } from "@/motor/calculo";
import calculadora from "./cola-increase";

const NMW = "https://web.archive.org/web/20260219115858/https://dier.gov.mt/en/services/employment-conditions/wages/national-minimum-wage/";

export default definirCasos(calculadora, [
  {
    nombre: "DIER scenario 1: €225 a week in 2025",
    origen: { tipo: "oficial", url: NMW, detalle: "DIER: 225.00 + COLA 4.66 = 229.66, already above the 2026 minimum." },
    fecha: "2026-10-26",
    entrada: { tipo: "whole-time", semanal: 225, hora: null, edad: "age-18-plus" },
    esperado: { nuevo: 229.66, aumento: 4.66 },
  },
  {
    nombre: "DIER scenario 2: €222 a week in 2025",
    origen: { tipo: "oficial", url: NMW, detalle: "DIER: 222.00 + 4.66 = 226.66 is under the minimum, so the wage goes up to 229.44." },
    fecha: "2026-10-26",
    entrada: { tipo: "whole-time", semanal: 222, hora: null, edad: "age-18-plus" },
    esperado: { nuevo: 229.44, aumento: 7.44 },
  },
  {
    nombre: "DIER scenario 3: €8.00 an hour part-time",
    origen: { tipo: "oficial", url: NMW, detalle: "DIER: the hourly COLA is €0.12 (4.66 / 40 = 0.1165), so 8.00 becomes 8.12." },
    fecha: "2026-10-26",
    entrada: { tipo: "part-time", semanal: null, hora: 8, edad: "age-18-plus" },
    esperado: { nuevo: 8.12, aumento: 0.12 },
  },
  {
    nombre: "Weekly wage of €600",
    origen: { tipo: "recalculado", detalle: "L.N. 290 of 2025: 600 + 4.66 = 604.66." },
    fecha: "2026-10-26",
    entrada: { tipo: "whole-time", semanal: 600, hora: null, edad: "age-18-plus" },
    esperado: { nuevo: 604.66 },
  },
]);
