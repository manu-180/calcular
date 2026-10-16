import { definirCasos } from "@/motor/calculo";
import calculadora from "./nz-super-calculator";

const WINZ = "https://www.workandincome.govt.nz/products/benefit-rates/benefit-rates-april-2026";

export default definirCasos(calculadora, [
  {
    nombre: "Single, living alone",
    origen: { tipo: "oficial", url: WINZ, detalle: "Work and Income, rates at 1 April 2026: single living alone $1,294.74 gross, $1,110.30 net (M) a fortnight. A year after tax 1,110.30 × 26 = 28,867.80." },
    fecha: "2026-10-14",
    entrada: { situacion: "single-alone" },
    esperado: { bruto: 1294.74, neto: 1110.3, semanal: 555.15, anualNeto: 28867.8 },
  },
  {
    nombre: "Single, sharing",
    origen: { tipo: "oficial", url: WINZ, detalle: "Single sharing accommodation: $1,191.14 gross, $1,024.90 net (M) a fortnight." },
    fecha: "2026-10-14",
    entrada: { situacion: "single-sharing" },
    esperado: { bruto: 1191.14, neto: 1024.9 },
  },
  {
    nombre: "Couple, each partner",
    origen: { tipo: "oficial", url: WINZ, detalle: "Couple, both qualify: $984.28 gross and $854.08 net (M) each a fortnight." },
    fecha: "2026-10-14",
    entrada: { situacion: "couple-each" },
    esperado: { bruto: 984.28, neto: 854.08, anualBruto: 25591.28 },
  },
]);
