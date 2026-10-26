import { definirCasos } from "@/motor/calculo";
import kalkulatorB2b from "./kalkulator-b2b";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(kalkulatorB2b, [
  {
    nombre: "15 000 zł faktury, 1000 zł kosztów, pełny ZUS, ryczałt 12 %",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle:
        "Społeczne 1788,29 + FP i FS 138,47. Skala: zdrowotna 1099,05; podstawa 146 541; podatek 19 293; na rękę 9366,44. Liniowy: zdrowotna 598,37; odliczenie 7180,44; podatek 26 478; na rękę 9268,37. Ryczałt: zdrowotna 830,58; podstawa 153 557; podatek 18 427; na rękę 9707,08.",
    },
    fecha: "2026-10-24",
    entrada: { przychod: 15000, koszty: 1000, zus: "pelny", chorobowe: true, stawka: "12" },
    esperado: {
      zus: 1926.76,
      zdrowotnaSkala: 1099.05,
      zdrowotnaLiniowy: 598.37,
      zdrowotnaRyczalt: 830.58,
      naRekeSkala: 9366.44,
      naRekeLiniowy: 9268.37,
      naRekeRyczalt: 9707.08,
      najwiecej: 9707.08,
      najlepsza: "Ryczałt",
    },
  },
  {
    nombre: "Ulga na start, 6000 zł przychodu, 500 zł kosztów",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle:
        "Bez składek społecznych. Skala: zdrowotna 9 % z 5500 = 495; podstawa 66 000; podatek 7920 − 3600 = 4320; na rękę (12 × 5005 − 4320) / 12 = 4645.",
    },
    fecha: "2026-10-24",
    entrada: { przychod: 6000, koszty: 500, zus: "ulga-na-start", chorobowe: false, stawka: "12" },
    esperado: { zus: 0, zdrowotnaSkala: 495, naRekeSkala: 4645 },
  },
]);
