import { definirCasos } from "@/motor/calculo";
import mrpVTenge from "./mrp-v-tenge";

const BUDGET = "https://www.gov.kz/memleket/entities/kgd-ulytau/documents/details/939202?lang=ru";

export default definirCasos(mrpVTenge, [
  {
    nombre: "10 МРП в 2026 году",
    origen: { tipo: "recalculado", url: BUDGET, detalle: "10 × 4325 = 43 250 тенге." },
    fecha: "2026-10-24",
    entrada: { napravlenie: "v-tenge", kolichestvo: 10 },
    esperado: { tenge: 43250, mrp: 4325, mzp: 85000, prozhitochnyy: 50851 },
  },
  {
    nombre: "100 000 тенге в МРП",
    origen: { tipo: "recalculado", url: BUDGET, detalle: "100 000 / 4325 = 23,12 МРП." },
    fecha: "2026-10-24",
    entrada: { napravlenie: "v-mrp", kolichestvo: 100000 },
    esperado: { mrpKolichestvo: 23.12, tenge: 100000 },
  },
  {
    nombre: "Ноль",
    origen: { tipo: "recalculado", url: BUDGET, detalle: "Количество должно быть больше нуля." },
    fecha: "2026-10-24",
    entrada: { napravlenie: "v-tenge", kolichestvo: 0 },
    esperaError: true,
  },
]);
