import { definirCasos } from "@/motor/calculo";
import molMulk from "./mol-mulk-soligi-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(molMulk, [
  {
    nombre: "Kvartira, 400 mln soʻm",
    origen: { tipo: "recalculado", url: SK, detalle: "422-modda 1-band: 0,36%; 400 000 000 × 0,36% = 1 440 000; har qism 720 000 (423-modda)." },
    fecha: "2026-10-24",
    entrada: { qiymat: 400000000, turi: "asosiy", maydon: 80, koef: 1, imtiyoz: false, oylar: 12 },
    esperado: { soliq: 1440000, yarmi: 720000, stavka: 0.36 },
  },
  {
    nombre: "Pensioner, 80 kv.m",
    origen: { tipo: "recalculado", url: SK, detalle: "421-modda: 60 kv.m ozod; soliqqa 20/80 qismi: 100 000 000 × 0,36% = 360 000." },
    fecha: "2026-10-24",
    entrada: { qiymat: 400000000, turi: "asosiy", maydon: 80, koef: 1, imtiyoz: true, oylar: 12 },
    esperado: { soliq: 360000, baza: 100000000 },
  },
  {
    nombre: "Eng kam baza va koeffitsiyent",
    origen: { tipo: "recalculado", url: SK, detalle: "420-modda: kamida 42 000 000; × 0,36% × 1,2 = 181 440." },
    fecha: "2026-10-24",
    entrada: { qiymat: 30000000, turi: "asosiy", maydon: 50, koef: 1.2, imtiyoz: false, oylar: 12 },
    esperado: { baza: 42000000, soliq: 181440 },
  },
  {
    nombre: "Ijaraga berilgan noturar joy, 6 oy",
    origen: { tipo: "recalculado", url: SK, detalle: "422-modda 4-band: 1,5%; 800 000 000 × 1,5% × 6/12 = 6 000 000." },
    fecha: "2026-10-24",
    entrada: { qiymat: 800000000, turi: "tadbirkorlik", maydon: 120, koef: 1, imtiyoz: false, oylar: 6 },
    esperado: { soliq: 6000000, stavka: 1.5 },
  },
]);
