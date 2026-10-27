import { definirCasos } from "@/motor/calculo";
import { URL_CHARTOSIMA } from "../lib/fuentes-url";
import chartosima from "./chartosima";

export default definirCasos(chartosima, [
  {
    nombre: "Σύμβαση 200.000 €",
    origen: { tipo: "recalculado", url: URL_CHARTOSIMA, detalle: "Πρώτο Παράρτημα, άρθρο 3: 165 χιλιάδες × 1,50 = 247,50 και 30 χιλιάδες × 2 = 60. Σύνολο 307,50." },
    fecha: "2026-10-26",
    entrada: { axia: 200000 },
    esperado: { chartosima: 307.5 },
  },
  {
    nombre: "Μέρος των 1.000 €: 100.500 €",
    origen: { tipo: "recalculado", url: URL_CHARTOSIMA, detalle: "95.500 € πάνω από τα 5.000: 96 × 1,50 = 144." },
    fecha: "2026-10-26",
    entrada: { axia: 100500 },
    esperado: { chartosima: 144 },
  },
  {
    nombre: "Μέχρι 5.000 €: μηδέν",
    origen: { tipo: "oficial", url: URL_CHARTOSIMA, detalle: "Αξία σύμβασης €1 μέχρι €5.000: μηδέν." },
    fecha: "2026-10-26",
    entrada: { axia: 5000 },
    esperado: { chartosima: 0 },
  },
  {
    nombre: "Ανώτατο 20.000 €",
    origen: { tipo: "recalculado", url: URL_CHARTOSIMA, detalle: "Για 12 εκατ.: 247,50 + 11830 × 2 = 23907,50, περιορίζεται σε 20000." },
    fecha: "2026-10-26",
    entrada: { axia: 12000000 },
    esperado: { chartosima: 20000 },
  },
]);
