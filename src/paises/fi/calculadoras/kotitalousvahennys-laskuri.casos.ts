import { definirCasos } from "@/motor/calculo";
import kotitalousvahennys from "./kotitalousvahennys-laskuri";

const EN = "https://www.vero.fi/en/individuals/deductions/Tax-credit-for-household-expenses/tax-credit-amount/";
const KHV = "https://www.vero.fi/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2026/kotitalousvahennys-nousee-takautuvasti--nain-saat-korotetun-vahennyksen-kayttoosi/";
const pohja = { tyo: null, palkka: null, sivukulut: null, puoliso: false } as const;

export default definirCasos(kotitalousvahennys, [
  {
    nombre: "Verohallinnon esimerkki: puiden kaato 600 euroa",
    origen: { tipo: "oficial", url: EN, detalle: "600 × 40 % − omavastuu 150 = 90 euroa." },
    fecha: "2026-10-24",
    entrada: { ...pohja, tapa: "yritys", tyo: 600 },
    esperado: { vahennys: 90 },
  },
  {
    nombre: "Verohallinnon esimerkki: kylpyhuoneremontti 8 000 euroa, puoliso mukana",
    origen: { tipo: "oficial", url: EN, detalle: "8 000 × 40 % − 150 = 3 050, enimmäismäärä 2 100. Puoliso saa 3 050 − 2 100 − 150 = 800." },
    fecha: "2026-10-24",
    entrada: { ...pohja, tapa: "yritys", tyo: 8000, puoliso: true },
    esperado: { sinulle: 2100, puolisolle: 800, vahennys: 2900 },
  },
  {
    nombre: "Kylpyhuoneremontti ilman puolisoa",
    origen: { tipo: "oficial", url: EN, detalle: "Vähennys on enintään 2 100 euroa henkilöä kohden." },
    fecha: "2026-10-24",
    entrada: { ...pohja, tapa: "yritys", tyo: 8000 },
    esperado: { vahennys: 2100, puolisolle: 0 },
  },
  {
    nombre: "Palkattu työntekijä: 15 prosenttia palkasta ja sivukulut",
    origen: { tipo: "recalculado", url: KHV, detalle: "5 000 × 15 % + sivukulut 1 000 = 1 750 − 150 = 1 600." },
    fecha: "2026-10-24",
    entrada: { ...pohja, tapa: "palkka", palkka: 5000, sivukulut: 1000 },
    esperado: { vahennys: 1600 },
  },
]);
