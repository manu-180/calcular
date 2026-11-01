import { definirCasos } from "@/motor/calculo";
import calculatorConcediuMedical from "./calculator-concediu-medical";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatie-pentru-incapacitate-temporara-de-munca";

export default definirCasos(calculatorConcediuMedical, [
  {
    nombre: "15.000 de lei, stagiu de peste 8 ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "CNAS: 90 % din baza de calcul; angajatorul 75 % din salariul mediu. 15.000 × 90 % = 13.500; 15.000 × 75 % = 11.250." },
    fecha: "2026-10-26",
    entrada: { venit: 15000, stagiu: "peste8" },
    esperado: { lunarCnas: 13500, procent: 90, lunarAngajator: 11250, plafon: 87000 },
  },
  {
    nombre: "Stagiu sub 5 ani, venit peste plafon",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Plafon 5 × 17.400 = 87.000; 87.000 × 60 % = 52.200." },
    fecha: "2026-10-26",
    entrada: { venit: 100000, stagiu: "sub5" },
    esperado: { baza: 87000, lunarCnas: 52200 },
  },
  {
    nombre: "Stagiu între 5 și 8 ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "10.000 × 70 % = 7.000." },
    fecha: "2026-10-26",
    entrada: { venit: 10000, stagiu: "intre-5-8" },
    esperado: { lunarCnas: 7000 },
  },
  {
    nombre: "Boală oncologică",
    origen: { tipo: "recalculado", url: CNAS, detalle: "100 % din baza de calcul: 12.000." },
    fecha: "2026-10-26",
    entrada: { venit: 12000, stagiu: "special" },
    esperado: { lunarCnas: 12000, procent: 100 },
  },
  {
    nombre: "Venit zero",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Fără venit asigurat nu există bază de calcul." },
    fecha: "2026-10-26",
    entrada: { venit: 0, stagiu: "peste8" },
    esperaError: true,
  },
]);
