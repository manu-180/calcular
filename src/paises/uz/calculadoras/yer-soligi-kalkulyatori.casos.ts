import { definirCasos } from "@/motor/calculo";
import yerSoligi from "./yer-soligi-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(yerSoligi, [
  {
    nombre: "Toshkent, 3-zona, 6 sotix",
    origen: { tipo: "recalculado", url: SK, detalle: "437-modda: 1 290 soʻm × 600 kv.m = 774 000." },
    fecha: "2026-10-24",
    entrada: { hudud: "toshkent-3", maydon: 600, koef: 1 },
    esperado: { soliq: 774000, stavka: 1290 },
  },
  {
    nombre: "Samarqand, koeffitsiyent 1,5",
    origen: { tipo: "recalculado", url: SK, detalle: "437-modda: 463 × 1,5 × 1 000 = 694 500." },
    fecha: "2026-10-24",
    entrada: { hudud: "samarqand", maydon: 1000, koef: 1.5 },
    esperado: { soliq: 694500, stavka: 463, kvmUchun: 694.5 },
  },
  {
    nombre: "Sirdaryo, 12 sotix",
    origen: { tipo: "recalculado", url: SK, detalle: "437-modda: 297 × 1 200 = 356 400." },
    fecha: "2026-10-24",
    entrada: { hudud: "sirdaryo", maydon: 1200, koef: 1 },
    esperado: { soliq: 356400 },
  },
]);
