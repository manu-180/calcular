import { definirCasos } from "@/motor/calculo";
import kalkulatorChorobowego from "./kalkulator-chorobowego";

const ZASIL = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000854";

export default definirCasos(kalkulatorChorobowego, [
  {
    nombre: "10 dni L4 przy 6000 zł brutto",
    origen: { tipo: "recalculado", url: ZASIL, detalle: "Podstawa 6000 − 822,60 = 5177,40; dziennie 5177,40 / 30 × 80 % = 138,06; za 10 dni 1380,60 (art. 11 ust. 1 i ust. 5)." },
    fecha: "2026-10-24",
    entrada: { brutto: 6000, dni: 10, rodzaj: "podstawowy" },
    esperado: { podstawa: 5177.4, dzienny: 138.06, razem: 1380.6, procent: 80 },
  },
  {
    nombre: "Zwolnienie w ciąży: 100 %",
    origen: { tipo: "recalculado", url: ZASIL, detalle: "Art. 11 ust. 2 pkt 1: 5177,40 / 30 = 172,58 dziennie; 30 dni = 5177,40." },
    fecha: "2026-10-24",
    entrada: { brutto: 6000, dni: 30, rodzaj: "ciaza" },
    esperado: { dzienny: 172.58, razem: 5177.4, strata: 0 },
  },
]);
