import { definirCasos } from "@/motor/calculo";
import { URL_ODIGOS_ERGODOTI } from "../lib/fuentes-url";
import kostosErgodoti from "./kostos-ergodoti";

export default definirCasos(kostosErgodoti, [
  {
    nombre: "Οδηγός Εργοδότη: 1.000 € με Κεντρικό Ταμείο Αδειών",
    origen: {
      tipo: "oficial",
      url: URL_ODIGOS_ERGODOTI,
      detalle: "Από το παράδειγμα του Οδηγού (βάση 1080): εργοδότης ΚΑ 95,04, ΓεΣΥ 31,32, άδειες 80, πλεονασμός 12,96, ανάπτυξη 5,40, συνοχή 21,60. Σύνολο 246,32. Κόστος 1246,32.",
    },
    fecha: "2026-10-26",
    entrada: { misthos: 1000, misthoi: "12", tameioAdeion: true },
    esperado: { ergodotiMina: 246.32, kostosMina: 1246.32, kostosEtous: 14955.84 },
  },
  {
    nombre: "1.500 € χωρίς Ταμείο Αδειών, 12 μισθοί",
    origen: { tipo: "recalculado", url: URL_ODIGOS_ERGODOTI, detalle: "1500 × (8,8% + 2,9% + 1,2% + 0,5% + 2%) = 231. Κόστος 1731 τον μήνα, 20772 τον χρόνο, επιβάρυνση 15,40%." },
    fecha: "2026-10-26",
    entrada: { misthos: 1500, misthoi: "12", tameioAdeion: false },
    esperado: { ergodotiMina: 231, kostosMina: 1731, kostosEtous: 20772, epivarynsi: 15.4 },
  },
  {
    nombre: "3.000 € με 13ο μισθό: τον Δεκέμβριο οι εισφορές φτάνουν το όριο",
    origen: {
      tipo: "recalculado",
      url: URL_ODIGOS_ERGODOTI,
      detalle: "Μήνας 462. Δεκέμβριος με 6000: ΚΑ 5742 × 8,8% = 505,30, ΓεΣΥ 174, πλεονασμός 68,90, ανάπτυξη 28,71, συνοχή 120, σύνολο 896,91. Έτος 11 × 462 + 896,91 = 5978,91. Κόστος 39000 + 5978,91 = 44978,91.",
    },
    fecha: "2026-10-26",
    entrada: { misthos: 3000, misthoi: "13", tameioAdeion: false },
    esperado: { ergodotiEtous: 5978.91, kostosEtous: 44978.91 },
  },
]);
