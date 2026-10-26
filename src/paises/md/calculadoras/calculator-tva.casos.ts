import { definirCasos } from "@/motor/calculo";
import calculatorTva from "./calculator-tva";

const MF = "https://particip.gov.md/ro/download_attachment/34715";

export default definirCasos(calculatorTva, [
  {
    nombre: "1.000 de lei plus TVA standard",
    origen: { tipo: "recalculado", url: MF, detalle: "1.000 × 20 % = 200; total 1.200." },
    fecha: "2026-10-26",
    entrada: { operatie: "adauga", suma: 1000, cota: "standard" },
    esperado: { tva: 200, cuTva: 1200, cota: 20 },
  },
  {
    nombre: "TVA din 1.200 de lei",
    origen: { tipo: "recalculado", url: MF, detalle: "1.200 / 1,2 = 1.000; TVA 200." },
    fecha: "2026-10-26",
    entrada: { operatie: "extrage", suma: 1200, cota: "standard" },
    esperado: { faraTva: 1000, tva: 200 },
  },
  {
    nombre: "Cota redusă pe 500 de lei",
    origen: { tipo: "recalculado", url: MF, detalle: "500 × 8 % = 40; total 540." },
    fecha: "2026-10-26",
    entrada: { operatie: "adauga", suma: 500, cota: "redusa" },
    esperado: { tva: 40, cuTva: 540 },
  },
  {
    nombre: "Extragere din 99,99 lei",
    origen: { tipo: "recalculado", url: MF, detalle: "99,99 / 1,2 = 83,325 → 83,33; TVA 16,66." },
    fecha: "2026-10-26",
    entrada: { operatie: "extrage", suma: 99.99, cota: "standard" },
    esperado: { faraTva: 83.33, tva: 16.66 },
  },
  {
    nombre: "Sumă zero",
    origen: { tipo: "recalculado", url: MF, detalle: "Fără sumă nu există calcul." },
    fecha: "2026-10-26",
    entrada: { operatie: "adauga", suma: 0, cota: "standard" },
    esperaError: true,
  },
]);
