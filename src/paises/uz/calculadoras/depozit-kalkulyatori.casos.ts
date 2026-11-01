import { definirCasos } from "@/motor/calculo";
import depozit from "./depozit-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(depozit, [
  {
    nombre: "10 mln, 20%, 12 oy, kapitallashuvsiz",
    origen: { tipo: "recalculado", url: SK, detalle: "10 000 000 × 20% = 2 000 000; 378-modda: soliq yoʻq." },
    fecha: "2026-10-24",
    entrada: { summa: 10000000, foiz: 20, oylar: 12, usul: "oddiy", toldirish: null },
    esperado: { daromad: 2000000, jami: 12000000, samarali: 20 },
  },
  {
    nombre: "Oylik kapitallashuv",
    origen: { tipo: "recalculado", url: SK, detalle: "10 000 000 × ((1 + 0,2/12)^12 − 1) = 2 193 910,8 → 2 193 911; samarali 21,94%." },
    fecha: "2026-10-24",
    entrada: { summa: 10000000, foiz: 20, oylar: 12, usul: "kapitallashuv", toldirish: null },
    esperado: { daromad: 2193911, samarali: 21.9391 },
    tolerancia: 0.01,
  },
  {
    nombre: "Har oy 1 mln qoʻshib, 3 oy",
    origen: { tipo: "recalculado", url: SK, detalle: "166 666,67 + 183 333,33 + 200 000 = 550 000; qoʻyilgan 12 000 000." },
    fecha: "2026-10-24",
    entrada: { summa: 10000000, foiz: 20, oylar: 3, usul: "oddiy", toldirish: 1000000 },
    esperado: { daromad: 550000, kiritilgan: 12000000, jami: 12550000 },
  },
]);
