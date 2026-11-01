import { definirCasos } from "@/motor/calculo";
import podatekBelki from "./podatek-belki";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(podatekBelki, [
  {
    nombre: "Sprzedaż akcji z zyskiem 5000 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Art. 30b ust. 1: (15 000 − 10 000) × 19 % = 950 zł." },
    fecha: "2026-10-24",
    entrada: { rodzaj: "sprzedaz", przychod: 15000, koszty: 10000 },
    esperado: { dochod: 5000, podatek: 950, netto: 4050 },
  },
  {
    nombre: "Zaokrąglenie podstawy do złotych",
    origen: { tipo: "recalculado", url: PIT, detalle: "Dochód 5000,40 → 5000 zł (art. 63 § 1 Ordynacji); podatek 950 zł." },
    fecha: "2026-10-24",
    entrada: { rodzaj: "sprzedaz", przychod: 15000.4, koszty: 10000 },
    esperado: { podatek: 950 },
  },
  {
    nombre: "Strata",
    origen: { tipo: "recalculado", url: PIT, detalle: "8000 − 10 000 = −2000: brak podatku, strata 2000 zł (art. 9 ust. 3)." },
    fecha: "2026-10-24",
    entrada: { rodzaj: "sprzedaz", przychod: 8000, koszty: 10000 },
    esperado: { podatek: 0, strata: 2000 },
  },
  {
    nombre: "Odsetki 1234,56 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Art. 30a ust. 1 pkt 3: 19 % z 1234,56 = 234,5664 → 234,57 w górę (art. 63 § 1a Ordynacji); netto 999,99." },
    fecha: "2026-10-24",
    entrada: { rodzaj: "odsetki", przychod: 1234.56, koszty: null },
    esperado: { podatek: 234.57, netto: 999.99 },
  },
]);
