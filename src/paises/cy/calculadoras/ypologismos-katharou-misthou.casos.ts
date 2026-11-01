import { definirCasos } from "@/motor/calculo";
import { URL_NOMOS_FOROU } from "../lib/fuentes-url";
import ypologismosKatharouMisthou from "./ypologismos-katharou-misthou";

export default definirCasos(ypologismosKatharouMisthou, [
  {
    nombre: "2.000 € μεικτά, 12 μισθοί: μέσα στο αφορολόγητο",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "ΚΑ 2000 × 8,8% = 176. ΓεΣΥ 24000 × 2,65% = 636, τον μήνα 53. Έκπτωση εισφορών 2112 + 636 = 2748. Φορολογητέο 21252, κάτω από 22000: φόρος 0. Καθαρά 2000 − 176 − 53 = 1771.",
    },
    fecha: "2026-10-26",
    entrada: { miktos: 2000, misthoi: "12", tekna: 0, monogoneas: false },
    esperado: { kaMina: 176, gesyMina: 53, forologiteo: 21252, forosEtous: 0, katharaMina: 1771 },
  },
  {
    nombre: "3.000 € μεικτά, 12 μισθοί",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "Έτος 36000. ΚΑ 3168, ΓεΣΥ 954, έκπτωση 4122. Φορολογητέο 31878. Φόρος 9878 × 20% = 1975,60, τον μήνα 164,63. Καθαρά 3000 − 264 − 79,50 − 164,63 = 2491,87.",
    },
    fecha: "2026-10-26",
    entrada: { miktos: 3000, misthoi: "12", tekna: 0, monogoneas: false },
    esperado: { forologiteo: 31878, forosEtous: 1975.6, forosMina: 164.63, katharaMina: 2491.87, katharaEtous: 29902.4 },
  },
  {
    nombre: "3.000 € με 13ο μισθό: ο 13ος ασφαλίζεται μέχρι το όριο του μήνα",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "Έτος 39000. ΚΑ 13ου: (5742 − 3000) × 8,8% = 241,30, σύνολο 3409,30. ΓεΣΥ 1033,50. Φορολογητέο 39000 − 4442,80 = 34557,20. Φόρος 2000 + 2557,20 × 25% = 2639,30, / 13 = 203,02. Καθαρά 2453,48.",
    },
    fecha: "2026-10-26",
    entrada: { miktos: 3000, misthoi: "13", tekna: 0, monogoneas: false },
    esperado: { ekptosiEisforon: 4442.8, forosEtous: 2639.3, forosMina: 203.02, katharaMina: 2453.48 },
  },
  {
    nombre: "3.000 € με δύο τέκνα: έκπτωση 2.250 €",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Έκπτωση τέκνων 1000 + 1250. Φορολογητέο 31878 − 2250 = 29628. Φόρος 7628 × 20% = 1525,60, / 12 = 127,13. Καθαρά 2529,37." },
    fecha: "2026-10-26",
    entrada: { miktos: 3000, misthoi: "12", tekna: 2, monogoneas: false },
    esperado: { ekptosiTeknon: 2250, forosEtous: 1525.6, katharaMina: 2529.37 },
  },
  {
    nombre: "8.000 € μεικτά: πάνω από το ανώτατο όριο ασφαλιστέων αποδοχών",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "ΚΑ 5742 × 8,8% = 505,30. ΓεΣΥ 96000 × 2,65% = 2544. Φορολογητέο 96000 − 8607,60 = 87392,40. Φόρος 2000 + 2500 + 9000 + 15392,40 × 35% = 18887,34, / 12 = 1573,95. Καθαρά 5708,75.",
    },
    fecha: "2026-10-26",
    entrada: { miktos: 8000, misthoi: "12", tekna: 0, monogoneas: false },
    esperado: { kaMina: 505.3, gesyMina: 212, forosEtous: 18887.34, katharaMina: 5708.75 },
  },
  {
    nombre: "Μισθός μηδέν",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Χωρίς μισθό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-26",
    entrada: { miktos: 0, misthoi: "12", tekna: 0, monogoneas: false },
    esperaError: true,
  },
]);
