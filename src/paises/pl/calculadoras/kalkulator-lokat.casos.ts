import { definirCasos } from "@/motor/calculo";
import kalkulatorLokat from "./kalkulator-lokat";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";
const OP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000622";

export default definirCasos(kalkulatorLokat, [
  {
    nombre: "10 000 zł na 3 miesiące po 5 %",
    origen: { tipo: "recalculado", url: PIT, detalle: "Odsetki 10 000 × 5 % × 3/12 = 125; podatek 19 % = 23,75 (art. 30a ust. 1 pkt 3); netto 101,25." },
    fecha: "2026-10-24",
    entrada: { kwota: 10000, oprocentowanie: 5, miesiace: 3 },
    esperado: { odsetki: 125, podatek: 23.75, netto: 101.25, naKoniec: 10101.25, oprocentowanieNetto: 4.05 },
  },
  {
    nombre: "Zaokrąglenie do grosza w górę",
    origen: { tipo: "recalculado", url: OP, detalle: "Art. 63 § 1a Ordynacji: 7777 × 3,33 % × 6/12 = 129,487 → 129,49; 19 % = 24,6031 → 24,61; netto 104,88." },
    fecha: "2026-10-24",
    entrada: { kwota: 7777, oprocentowanie: 3.33, miesiace: 6 },
    esperado: { odsetki: 129.49, podatek: 24.61, netto: 104.88 },
  },
]);
