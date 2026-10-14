import { definirCasos } from "@/motor/calculo";
import kirchensteuerRechner from "./kirchensteuer-rechner";

const BMF = "https://www.bmf-steuerrechner.de/bl/bl2026/eingabeformbl2026.xhtml";

export default definirCasos(kirchensteuerRechner, [
  {
    nombre: "Hessen: 9 %",
    origen: { tipo: "recalculado", url: BMF, detalle: "10548 × 9 % = 949,32; im Monat 79,11." },
    fecha: "2026-10-14",
    entrada: { steuer: 10548, bundesland: "he" },
    esperado: { satz: 9, jahr: 949.32, monat: 79.11 },
  },
  {
    nombre: "Bayern: 8 %",
    origen: { tipo: "recalculado", url: BMF, detalle: "10548 × 8 % = 843,84." },
    fecha: "2026-10-14",
    entrada: { steuer: 10548, bundesland: "by" },
    esperado: { satz: 8, jahr: 843.84 },
  },
  {
    nombre: "Baden-Württemberg: 8 %",
    origen: { tipo: "recalculado", url: BMF, detalle: "6294 × 8 % = 503,52." },
    fecha: "2026-10-14",
    entrada: { steuer: 6294, bundesland: "bw" },
    esperado: { satz: 8, jahr: 503.52 },
  },
]);
