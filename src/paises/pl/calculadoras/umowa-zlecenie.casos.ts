import { definirCasos } from "@/motor/calculo";
import umowaZlecenie from "./umowa-zlecenie";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(umowaZlecenie, [
  {
    nombre: "3000 zł brutto bez chorobowego i bez PIT-2",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "ZUS 292,80 + 45,00 = 337,80; zdrowotna 9 % z 2662,20 = 239,60; koszty 20 % z 2662,20 = 532,44; podstawa 2130; zaliczka 255,60 → 256; netto 2166,60.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 3000, student: false, chorobowe: false, mlody: false, pit2: false },
    esperado: { emerytalne: 292.8, rentowe: 45, zdrowotna: 239.6, koszty: 532.44, zaliczka: 256, netto: 2166.6 },
  },
  {
    nombre: "3000 zł brutto z chorobowym i PIT-2",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "ZUS 411,30; zdrowotna 9 % z 2588,70 = 232,98; koszty 517,74; podstawa 2071; 12 % = 248,52 minus 300 daje 0; netto 2355,72.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 3000, student: false, chorobowe: true, mlody: false, pit2: true },
    esperado: { chorobowe: 73.5, zdrowotna: 232.98, zaliczka: 0, netto: 2355.72 },
  },
  {
    nombre: "Student przed 26. urodzinami",
    origen: { tipo: "recalculado", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000199", detalle: "Art. 6 ust. 4 ustawy o systemie ubezpieczeń społecznych: brak składek; ulga dla młodych: brak PIT. Netto = brutto." },
    fecha: "2026-10-24",
    entrada: { brutto: 3000, student: true, chorobowe: null, mlody: null, pit2: null },
    esperado: { netto: 3000, zaliczka: 0 },
  },
  {
    nombre: "Mała umowa: 200 zł brutto",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "ZUS 19,52 + 3,00 = 22,52; zdrowotna 9 % z 177,48 = 15,97; podatek zryczałtowany 12 % z 200 = 24; netto 137,51.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 200, student: false, chorobowe: false, mlody: false, pit2: false },
    esperado: { zdrowotna: 15.97, zaliczka: 24, netto: 137.51 },
  },
]);
