import { definirCasos } from "@/motor/calculo";
import kalkulackaDph from "./kalkulacka-dph";

const DPH = "https://www.zakonyprolidi.cz/cs/2004-235";

export default definirCasos(kalkulackaDph, [
  {
    nombre: "10 000 Kč bez DPH, základní sazba",
    origen: { tipo: "recalculado", url: DPH, detalle: "§ 47: 21 %. 10 000 × 21 % = 2 100; s DPH 12 100." },
    fecha: "2026-10-24",
    entrada: { castka: 10000, smer: "bez", sazba: "zakladni" },
    esperado: { zaklad: 10000, dph: 2100, celkem: 12100, sazba: 21 },
  },
  {
    nombre: "12 100 Kč s DPH, základní sazba",
    origen: { tipo: "recalculado", url: DPH, detalle: "§ 37: 12 100 / 1,21 = 10 000; daň 12 100 − 10 000 = 2 100." },
    fecha: "2026-10-24",
    entrada: { castka: 12100, smer: "s", sazba: "zakladni" },
    esperado: { zaklad: 10000, dph: 2100, celkem: 12100 },
  },
  {
    nombre: "1 000 Kč s DPH, snížená sazba",
    origen: { tipo: "recalculado", url: DPH, detalle: "§ 47: 12 %. 1 000 / 1,12 = 892,857 → 892,86; daň 107,14." },
    fecha: "2026-10-24",
    entrada: { castka: 1000, smer: "s", sazba: "snizena" },
    esperado: { zaklad: 892.86, dph: 107.14, sazba: 12 },
  },
  {
    nombre: "Nulová částka",
    origen: { tipo: "recalculado", url: DPH, detalle: "Bez částky není co počítat." },
    fecha: "2026-10-24",
    entrada: { castka: 0, smer: "bez", sazba: "zakladni" },
    esperaError: true,
  },
]);
