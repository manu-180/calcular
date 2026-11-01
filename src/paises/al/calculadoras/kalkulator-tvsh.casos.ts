import { definirCasos } from "@/motor/calculo";
import kalkulatorTvsh from "./kalkulator-tvsh";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligji-Nr.-92-2014-Per-tatimin-mbi-vleren-e-shtuar-ne-Republiken-e-Shqiperise-i-ndryshuar.pdf";

export default definirCasos(kalkulatorTvsh, [
  {
    nombre: "Shto 20%",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 48: 10 000 × 20% = 2 000; me TVSH 12 000." },
    fecha: "2026-10-30",
    entrada: { drejtimi: "shto", shuma: 10000, shkalla: "standarde" },
    esperado: { tvsh: 2000, meTvsh: 12000 },
  },
  {
    nombre: "Hiq 20%",
    origen: { tipo: "recalculado", url: L, detalle: "12 000 / 1,2 = 10 000; TVSH 2 000." },
    fecha: "2026-10-30",
    entrada: { drejtimi: "hiq", shuma: 12000, shkalla: "standarde" },
    esperado: { tvsh: 2000, paTvsh: 10000 },
  },
  {
    nombre: "Shto 6% (libra, akomodim)",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 49: 5 000 × 6% = 300." },
    fecha: "2026-10-30",
    entrada: { drejtimi: "shto", shuma: 5000, shkalla: "reduktuar-6" },
    esperado: { tvsh: 300, meTvsh: 5300 },
  },
  {
    nombre: "Hiq 10% (inpute bujqësore)",
    origen: { tipo: "recalculado", url: L, detalle: "Neni 49 pika 10: 1 100 / 1,1 = 1 000." },
    fecha: "2026-10-30",
    entrada: { drejtimi: "hiq", shuma: 1100, shkalla: "reduktuar-10" },
    esperado: { tvsh: 100, paTvsh: 1000 },
  },
  {
    nombre: "Shumë zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa shumë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { drejtimi: "shto", shuma: 0, shkalla: "standarde" },
    esperaError: true,
  },
]);
