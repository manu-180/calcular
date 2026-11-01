import { definirCasos } from "@/motor/calculo";
import danZPrijmov from "./dan-z-prijmov";

const N = "https://podpora.financnasprava.sk/214187-Nezdanite%C4%BEn%C3%A1-%C4%8Das%C5%A5-z%C3%A1kladu-dane-na-da%C5%88ovn%C3%ADka-za-rok-2026";
const S = "https://podpora.financnasprava.sk/081400-Sadzba-dane-z-pr%C3%ADjmov-fyzickej-osoby-za-rok-2026";

export default definirCasos(danZPrijmov, [
  {
    nombre: "Základ 27 500 eur z podnikania",
    origen: { tipo: "oficial", url: N, detalle: "Príklad Finančnej správy: 14 661,11 − 27 500 / 3 = 5 494,44. Sadzba 15 %: 22 005,56 × 15 % = 3 300,83." },
    fecha: "2026-06-15",
    entrada: { zaklad: 27500, typ: "szco", prijmy: 50000 },
    esperado: { nczd: 5494.44, dan: 3300.83 },
  },
  {
    nombre: "Zamestnanec so základom 20 000 eur",
    origen: { tipo: "recalculado", url: S, detalle: "20 000 − 5 966,73 = 14 033,27; 19 % = 2 666,32." },
    fecha: "2026-06-15",
    entrada: { zaklad: 20000, typ: "zamestnanec", prijmy: null },
    esperado: { dan: 2666.32 },
  },
  {
    nombre: "Zamestnanec so základom 50 000 eur: dve pásma",
    origen: { tipo: "recalculado", url: S, detalle: "NČZD 0; 43 983,32 × 19 % = 8 356,8308; 6 016,68 × 25 % = 1 504,17; spolu 9 861,00." },
    fecha: "2026-06-15",
    entrada: { zaklad: 50000, typ: "zamestnanec", prijmy: null },
    esperado: { nczd: 0, dan: 9861 },
  },
  {
    nombre: "Podnikanie s príjmami nad 100 000 eur",
    origen: { tipo: "recalculado", url: S, detalle: "Bod 3 sadzieb: 50 000 sa zdaní v pásmach, 9 861,00." },
    fecha: "2026-06-15",
    entrada: { zaklad: 50000, typ: "szco", prijmy: 150000 },
    esperado: { dan: 9861 },
  },
]);
