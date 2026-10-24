import { definirCasos } from "@/motor/calculo";
import kalkulatorRyczaltu from "./kalkulator-ryczaltu";

const RYCZ = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000843";

export default definirCasos(kalkulatorRyczaltu, [
  {
    nombre: "10 000 zł miesięcznie, 12 %, pełny ZUS bez chorobowego",
    origen: {
      tipo: "recalculado",
      url: RYCZ,
      detalle: "Społeczne 1649,82 + FP i FS 138,47. Zdrowotna 830,58 (przychód 120 000 zł). Podstawa 120 000 − 19 797,84 − 4983,48 = 95 218,68 → 95 219; ryczałt 12 % = 11 426. Na rękę 6428,96.",
    },
    fecha: "2026-10-24",
    entrada: { przychod: 10000, stawka: "12", zus: "pelny", chorobowe: false, koszty: 0 },
    esperado: { zus: 1788.29, zdrowotna: 830.58, ryczaltRoczny: 11426, ryczaltMiesiecznie: 952.17, naReke: 6428.96 },
  },
  {
    nombre: "4000 zł miesięcznie, 8,5 %, preferencyjny ZUS",
    origen: {
      tipo: "recalculado",
      url: RYCZ,
      detalle: "Społeczne 420,86. Zdrowotna 498,35 (przychód 48 000 zł). Podstawa 48 000 − 5050,32 − 2990,10 = 39 959,58 → 39 960; ryczałt 8,5 % = 3396,60 → 3397. Na rękę 2797,71.",
    },
    fecha: "2026-10-24",
    entrada: { przychod: 4000, stawka: "8-5", zus: "preferencyjny", chorobowe: false, koszty: 0 },
    esperado: { zus: 420.86, zdrowotna: 498.35, ryczaltRoczny: 3397, naReke: 2797.71, prog: "Przychód do 60 000 zł w roku" },
  },
]);
