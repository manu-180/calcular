import { definirCasos } from "@/motor/calculo";
import { URL_ODIGOS_ERGODOTI } from "../lib/fuentes-url";
import eisforesKoinonikonAsfaliseon from "./eisfores-koinonikon-asfaliseon";

export default definirCasos(eisforesKoinonikonAsfaliseon, [
  {
    nombre: "Παράδειγμα του Οδηγού Εργοδότη: 1.000 € με Κεντρικό Ταμείο Αδειών",
    origen: {
      tipo: "oficial",
      url: URL_ODIGOS_ERGODOTI,
      detalle: "Αποδοχές 1000 + άδειες 80 = 1080. ΚΑ 17,6% = 190,08, άδειες 80, πλεονασμός 12,96, ανάπτυξη 5,40, συνοχή 21,60, ΓεΣΥ 5,55% = 59,94. Σύνολο 369,98.",
    },
    fecha: "2026-10-26",
    entrada: { misthos: 1000, tameioAdeion: true },
    esperado: { adeies: 80, kaMisthotou: 95.04, kaErgodoti: 95.04, pleonasmos: 12.96, anaptyxi: 5.4, synochi: 21.6, gesyMisthotou: 28.62, gesyErgodoti: 31.32, synolo: 369.98 },
  },
  {
    nombre: "1.500 € χωρίς Ταμείο Αδειών",
    origen: {
      tipo: "recalculado",
      url: URL_ODIGOS_ERGODOTI,
      detalle: "Μισθωτός: 1500 × 8,8% = 132 και 1500 × 2,65% = 39,75, σύνολο 171,75. Εργοδότης: 132 + 43,50 + 18 + 7,50 + 30 = 231.",
    },
    fecha: "2026-10-26",
    entrada: { misthos: 1500, tameioAdeion: false },
    esperado: { misthotou: 171.75, ergodoti: 231, adeies: 0, synolo: 402.75 },
  },
  {
    nombre: "7.000 €: πάνω από το όριο των 5.742 €",
    origen: {
      tipo: "recalculado",
      url: URL_ODIGOS_ERGODOTI,
      detalle: "ΚΑ 5742 × 8,8% = 505,30. ΓεΣΥ 7000 × 2,65% = 185,50. Πλεονασμός 5742 × 1,2% = 68,90. Συνοχή χωρίς όριο: 7000 × 2% = 140.",
    },
    fecha: "2026-10-26",
    entrada: { misthos: 7000, tameioAdeion: false },
    esperado: { kaMisthotou: 505.3, gesyMisthotou: 185.5, pleonasmos: 68.9, synochi: 140 },
  },
]);
