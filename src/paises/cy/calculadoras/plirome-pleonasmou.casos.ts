import { definirCasos } from "@/motor/calculo";
import { URL_TERMATISMOU_NOMOS } from "../lib/fuentes-url";
import pliromePleonasmou from "./plirome-pleonasmou";

export default definirCasos(pliromePleonasmou, [
  {
    nombre: "10 έτη με 500 € την εβδομάδα",
    origen: { tipo: "recalculado", url: URL_TERMATISMOU_NOMOS, detalle: "Τέταρτος Πίνακας: 4 έτη × 2 = 8 εβδομάδες, 6 έτη × 2,5 = 15. Σύνολο 23 × 500 = 11500." },
    fecha: "2026-10-26",
    entrada: { apo: "2016-01-04", eos: "2026-01-03", misthos: 500, periodos: "evdomada", pano64: false, mines64: null },
    esperado: { eti: 10, evdomadesPliromis: 23, pliromi: 11500 },
  },
  {
    nombre: "Μισθός πάνω από το όριο: 4 × 220,76 = 883,04 € την εβδομάδα",
    origen: { tipo: "recalculado", url: URL_TERMATISMOU_NOMOS, detalle: "4000 × 12 / 52 = 923,08, πάνω από 883,04. 10 έτη: 23 × 883,04 = 20309,92." },
    fecha: "2026-10-26",
    entrada: { apo: "2016-01-04", eos: "2026-01-03", misthos: 4000, periodos: "mina", pano64: false, mines64: null },
    esperado: { anotato: 883.04, evdomadiaios: 883.04, pliromi: 20309.92 },
  },
  {
    nombre: "Υπόλοιπο 26 εβδομάδων μετρά ως έτος",
    origen: { tipo: "recalculado", url: URL_TERMATISMOU_NOMOS, detalle: "130 εβδομάδες = 2 έτη και 26 εβδομάδες: 3 έτη × 2 = 6 εβδομάδες × 400 = 2400." },
    fecha: "2026-10-26",
    entrada: { apo: "2023-07-03", eos: "2025-12-28", misthos: 400, periodos: "evdomada", pano64: false, mines64: null },
    esperado: { eti: 3, evdomadesPliromis: 6, pliromi: 2400 },
  },
  {
    nombre: "Κάτω από 104 εβδομάδες: χωρίς πληρωμή",
    origen: { tipo: "oficial", url: URL_TERMATISMOU_NOMOS, detalle: "Χρειάζονται 104 εβδομάδες συνεχούς απασχόλησης." },
    fecha: "2026-10-26",
    entrada: { apo: "2024-06-03", eos: "2026-01-04", misthos: 2000, periodos: "mina", pano64: false, mines64: null },
    esperado: { pliromi: 0 },
  },
  {
    nombre: "Έξι μήνες μετά τα 64: μείωση κατά 6/12",
    origen: { tipo: "recalculado", url: URL_TERMATISMOU_NOMOS, detalle: "11500 × (1 − 6/12) = 5750." },
    fecha: "2026-10-26",
    entrada: { apo: "2016-01-04", eos: "2026-01-03", misthos: 500, periodos: "evdomada", pano64: true, mines64: 6 },
    esperado: { pliromi: 5750 },
  },
]);
