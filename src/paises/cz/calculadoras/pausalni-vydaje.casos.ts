import { definirCasos } from "@/motor/calculo";
import pausalniVydaje from "./pausalni-vydaje";

const ZDP = "https://www.zakonyprolidi.cz/cs/1992-586";

export default definirCasos(pausalniVydaje, [
  {
    nombre: "Živnostník s příjmy 1 000 000 Kč a výdaji 60 %",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Výdaje 600 000, základ 400 000, daň 60 000 − 30 840 = 29 160. Sociální: 55 % = 220 000 × 29,2 % = 64 240. Zdravotní: 50 % = 200 000 je pod minimem 12 × 24 483,50 = 293 802 × 13,5 % = 39 663,27 → 39 664. Celkem 133 064.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 1000000, typ: "zivnost", cinnost: "hlavni", mesice: 12, deti: 0 },
    esperado: { vydaje: 600000, zakladDane: 400000, dan: 29160, socialni: 64240, zdravotni: 39664, celkem: 133064 },
  },
  {
    nombre: "Řemeslník s příjmy 500 000 Kč: minimální pojistné",
    origen: {
      tipo: "recalculado",
      url: "https://www.cssz.gov.cz/-/informace-pro-osvc-o-zmene-pojistneho-na-duchodove-pojisteni-od-1-7-2026",
      detalle: "Výdaje 80 % = 400 000, základ 100 000, daň 15 000 se celá pokryje slevou. Sociální z minima 12 × 17 139 = 205 668 × 29,2 % = 60 055,06 → 60 056. Zdravotní 39 664. Celkem 99 720.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 500000, typ: "zemedelstvi-remesla", cinnost: "hlavni", mesice: 12, deti: 0 },
    esperado: { dan: 0, socialni: 60056, zdravotni: 39664, celkem: 99720 },
  },
  {
    nombre: "Vedlejší činnost pod rozhodnou částkou",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Příjmy 200 000, výdaje 60 % = 120 000, základ 80 000 < 117 521: sociální se neplatí. Zdravotní 50 % = 40 000 × 13,5 % = 5 400, minimum se u vedlejší činnosti nepoužije.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 200000, typ: "zivnost", cinnost: "vedlejsi", mesice: 12, deti: 0 },
    esperado: { socialni: 0, zdravotni: 5400, celkem: 5400 },
  },
  {
    nombre: "Svobodné povolání 3 000 000 Kč: strop výdajů a sazba 23 %",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Výdaje 40 % by byly 1 200 000, strop 800 000. Základ 2 200 000: 1 762 812 × 15 % + 437 188 × 23 % = 364 975,04 → 364 976 − 30 840 = 334 136. Sociální 1 210 000 × 29,2 % = 353 320; zdravotní 1 100 000 × 13,5 % = 148 500.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 3000000, typ: "jine", cinnost: "hlavni", mesice: 12, deti: 0 },
    esperado: { vydaje: 800000, dan: 334136, socialni: 353320, zdravotni: 148500, celkem: 835956 },
  },
  {
    nombre: "Dvě děti: daňový bonus",
    origen: {
      tipo: "recalculado",
      url: ZDP,
      detalle: "Příjmy 600 000, výdaje 360 000, základ 240 000, daň 36 000 − 30 840 = 5 160. Zvýhodnění 15 204 + 22 320 = 37 524: sleva 5 160, bonus 32 364. Celkem 60 056 + 39 664 − 32 364 = 67 356.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 600000, typ: "zivnost", cinnost: "hlavni", mesice: 12, deti: 2 },
    esperado: { slevaDeti: 5160, bonus: 32364, dan: 0, celkem: 67356 },
  },
  {
    nombre: "Nulové příjmy",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Bez příjmů není co počítat." },
    fecha: "2026-10-24",
    entrada: { prijmy: 0, typ: "zivnost", cinnost: "hlavni", mesice: 12, deti: 0 },
    esperaError: true,
  },
]);
