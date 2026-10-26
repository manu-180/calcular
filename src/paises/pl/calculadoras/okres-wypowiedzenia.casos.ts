import { definirCasos } from "@/motor/calculo";
import okresWypowiedzenia from "./okres-wypowiedzenia";

const KP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001245";

export default definirCasos(okresWypowiedzenia, [
  {
    nombre: "Niecałe 5 miesięcy pracy: 2 tygodnie do soboty",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 36 § 1 pkt 1 i art. 30 § 2¹: wypowiedzenie w środę 21.10.2026, okres od niedzieli 25.10 do soboty 7.11.2026." },
    fecha: "2026-10-24",
    entrada: { zatrudnienie: "2026-06-01", wypowiedzenie: "2026-10-21" },
    esperado: { tygodnie: 2, miesiace: 0, koniec: "2026-11-07" },
  },
  {
    nombre: "Ponad 6 miesięcy: miesiąc do końca listopada",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 36 § 1 pkt 2: wypowiedzenie 21.10.2026, okres od 1.11 do 30.11.2026." },
    fecha: "2026-10-24",
    entrada: { zatrudnienie: "2026-03-01", wypowiedzenie: "2026-10-21" },
    esperado: { miesiace: 1, koniec: "2026-11-30" },
  },
  {
    nombre: "Ponad 3 lata: trzy miesiące",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 36 § 1 pkt 3: wypowiedzenie 21.10.2026, okres od 1.11.2026 do 31.01.2027." },
    fecha: "2026-10-24",
    entrada: { zatrudnienie: "2020-01-01", wypowiedzenie: "2026-10-21" },
    esperado: { miesiace: 3, koniec: "2027-01-31" },
  },
  {
    nombre: "Dokładnie 6 miesięcy",
    origen: { tipo: "recalculado", url: KP, detalle: "Zatrudnienie od 15.04.2026, 6 miesięcy mija 15.10.2026; wypowiedzenie tego dnia: 1 miesiąc do 30.11.2026." },
    fecha: "2026-10-24",
    entrada: { zatrudnienie: "2026-04-15", wypowiedzenie: "2026-10-15" },
    esperado: { miesiace: 1, koniec: "2026-11-30" },
  },
]);
