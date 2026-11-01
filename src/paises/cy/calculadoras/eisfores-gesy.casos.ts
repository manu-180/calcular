import { definirCasos } from "@/motor/calculo";
import { URL_NOMOS_GESY } from "../lib/fuentes-url";
import eisforesGesy from "./eisfores-gesy";

export default definirCasos(eisforesGesy, [
  {
    nombre: "Μισθωτός με 30.000 € και 5.000 € ενοίκια",
    origen: { tipo: "recalculado", url: URL_NOMOS_GESY, detalle: "Άρθρο 19: 30000 × 2,65% = 795 και 5000 × 2,65% = 132,50. Σύνολο 927,50. Εργοδότης 30000 × 2,90% = 870." },
    fecha: "2026-10-26",
    entrada: { misthoi: 30000, autotelos: 0, syntaxi: 0, eisodimata: 5000 },
    esperado: { eisfora: 927.5, apoMisthous: 795, apoEisodimata: 132.5, ergodotis: 870 },
  },
  {
    nombre: "Αυτοτελώς εργαζόμενος με 40.000 €",
    origen: { tipo: "recalculado", url: URL_NOMOS_GESY, detalle: "40000 × 4% = 1600." },
    fecha: "2026-10-26",
    entrada: { misthoi: 0, autotelos: 40000, syntaxi: 0, eisodimata: 0 },
    esperado: { eisfora: 1600, ergodotis: 0 },
  },
  {
    nombre: "Πάνω από το όριο: 170.000 € μισθοί και 30.000 € τόκοι",
    origen: { tipo: "recalculado", url: URL_NOMOS_GESY, detalle: "Πρώτα οι μισθοί: 170000 × 2,65% = 4505. Μένουν 10000 για τους τόκους: 265. Σύνολο 4770." },
    fecha: "2026-10-26",
    entrada: { misthoi: 170000, autotelos: 0, syntaxi: 0, eisodimata: 30000 },
    esperado: { eisfora: 4770, apoEisodimata: 265 },
  },
]);
