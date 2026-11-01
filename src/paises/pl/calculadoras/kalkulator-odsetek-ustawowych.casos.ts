import { definirCasos } from "@/motor/calculo";
import kalkulatorOdsetek from "./kalkulator-odsetek-ustawowych";

const KC = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000795";

export default definirCasos(kalkulatorOdsetek, [
  {
    nombre: "10 000 zł od 1 lutego do 30 kwietnia 2026 r.",
    origen: {
      tipo: "recalculado",
      url: KC,
      detalle: "Stopa NBP 4,00 % do 4.03.2026 i 3,75 % od 5.03.2026, plus 5,5 pkt. 32 dni po 9,5 % = 83,29; 57 dni po 9,25 % = 144,45; razem 227,74.",
    },
    fecha: "2026-10-24",
    entrada: { kwota: 10000, termin: "2026-01-31", zaplata: "2026-04-30", rodzaj: "opoznienie" },
    esperado: { odsetki: 227.74, dni: 89, razem: 10227.74, stopaDzis: 9.25 },
  },
  {
    nombre: "To samo w transakcji handlowej",
    origen: {
      tipo: "recalculado",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20230001790",
      detalle: "Stopa NBP plus 10 pkt: 32 dni po 14 % = 122,74; 57 dni po 13,75 % = 214,73; razem 337,47.",
    },
    fecha: "2026-10-24",
    entrada: { kwota: 10000, termin: "2026-01-31", zaplata: "2026-04-30", rodzaj: "handlowe" },
    esperado: { odsetki: 337.47, stopaDzis: 13.75 },
  },
  {
    nombre: "Zapłata przed terminem",
    origen: { tipo: "recalculado", url: KC, detalle: "Bez opóźnienia nie ma odsetek." },
    fecha: "2026-10-24",
    entrada: { kwota: 1000, termin: "2026-05-01", zaplata: "2026-04-01", rodzaj: "opoznienie" },
    esperaError: true,
  },
]);
