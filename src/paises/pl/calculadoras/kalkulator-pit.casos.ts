import { definirCasos } from "@/motor/calculo";
import kalkulatorPit from "./kalkulator-pit";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(kalkulatorPit, [
  {
    nombre: "100 000 zł przychodu na etacie",
    origen: { tipo: "recalculado", url: PIT, detalle: "Podstawa 100 000 − 3000 − 13 710 = 83 290; 12 % = 9994,80 − 3600 = 6394,80 → 6395 (art. 27 ust. 1)." },
    fecha: "2026-10-24",
    entrada: { przychod: 100000, koszty: 3000, skladki: 13710, zaliczki: 6000, wspolnie: false, dochodMalzonka: null },
    esperado: { podstawa: 83290, podatek: 6395, doZaplaty: 395, zwrot: 0 },
  },
  {
    nombre: "Nadwyżka ponad 120 000 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Podstawa 150 000: 10 800 + 32 % × 30 000 = 20 400; ze wzoru marginalnego 14 400 + 9600 − 3600 = 20 400." },
    fecha: "2026-10-24",
    entrada: { przychod: 150000, koszty: 0, skladki: 0, zaliczki: null, wspolnie: false, dochodMalzonka: null },
    esperado: { podatek: 20400 },
  },
  {
    nombre: "Wspólne rozliczenie: 150 000 zł i 30 000 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Połowa sumy 90 000: 10 800 − 3600 = 7200, razy 2 = 14 400. Osobno 20 400 + 0 = 20 400. Zysk 6000." },
    fecha: "2026-10-24",
    entrada: { przychod: 150000, koszty: 0, skladki: 0, zaliczki: null, wspolnie: true, dochodMalzonka: 30000 },
    esperado: { podatek: 14400, oszczednosc: 6000 },
  },
  {
    nombre: "Dochód poniżej kwoty wolnej",
    origen: { tipo: "recalculado", url: PIT, detalle: "Podstawa 30 000: 3600 − 3600 = 0." },
    fecha: "2026-10-24",
    entrada: { przychod: 30000, koszty: 0, skladki: 0, zaliczki: 500, wspolnie: false, dochodMalzonka: null },
    esperado: { podatek: 0, zwrot: 500 },
  },
]);
