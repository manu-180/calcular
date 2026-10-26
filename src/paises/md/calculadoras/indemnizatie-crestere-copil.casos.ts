import { definirCasos } from "@/motor/calculo";
import indemnizatieCrestereCopil from "./indemnizatie-crestere-copil";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatii-adresate-familiilor-cu-copii";

export default definirCasos(indemnizatieCrestereCopil, [
  {
    nombre: "Opțiunea de 12 luni, venit de 15.000 de lei",
    origen: { tipo: "recalculado", url: CNAS, detalle: "CNAS: 90 % din bază, cel puțin triplul indemnizației minime (3 × 740). 15.000 × 90 % = 13.500." },
    fecha: "2026-10-26",
    entrada: { venit: 15000, optiune: "12-luni" },
    esperado: { primele12: 13500, urmatoarele: null, ingrijire: 1000 },
  },
  {
    nombre: "Opțiunea de 24 de luni, venit de 15.000 de lei",
    origen: { tipo: "recalculado", url: CNAS, detalle: "60 % în primele 12 luni = 9.000; 30 % în următoarele 12 = 4.500." },
    fecha: "2026-10-26",
    entrada: { venit: 15000, optiune: "24-luni" },
    esperado: { primele12: 9000, urmatoarele: 4500 },
  },
  {
    nombre: "Venit mic: se aplică minimul",
    origen: { tipo: "recalculado", url: CNAS, detalle: "24 de luni la 2.000: 60 % = 1.200 < 2 × 740 = 1.480; apoi 30 % = 600 < 740." },
    fecha: "2026-10-26",
    entrada: { venit: 2000, optiune: "24-luni" },
    esperado: { primele12: 1480, urmatoarele: 740, minim: 740 },
  },
  {
    nombre: "Până la 3 ani, venit peste plafon",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Plafon 87.000; 30 % = 26.100." },
    fecha: "2026-10-26",
    entrada: { venit: 100000, optiune: "trei-ani" },
    esperado: { primele12: 26100, urmatoarele: 26100, baza: 87000 },
  },
  {
    nombre: "Venit zero",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Fără venit asigurat nu există bază de calcul." },
    fecha: "2026-10-26",
    entrada: { venit: 0, optiune: "trei-ani" },
    esperaError: true,
  },
]);
