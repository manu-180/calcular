import { definirCasos } from "@/motor/calculo";
import kalkulackaNemocenske from "./kalkulacka-nemocenske";

const ZNP = "https://www.zakonyprolidi.cz/cs/2006-187";
const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(kalkulackaNemocenske, [
  {
    nombre: "Mzda 34 784 Kč, nemoc 30 dní",
    origen: {
      tipo: "recalculado",
      url: ZNP,
      detalle: "Hodinový výdělek 34 784 / (40 × 4,348) = 200; redukce 90 % = 180; náhrada 60 % = 108 Kč/h, 864 Kč/den, 10 dní = 8 640. DVZ 34 784 × 12 / 365 = 1 143,58 × 90 % = 1 029,23 → 1 030; nemocenské 60 % = 618 Kč/den × 16 dní = 9 888. Celkem 18 528.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 34784, dny: 30, pracovniDny: 10, hodinTydne: 40 },
    esperado: { nahradaMzdy: 8640, nahradaZaDen: 864, dvz: 1030, nemocenskeDenne: 618, nemocenske: 9888, celkem: 18528 },
  },
  {
    nombre: "Mzda 100 000 Kč, nemoc 70 dní: všechna pásma",
    origen: {
      tipo: "recalculado",
      url: ZP,
      detalle: "Hranice náhrady 285,78 / 428,58 / 856,98 Kč. Hodinový výdělek 574,98 → redukovaný 386,80; náhrada 1 856,65 Kč/den, 10 dní 18 566,45. DVZ 3 287,67 → 1 469,70 + 489,60 + 251,60 = 2 210,90 → 2 211. Nemocenské 16 × 1 327 + 30 × 1 460 + 10 × 1 592 = 80 952.",
    },
    fecha: "2026-10-24",
    entrada: { mzda: 100000, dny: 70, pracovniDny: 10, hodinTydne: 40 },
    esperado: { nahradaMzdy: 18566.45, dvz: 2211, nemocenske: 80952, celkem: 99518.45 },
  },
  {
    nombre: "Krátká nemoc 10 dní: jen náhrada mzdy",
    origen: { tipo: "recalculado", url: ZP, detalle: "Do 14. dne platí jen zaměstnavatel. 8 pracovních dní × 1 405,08 = 11 240,67; nemocenské 0." },
    fecha: "2026-10-24",
    entrada: { mzda: 60000, dny: 10, pracovniDny: 8, hodinTydne: 40 },
    esperado: { nemocenske: 0, nahradaMzdy: 11240.67 },
  },
  {
    nombre: "Nulová mzda",
    origen: { tipo: "recalculado", url: ZNP, detalle: "Bez příjmu nelze dávku spočítat." },
    fecha: "2026-10-24",
    entrada: { mzda: 0, dny: 30, pracovniDny: 10, hodinTydne: 40 },
    esperaError: true,
  },
]);
