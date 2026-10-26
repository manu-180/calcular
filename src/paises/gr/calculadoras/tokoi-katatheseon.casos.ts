import { definirCasos } from "@/motor/calculo";
import tokoiKatatheseon from "./tokoi-katatheseon";

const KFE = "https://diavgeia.gov.gr/doc/%CE%957%CE%94%CE%A0%CE%97-%CE%A632";

export default definirCasos(tokoiKatatheseon, [
  {
    nombre: "10.000 € με 2% για 12 μήνες",
    origen: { tipo: "recalculado", url: KFE, detalle: "Τόκοι 200. Φόρος 15% (άρθρο 40 παρ. 2 ΚΦΕ) = 30. Καθαροί 170." },
    fecha: "2026-10-24",
    entrada: { kefalaio: 10000, epitokio: 2, mines: 12 },
    esperado: { miktoi: 200, foros: 30, katharoi: 170, synolo: 10170, katharoEpitokio: 1.7 },
  },
  {
    nombre: "5.000 € με 1,5% για 6 μήνες",
    origen: { tipo: "recalculado", url: KFE, detalle: "5000 × 1,5% × 6/12 = 37,50. Φόρος 5,63. Καθαροί 31,87." },
    fecha: "2026-10-24",
    entrada: { kefalaio: 5000, epitokio: 1.5, mines: 6 },
    esperado: { miktoi: 37.5, foros: 5.63, katharoi: 31.87 },
  },
  {
    nombre: "Χωρίς κατάθεση",
    origen: { tipo: "recalculado", url: KFE, detalle: "Χωρίς ποσό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { kefalaio: 0, epitokio: 2, mines: 12 },
    esperaError: true,
  },
]);
