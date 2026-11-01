import { definirCasos } from "@/motor/calculo";
import aylanma from "./aylanma-soligi-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(aylanma, [
  {
    nombre: "Umumiy stavka, 50 000 000",
    origen: { tipo: "recalculado", url: SK, detalle: "467-modda 1-band: 4%; 2 000 000." },
    fecha: "2026-10-24",
    entrada: { aylanma: 50000000, faoliyat: "umumiy", yillik: null },
    esperado: { soliq: 2000000, stavka: 4, qoladi: 48000000, chegara: 1000000000 },
  },
  {
    nombre: "Yakka tartibdagi tadbirkor, 2026",
    origen: { tipo: "recalculado", url: SK, detalle: "467-modda 5-band (OʻRQ-1108, 2026-yil 1-yanvardan): 1%; 30 000 000 × 1% = 300 000." },
    fecha: "2026-10-24",
    entrada: { aylanma: 30000000, faoliyat: "ytt", yillik: 400000000 },
    esperado: { soliq: 300000, stavka: 1 },
  },
  {
    nombre: "Kichik shahardagi chakana savdo",
    origen: { tipo: "recalculado", url: SK, detalle: "467-modda 2.1-band: boshqa aholi punktlari 2%; 12 345 678 × 2% = 246 913,56 → 246 914." },
    fecha: "2026-10-24",
    entrada: { aylanma: 12345678, faoliyat: "chakana-boshqa", yillik: null },
    esperado: { soliq: 246914, stavka: 2 },
  },
  {
    nombre: "Togʻli tuman",
    origen: { tipo: "recalculado", url: SK, detalle: "467-modda 2.1-band: 1%." },
    fecha: "2026-10-24",
    entrada: { aylanma: 10000000, faoliyat: "chakana-togli", yillik: 1200000000 },
    esperado: { soliq: 100000, stavka: 1 },
  },
]);
