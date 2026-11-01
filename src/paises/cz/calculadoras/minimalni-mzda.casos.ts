import { definirCasos } from "@/motor/calculo";
import minimalniMzda from "./minimalni-mzda";

const SDELENI = "https://www.zakonyprolidi.cz/cs/2025-356";
const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(minimalniMzda, [
  {
    nombre: "Plný úvazek 40 hodin v roce 2026",
    origen: {
      tipo: "oficial",
      url: SDELENI,
      detalle: "Sdělení MPSV č. 356/2025 Sb.: 22 400 Kč měsíčně a 134,40 Kč za hodinu. Čistá: 22 400 − 1 591 − 1 008 − (3 360 − 2 570) = 19 011.",
    },
    fecha: "2026-10-24",
    entrada: { stanovena: "40", uvazek: 40 },
    esperado: { mesicni: 22400, hodinova: 134.4, cista: 19011, rocne: 268800 },
  },
  {
    nombre: "Třísměnný provoz 37,5 hodiny",
    origen: {
      tipo: "recalculado",
      url: ZP,
      detalle: "§ 111 odst. 5: hodinová mzda se zvyšuje úměrně zkrácení. 134,40 × 40 / 37,5 = 143,36 → 143,40 Kč (desetihaléře nahoru).",
    },
    fecha: "2026-10-24",
    entrada: { stanovena: "37.5", uvazek: 37.5 },
    esperado: { mesicni: 22400, hodinova: 143.4 },
  },
  {
    nombre: "Dvousměnný provoz 38,75 hodiny",
    origen: { tipo: "recalculado", url: ZP, detalle: "134,40 × 40 / 38,75 = 138,735 → 138,80 Kč." },
    fecha: "2026-10-24",
    entrada: { stanovena: "38.75", uvazek: 38.75 },
    esperado: { hodinova: 138.8 },
  },
  {
    nombre: "Poloviční úvazek 20 hodin",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 111 odst. 6: 22 400 × 20 / 40 = 11 200 Kč měsíčně; hodinová zůstává 134,40 Kč." },
    fecha: "2026-10-24",
    entrada: { stanovena: "40", uvazek: 20 },
    esperado: { mesicni: 11200, hodinova: 134.4, cista: null },
  },
  {
    nombre: "Úvazek delší než stanovená doba",
    origen: { tipo: "recalculado", url: ZP, detalle: "Úvazek 40 hodin při stanovené době 37,5 hodiny není možný." },
    fecha: "2026-10-24",
    entrada: { stanovena: "37.5", uvazek: 40 },
    esperaError: true,
  },
]);
