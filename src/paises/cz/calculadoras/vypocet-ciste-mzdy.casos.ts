import { definirCasos } from "@/motor/calculo";
import vypocetCisteMzdy from "./vypocet-ciste-mzdy";

const ZDP = "https://www.zakonyprolidi.cz/cs/1992-586";

export default definirCasos(vypocetCisteMzdy, [
  {
    nombre: "45 000 Kč hrubého, s prohlášením, bez dětí",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Sociální 7,1 % = 3 195; zdravotní 13,5 % = 6 075, třetina 2 025; záloha 15 % z 45 000 = 6 750 − 2 570 = 4 180; čistá 45 000 − 3 195 − 2 025 − 4 180 = 35 600.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 45000, prohlaseni: true, deti: 0 },
    esperado: { socialni: 3195, zdravotni: 2025, zalohaPredSlevou: 6750, dan: 4180, cista: 35600, nakladyZamestnavatele: 60210 },
  },
  {
    nombre: "Minimální mzda 22 400 Kč a dvě děti: daňový bonus",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Sociální 1 590,40 → 1 591; zdravotní 3 024 / 3 = 1 008; záloha 3 360 − 2 570 = 790; zvýhodnění 1 267 + 1 860 = 3 127, sleva 790, bonus 2 337; čistá 22 400 − 1 591 − 1 008 + 2 337 = 22 138.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 22400, prohlaseni: true, deti: 2 },
    esperado: { socialni: 1591, zdravotni: 1008, slevaDeti: 790, bonus: 2337, dan: 0, cista: 22138 },
  },
  {
    nombre: "160 000 Kč: část nad trojnásobkem průměrné mzdy po 23 %",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Hranice 3 × 48 967 = 146 901. Záloha 146 901 × 15 % + 13 099 × 23 % = 22 035,15 + 3 012,77 = 25 047,92 → 25 048 − 2 570 = 22 478. Sociální 11 360, zdravotní 7 200, čistá 118 962.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 160000, prohlaseni: true, deti: 0 },
    esperado: { zalohaPredSlevou: 25048, dan: 22478, cista: 118962 },
  },
  {
    nombre: "33 333 Kč bez prohlášení: základ zálohy na stokoruny nahoru",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Sociální 2 366,64 → 2 367; zdravotní 4 499,96 → 4 500, třetina 1 500; základ 33 400 × 15 % = 5 010 bez slev; čistá 33 333 − 2 367 − 1 500 − 5 010 = 24 456.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 33333, prohlaseni: false, deti: 0 },
    esperado: { socialni: 2367, zdravotni: 1500, dan: 5010, cista: 24456 },
  },
  {
    nombre: "Tři děti u mzdy 60 000 Kč",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Záloha 9 000 − 2 570 = 6 430; zvýhodnění 1 267 + 1 860 + 2 320 = 5 447, celé jako sleva; daň 983. Sociální 4 260, zdravotní 2 700, čistá 60 000 − 4 260 − 2 700 − 983 = 52 057.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 60000, prohlaseni: true, deti: 3 },
    esperado: { slevaDeti: 5447, dan: 983, cista: 52057 },
  },
  {
    nombre: "Nulová mzda",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Bez mzdy není co počítat." },
    fecha: "2026-10-24",
    entrada: { hruba: 0, prohlaseni: true, deti: 0 },
    esperaError: true,
  },
]);
