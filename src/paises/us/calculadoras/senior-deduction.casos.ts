import { definirCasos } from "@/motor/calculo";
import calculadora from "./senior-deduction";

const S1A = "https://www.irs.gov/pub/irs-pdf/f1040s1a.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Single senior above the threshold, with savings",
    origen: { tipo: "recalculado", url: S1A, detalle: "6000 - 6% of 25000 = 4500. Tax on 60000 is 7912, on 55500 it is 6922. Saved 990." },
    fecha: "2026-10-14",
    entrada: { estado: "single", personas: 1, magi: 100000, gravable: 60000 },
    esperado: { porPersona: 4500, total: 4500, ahorro: 990 },
  },
  {
    nombre: "Married couple, both eligible",
    origen: { tipo: "recalculado", url: S1A, detalle: "160000 is 10000 over 150000. 6% = 600. 5400 each, 10800 in total." },
    fecha: "2026-10-14",
    entrada: { estado: "mfj", personas: 2, magi: 160000, gravable: null },
    esperado: { porPersona: 5400, total: 10800, ahorro: null },
  },
  {
    nombre: "Fully phased out",
    origen: { tipo: "recalculado", url: S1A, detalle: "100000 over 75000 x 6% = 6000." },
    fecha: "2026-10-14",
    entrada: { estado: "single", personas: 1, magi: 175000, gravable: null },
    esperado: { total: 0 },
  },
  {
    nombre: "Under the threshold gets the full amount",
    origen: { tipo: "recalculado", url: S1A, detalle: "MAGI 40000 is under 75000." },
    fecha: "2026-10-14",
    entrada: { estado: "hoh", personas: 1, magi: 40000, gravable: null },
    esperado: { total: 6000 },
  },
  {
    nombre: "Married filing separately",
    origen: { tipo: "recalculado", url: S1A, detalle: "Married taxpayers must file jointly." },
    fecha: "2026-10-14",
    entrada: { estado: "mfs", personas: 1, magi: 40000, gravable: null },
    esperado: { total: 0 },
  },
]);
