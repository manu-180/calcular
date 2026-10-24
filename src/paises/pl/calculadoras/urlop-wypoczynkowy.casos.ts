import { definirCasos } from "@/motor/calculo";
import urlopWypoczynkowy from "./urlop-wypoczynkowy";

const KP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001245";

export default definirCasos(urlopWypoczynkowy, [
  {
    nombre: "Studia wyższe i 3 lata pracy: 26 dni",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 155 § 1 pkt 6: studia to 8 lat; 8 + 3 = 11 lat, więc 26 dni (art. 154 § 1 pkt 2)." },
    fecha: "2026-10-24",
    entrada: { staz: 3, szkola: "wyzsza", etat: 1, miesiace: 12 },
    esperado: { stazUrlopowy: 11, dni: 26, godziny: 208 },
  },
  {
    nombre: "Liceum i 5 lat pracy: 20 dni",
    origen: { tipo: "recalculado", url: KP, detalle: "4 + 5 = 9 lat, mniej niż 10: 20 dni." },
    fecha: "2026-10-24",
    entrada: { staz: 5, szkola: "srednia-ogolna", etat: 1, miesiace: 12 },
    esperado: { dni: 20, doDziesieciu: 1 },
  },
  {
    nombre: "Trzy czwarte etatu przy 26 dniach",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 154 § 2: 26 × 0,75 = 19,5, w górę do 20 dni." },
    fecha: "2026-10-24",
    entrada: { staz: 12, szkola: "brak", etat: 0.75, miesiace: 12 },
    esperado: { dni: 20 },
  },
  {
    nombre: "Siedem miesięcy pracy przy 20 dniach",
    origen: { tipo: "recalculado", url: KP, detalle: "Art. 155¹ i 155³: 20 × 7/12 = 11,67, w górę do 12 dni." },
    fecha: "2026-10-24",
    entrada: { staz: 2, szkola: "zasadnicza", etat: 1, miesiace: 7 },
    esperado: { dni: 12 },
  },
]);
