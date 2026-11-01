import { definirCasos } from "@/motor/calculo";
import placaMinimalna from "./placa-minimalna";

export default definirCasos(placaMinimalna, [
  {
    nombre: "Pełny etat w 2026 r.",
    origen: {
      tipo: "oficial",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001242",
      detalle: "§ 1 i § 2 rozporządzenia: 4806 zł i 31,40 zł za godzinę od 1 stycznia 2026 r. Netto 3605,85 zł jak w kalkulatorze wynagrodzeń.",
    },
    fecha: "2026-10-24",
    entrada: { etat: 1, godziny: null },
    esperado: { brutto: 4806, stawka: 31.4, netto: 3605.85, roczne: 57672 },
  },
  {
    nombre: "Pół etatu i 100 godzin na zleceniu",
    origen: { tipo: "recalculado", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001242", detalle: "4806 × 0,5 = 2403; 100 × 31,40 = 3140." },
    fecha: "2026-10-24",
    entrada: { etat: 0.5, godziny: 100 },
    esperado: { brutto: 2403, zlecenie: 3140 },
  },
  {
    nombre: "Ostatni dzień 2026 r.",
    origen: { tipo: "oficial", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250001242", detalle: "Stawki z 2026 r. obowiązują do 31 grudnia 2026 r." },
    fecha: "2026-12-31",
    entrada: { etat: 0.75, godziny: 10 },
    esperado: { brutto: 3604.5, zlecenie: 314 },
  },
]);
