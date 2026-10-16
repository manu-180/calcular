import { definirCasos } from "@/motor/calculo";
import calculadora from "./bruto-netto-berekenen";

export default definirCasos(calculadora, [
  {
    nombre: "Bediende, € 3.500 bruto, alleenstaand",
    origen: {
      tipo: "recalculado",
      detalle:
        "RSZ 3.500 × 13,07 % = 457,45; geen werkbonus boven 3.403,62. Belastbaar 3.042,55. BV: jaar 36.510,60 − forfait 6.070 = 30.440,60; 9.944,05 + 940,60 × 48,15 % = 10.396,95 − 2.987,98 = 7.408,97; ÷ 12 = 617,41. BBSZ: kwartaal 10.500 → 30,99 + 1,10 % × 3.929,46 = 74,21; ÷ 3 = 24,74. Netto 3.042,55 − 617,41 − 24,74 = 2.400,40.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 3500, statuut: "bediende", gezin: "alleenstaand", kinderen: 0, alleenstaandeOuder: false },
    esperado: { rsz: 457.45, werkbonus: 0, belastbaar: 3042.55, bedrijfsvoorheffing: 617.41, bbsz: 24.74, netto: 2400.4 },
  },
  {
    nombre: "Bediende, € 2.300 bruto, met werkbonus",
    origen: {
      tipo: "recalculado",
      detalle:
        "RSZ 300,61; werkbonus A 127,54 + B 171,99 = 299,53 (vanaf 1/9/2026). Belastbaar 2.298,92. BV: 27.587,04 − 6.070 = 21.517,04; 4.469,93 + 4.807,04 × 42,80 % = 6.527,34 − 2.987,98 = 3.539,36; ÷ 12 = 294,95. Fiscale werkbonus 42,27 + 171,99 × 63 % = 108,35 → 150,62. BV 144,33. BBSZ (30,99 + 1,10 % × 329,46) ÷ 3 = 11,54. Netto 2.143,05.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 2300, statuut: "bediende", gezin: "alleenstaand", kinderen: 0, alleenstaandeOuder: false },
    esperado: { rsz: 300.61, werkbonus: 299.53, belastbaar: 2298.92, werkbonusFiscaal: 150.62, bedrijfsvoorheffing: 144.33, bbsz: 11.54, netto: 2143.05 },
  },
  {
    nombre: "Bediende, € 2.000, partner met inkomen: werkbonus begrensd en minimum BBSZ",
    origen: {
      tipo: "recalculado",
      detalle:
        "RSZ 261,40; werkbonus 299,53 is te veel, luik B wordt 133,86 zodat de som 261,40 is. Belastbaar 2.000. BV: 24.000 − 6.070 = 17.930; 4.469,93 + 1.220 × 42,80 % = 4.992,09 − 2.987,98 = 2.004,11; ÷ 12 = 167,01. Fiscale werkbonus 42,27 + 84,33 = 126,60. BV 40,41. BBSZ minimum 15,45 per kwartaal = 5,15 per maand. Netto 1.954,44.",
    },
    fecha: "2026-10-14",
    entrada: { bruto: 2000, statuut: "bediende", gezin: "partner-met-inkomen", kinderen: 0, alleenstaandeOuder: false },
    esperado: { rsz: 261.4, werkbonus: 261.4, belastbaar: 2000, bedrijfsvoorheffing: 40.41, bbsz: 5.15, netto: 1954.44 },
  },
  {
    nombre: "Arbeider, € 4.000, partner zonder inkomen, 2 kinderen, november 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "RSZ 4.320 × 13,07 % = 564,62. Belastbaar 3.435,38. BV vanaf 1/11/2026: 41.224,56 − 6.070 = 35.154,56; huwelijksquotiënt 30 % = 10.546,37; schaal op 24.608,19 = 7.850,36 en op 10.546,37 = 2.821,15; samen 10.671,51 − 6.179,26 = 4.492,25 − 1.644 = 2.848,25; ÷ 12 = 237,35. BBSZ: (43,32 + 1,10 % × 6.389,46) = 113,60 ÷ 3 = 37,87. Netto 3.160,16.",
    },
    fecha: "2026-11-15",
    entrada: { bruto: 4000, statuut: "arbeider", gezin: "partner-zonder-inkomen", kinderen: 2, alleenstaandeOuder: false },
    esperado: { rsz: 564.62, belastbaar: 3435.38, bedrijfsvoorheffing: 237.35, bbsz: 37.87, netto: 3160.16 },
  },
  {
    nombre: "Nul bruto is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder brutoloon valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { bruto: 0, statuut: "bediende", gezin: "alleenstaand", kinderen: 0, alleenstaandeOuder: false },
    esperaError: true,
  },
]);
