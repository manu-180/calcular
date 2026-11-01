import { definirCasos } from "@/motor/calculo";
import pausalniDan from "./pausalni-dan";

const FS = "https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/pausalni-dan/informace-k-institutu-pausalni-dane-pro-rok-2025";

export default definirCasos(pausalniDan, [
  {
    nombre: "Živnostník s příjmy 1 000 000 Kč v prvním pásmu",
    origen: {
      tipo: "oficial",
      url: FS,
      detalle: "Finanční správa: první pásmo 9 162 Kč (100 daň, 5 756 sociální, 3 306 zdravotní). Za rok 109 944. Běžný režim s výdaji 60 %: 29 160 + 64 240 + 39 664 = 133 064; úspora 23 120.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 1000000, slozeni: "60" },
    esperado: { mesicne: 9162, pasmo: "První pásmo", rocne: 109944, dan: 100, socialni: 5756, zdravotni: 3306, bezny: 133064, uspora: 23120 },
  },
  {
    nombre: "Svobodné povolání 1 200 000 Kč: druhé pásmo",
    origen: {
      tipo: "recalculado",
      url: FS,
      detalle: "Ostatní příjmy nad 1 000 000 do 1 500 000 Kč: druhé pásmo 16 745 Kč, za rok 200 940. Běžný režim s výdaji 40 %: základ 720 000, daň 77 160, sociální 115 632, zdravotní 48 600 = 241 392; úspora 40 452.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 1200000, slozeni: "jine" },
    esperado: { mesicne: 16745, pasmo: "Druhé pásmo", rocne: 200940, bezny: 241392, uspora: 40452 },
  },
  {
    nombre: "Ostatní příjmy 1 800 000 Kč: třetí pásmo",
    origen: {
      tipo: "recalculado",
      url: FS,
      detalle: "Třetí pásmo 27 139 Kč, za rok 325 668. Běžný režim 40 %: základ 1 080 000, daň 131 160, sociální 173 448, zdravotní 72 900 = 377 508; úspora 51 840.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 1800000, slozeni: "jine" },
    esperado: { mesicne: 27139, pasmo: "Třetí pásmo", uspora: 51840 },
  },
  {
    nombre: "Řemeslník 1 900 000 Kč stále v prvním pásmu",
    origen: { tipo: "recalculado", url: FS, detalle: "Aspoň 75 % příjmů s výdaji 80 %: první pásmo až do 2 000 000 Kč." },
    fecha: "2026-10-24",
    entrada: { prijmy: 1900000, slozeni: "80" },
    esperado: { mesicne: 9162, pasmo: "První pásmo" },
  },
  {
    nombre: "Příjmy nad 2 000 000 Kč",
    origen: { tipo: "recalculado", url: FS, detalle: "Horní limit paušálního režimu je 2 000 000 Kč." },
    fecha: "2026-10-24",
    entrada: { prijmy: 2500000, slozeni: "60" },
    esperaError: true,
  },
]);
