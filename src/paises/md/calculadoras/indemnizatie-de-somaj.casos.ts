import { definirCasos } from "@/motor/calculo";
import indemnizatieDeSomaj from "./indemnizatie-de-somaj";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatie-de-somaj";

export default definirCasos(indemnizatieDeSomaj, [
  {
    nombre: "12.000 de lei, stagiu sub 10 ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "CNAS: 40 % din venitul mediu lunar asigurat, 5 luni la un stagiu între 12 luni și 10 ani. 4.800 × 5 = 24.000." },
    fecha: "2026-10-26",
    entrada: { venit: 12000, stagiu: "sub10" },
    esperado: { lunar: 4800, luni: 5, total: 24000 },
  },
  {
    nombre: "Stagiu între 10 și 15 ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "10.000 × 40 % = 4.000; 7 luni = 28.000." },
    fecha: "2026-10-26",
    entrada: { venit: 10000, stagiu: "10-15" },
    esperado: { lunar: 4000, luni: 7, total: 28000 },
  },
  {
    nombre: "Stagiu de peste 15 ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "15.000 × 40 % = 6.000; 9 luni = 54.000." },
    fecha: "2026-10-26",
    entrada: { venit: 15000, stagiu: "peste15" },
    esperado: { luni: 9, total: 54000 },
  },
  {
    nombre: "Venit zero",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Fără venit asigurat nu există indemnizație calculată." },
    fecha: "2026-10-26",
    entrada: { venit: 0, stagiu: "sub10" },
    esperaError: true,
  },
]);
