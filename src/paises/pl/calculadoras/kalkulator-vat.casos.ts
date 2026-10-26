import { definirCasos } from "@/motor/calculo";
import kalkulatorVat from "./kalkulator-vat";

const VAT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001263";

export default definirCasos(kalkulatorVat, [
  {
    nombre: "100 zł netto plus 23 %",
    origen: { tipo: "recalculado", url: VAT, detalle: "100 × 23 % = 23; brutto 123 (art. 146ef)." },
    fecha: "2026-10-24",
    entrada: { kwota: 100, kierunek: "netto-brutto", stawka: "podstawowa" },
    esperado: { stawka: 23, vat: 23, brutto: 123 },
  },
  {
    nombre: "123 zł brutto, odliczenie 23 %",
    origen: { tipo: "recalculado", url: VAT, detalle: "123 / 1,23 = 100; VAT 23." },
    fecha: "2026-10-24",
    entrada: { kwota: 123, kierunek: "brutto-netto", stawka: "podstawowa" },
    esperado: { netto: 100, vat: 23 },
  },
  {
    nombre: "54 zł brutto ze stawką 8 %",
    origen: { tipo: "recalculado", url: VAT, detalle: "54 / 1,08 = 50; VAT 4." },
    fecha: "2026-10-24",
    entrada: { kwota: 54, kierunek: "brutto-netto", stawka: "obnizona" },
    esperado: { stawka: 8, netto: 50, vat: 4 },
  },
  {
    nombre: "19,99 zł netto ze stawką 5 %",
    origen: { tipo: "recalculado", url: VAT, detalle: "19,99 × 5 % = 0,9995 → 1,00; brutto 20,99 (art. 41 ust. 2a)." },
    fecha: "2026-10-24",
    entrada: { kwota: 19.99, kierunek: "netto-brutto", stawka: "obnizona-5" },
    esperado: { vat: 1, brutto: 20.99 },
  },
]);
