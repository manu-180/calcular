import { definirCasos } from "@/motor/calculo";
import kommuneskat from "./kommuneskat";

const KOM = "https://svmn.dk/tal-og-metode/satser/oversigt-over-kommuneskatter";

export default definirCasos(kommuneskat, [
  {
    nombre: "København 2026",
    origen: { tipo: "oficial", url: KOM, detalle: "København 2026: kommuneskat 23,39, kirkeskat 0,80, bundskat 12,01, i alt 36,20, skatteloftsnedslag 0,00, grundskyld 5,10 promille." },
    fecha: "2026-10-24",
    entrada: { kommune: "koebenhavn", kirkeskat: true, indkomst: null },
    esperado: { kommune: 23.39, kirke: 0.8, samlet: 36.2, nedslag: 0, grundskyld: 5.1 },
  },
  {
    nombre: "Lolland 2026",
    origen: { tipo: "oficial", url: KOM, detalle: "Lolland 2026: kommuneskat 26,30, kirkeskat 1,23, i alt 39,54, skatteloftsnedslag 1,24, grundskyld 17,40 promille." },
    fecha: "2026-10-24",
    entrada: { kommune: "lolland", kirkeskat: true, indkomst: null },
    esperado: { samlet: 39.54, nedslag: 1.24, grundskyld: 17.4 },
  },
  {
    nombre: "København uden kirkeskat med 400.000 kr. i skattepligtig indkomst",
    origen: { tipo: "recalculado", url: KOM, detalle: "(400.000 − 54.100) × 23,39 % = 80.906,01. Uden kirkeskat er den samlede procent 35,40." },
    fecha: "2026-10-24",
    entrada: { kommune: "koebenhavn", kirkeskat: false, indkomst: 400000 },
    esperado: { samlet: 35.4, kommuneKr: 80906.01, kirkeKr: null },
  },
]);
