import { definirCasos } from "@/motor/calculo";
import kalkulackaMaterske from "./kalkulacka-materske";

const ZNP = "https://www.zakonyprolidi.cz/cs/2006-187";

export default definirCasos(kalkulackaMaterske, [
  {
    nombre: "Mzda 34 784 Kč, jedno dítě",
    origen: {
      tipo: "recalculado",
      url: ZNP,
      detalle: "DVZ 34 784 × 12 / 365 = 1 143,58, pod první hranicí se počítá 100 % → 1 144. PPM 70 % = 800,8 → 801 Kč/den × 196 dní (28 týdnů) = 156 996.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 34784, deti: "jedno" },
    esperado: { dvz: 1144, denne: 801, tydny: 28, celkem: 156996, mesicne: 24030 },
  },
  {
    nombre: "Mzda 100 000 Kč, dvojčata",
    origen: {
      tipo: "recalculado",
      url: "https://www.zakonyprolidi.cz/cs/2025-397",
      detalle: "DVZ 3 287,67: 1 633 + 816 × 60 % + 838,67 × 30 % = 1 633 + 489,60 + 251,60 = 2 374,20 → 2 375. PPM 1 662,5 → 1 663 Kč/den × 259 dní (37 týdnů) = 430 717.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 100000, deti: "vicercata" },
    esperado: { dvz: 2375, denne: 1663, tydny: 37, celkem: 430717 },
  },
  {
    nombre: "Velmi vysoká mzda: strop dávky",
    origen: {
      tipo: "recalculado",
      url: "https://www.zakonyprolidi.cz/cs/2025-397",
      detalle: "Nad třetí hranicí 4 897 Kč se nepřihlíží: 1 633 + 489,60 + 734,40 = 2 857. PPM 70 % = 1 999,9 → 2 000 Kč/den.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 200000, deti: "jedno" },
    esperado: { dvz: 2857, denne: 2000 },
  },
  {
    nombre: "Nulová mzda",
    origen: { tipo: "recalculado", url: ZNP, detalle: "Bez příjmu nelze dávku spočítat." },
    fecha: "2026-10-24",
    entrada: { mzda: 0, deti: "jedno" },
    esperaError: true,
  },
]);
