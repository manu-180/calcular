import { definirCasos } from "@/motor/calculo";
import skladkiZus from "./skladki-zus";

const ZUS = "https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne";

export default definirCasos(skladkiZus, [
  {
    nombre: "Pełny ZUS 2026 z chorobowym, skala, dochód 10 000 zł",
    origen: {
      tipo: "oficial",
      url: ZUS,
      detalle: "Tabela ZUS na 2026 r.: 1103,27 + 452,16 + 94,39 + 138,47 + FP i FS 138,47 = 1926,76 zł. Zdrowotna 9 % z (10 000 − 1788,29) = 739,05 zł.",
    },
    fecha: "2026-10-24",
    entrada: { wariant: "pelny", chorobowe: true, fpFs: true, forma: "skala", dochod: 10000, przychodRoczny: null },
    esperado: { emerytalne: 1103.27, rentowe: 452.16, wypadkowe: 94.39, chorobowe: 138.47, fpFs: 138.47, spoleczne: 1926.76, zdrowotna: 739.05, razem: 2665.81 },
  },
  {
    nombre: "Preferencyjny ZUS bez chorobowego, ryczałt do 60 000 zł",
    origen: { tipo: "oficial", url: ZUS, detalle: "Tabela ZUS: 281,44 + 115,34 + 24,08 = 420,86 zł. Zdrowotna na ryczałcie przy przychodzie do 60 000 zł: 498,35 zł." },
    fecha: "2026-10-24",
    entrada: { wariant: "preferencyjny", chorobowe: false, fpFs: true, forma: "ryczalt", dochod: null, przychodRoczny: 50000 },
    esperado: { spoleczne: 420.86, fpFs: 0, zdrowotna: 498.35, razem: 919.21 },
  },
  {
    nombre: "Pełny ZUS, liniowy, mała podstawa: minimalna zdrowotna",
    origen: { tipo: "oficial", url: ZUS, detalle: "4,9 % z (5000 − 1788,29) = 157,37 zł, mniej niż minimum 432,54 zł (9 % z 4806 zł od lutego 2026 r.)." },
    fecha: "2026-10-24",
    entrada: { wariant: "pelny", chorobowe: true, fpFs: true, forma: "liniowy", dochod: 5000, przychodRoczny: null },
    esperado: { zdrowotna: 432.54, razem: 2359.3 },
  },
  {
    nombre: "Ulga na start, ryczałt od 60 000 do 300 000 zł",
    origen: { tipo: "oficial", url: ZUS, detalle: "Bez składek społecznych; zdrowotna 830,58 zł (9 % z 9228,64 zł)." },
    fecha: "2026-10-24",
    entrada: { wariant: "ulga-na-start", chorobowe: false, fpFs: false, forma: "ryczalt", dochod: null, przychodRoczny: 120000 },
    esperado: { spoleczne: 0, zdrowotna: 830.58, razem: 830.58 },
  },
  {
    nombre: "Ryczałt ponad 300 000 zł",
    origen: { tipo: "oficial", url: ZUS, detalle: "Zdrowotna 1495,04 zł (9 % z 16 611,55 zł)." },
    fecha: "2026-10-24",
    entrada: { wariant: "pelny", chorobowe: false, fpFs: true, forma: "ryczalt", dochod: null, przychodRoczny: 400000 },
    esperado: { spoleczne: 1788.29, zdrowotna: 1495.04 },
  },
]);
