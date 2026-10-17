import { definirCasos } from "@/motor/calculo";
import calculadora from "./rsz-berekenen";

const WERKBONUS = "https://www.socialsecurity.be/employer/instructions/dmfa/nl/latest/instructions/deductions/workers_reductions/workbonus.html" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Bediende, € 2.800, werkbonus luik A en deels luik B",
    origen: {
      tipo: "recalculado",
      url: WERKBONUS,
      detalle: "RSZ 2.800 × 13,07 % = 365,96. Luik A 127,54; luik B 171,99 − 0,2699 × 499,38 = 37,21. Na werkbonus 201,21. BBSZ alleenstaand: kwartaal 8.400 → 30,99 + 1,10 % × 1.829,46 = 51,11; ÷ 3 = 17,04.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 2800, statuut: "bediende", gezin: "alleenstaand" },
    esperado: { bijdrage: 365.96, werkbonusA: 127.54, werkbonusB: 37.21, teBetalen: 201.21, bbsz: 17.04, totaal: 218.25, belastbaar: 2598.79 },
  },
  {
    nombre: "Arbeider, € 2.000 aan 100 %: werkbonus begrensd tot de bijdrage",
    origen: {
      tipo: "recalculado",
      url: WERKBONUS,
      detalle: "RSZ op 2.160 = 282,31. Luik A 137,74 + luik B 185,75 = 323,49, meer dan de bijdrage. Luik B wordt 144,57, totaal 282,31. RSZ na werkbonus 0. BBSZ: kwartaal 6.480 → 4,22 % × 643,86 = 27,17; ÷ 3 = 9,06.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 2000, statuut: "arbeider", gezin: "alleenstaand" },
    esperado: { basis: 2160, bijdrage: 282.31, werkbonusA: 137.74, werkbonusB: 144.57, teBetalen: 0, bbsz: 9.06 },
  },
  {
    nombre: "Bediende, € 3.300 in augustus 2026 (andere loongrenzen)",
    origen: {
      tipo: "recalculado",
      url: WERKBONUS,
      detalle: "Juli en augustus 2026: luik A 127,54 − 0,3196 × (3.300 − 2.937,93) = 11,82. Vanaf september: 127,54 − 0,2739 × 362,07 = 28,37.",
    },
    fecha: "2026-08-15",
    entrada: { bruto: 3300, statuut: "bediende", gezin: "alleenstaand" },
    esperado: { werkbonusA: 11.82, werkbonusB: 0 },
  },
  {
    nombre: "Bediende, € 3.300 vanaf september 2026",
    origen: { tipo: "recalculado", url: WERKBONUS, detalle: "127,54 − 0,2739 × 362,07 = 28,37." },
    fecha: "2026-09-01",
    entrada: { bruto: 3300, statuut: "bediende", gezin: "alleenstaand" },
    esperado: { werkbonusA: 28.37 },
  },
  {
    nombre: "Partner zonder inkomen, € 5.000",
    origen: {
      tipo: "recalculado",
      detalle: "Kwartaal 15.000 → 43,32 + 1,10 % × 8.429,46 = 136,04; ÷ 3 = 45,35.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 5000, statuut: "bediende", gezin: "partner-zonder-inkomen" },
    esperado: { bijdrage: 653.5, werkbonusA: 0, bbsz: 45.35 },
  },
]);
