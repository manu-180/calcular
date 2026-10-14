import { definirCasos } from "@/motor/calculo";
import bvgRechner from "./bvg-rechner";

const BVG = "https://www.fedlex.admin.ch/eli/cc/1983/797_797_797/de#art_16";

export default definirCasos(bvgRechner, [
  {
    nombre: "80 000 Franken ab 45 Jahren, ohne Guthaben",
    origen: {
      tipo: "recalculado",
      url: BVG,
      detalle:
        "Koordiniert 80 000 − 26 460 = 53 540. Gutschriften: 10 Jahre 15 % = 8031, 10 Jahre 18 % = 9637,20, Summe 176 682. Jedes Jahr Zins 1,25 % auf dem Vorjahresguthaben, dann die Gutschrift: 198 199,55. Rente 6,8 % = 13 477,57 pro Jahr, 1123,13 pro Monat.",
    },
    fecha: "2026-10-14",
    entrada: { jahreslohn: 80000, alter: 45, guthaben: 0, zins: null },
    esperado: { koordinierterLohn: 53540, gutschriftHeute: 8031, summeGutschriften: 176682, kapital: 198199.55, renteJahr: 13477.57, renteMonat: 1123.13, zins: 1.25 },
  },
  {
    nombre: "60 000 Franken ab 30 Jahren mit 20 000 Guthaben",
    origen: { tipo: "recalculado", url: BVG, detalle: "Koordiniert 33 540; 7 %, 10 %, 15 %, 18 % je nach Alter; Zins 1,25 %. Ergebnis 218 026,86; Rente 14 825,83." },
    fecha: "2026-10-14",
    entrada: { jahreslohn: 60000, alter: 30, guthaben: 20000, zins: null },
    esperado: { kapital: 218026.86, renteJahr: 14825.83, summeGutschriften: 155961 },
  },
  {
    nombre: "Lohn unter der Eintrittsschwelle",
    origen: { tipo: "recalculado", url: BVG, detalle: "20 000 liegt nicht über 22 680: keine Gutschriften. 10 000 × 1,0125^25 = 13 641,93." },
    fecha: "2026-10-14",
    entrada: { jahreslohn: 20000, alter: 40, guthaben: 10000, zins: null },
    esperado: { koordinierterLohn: 0, summeGutschriften: 0, kapital: 13641.93 },
  },
  {
    nombre: "Alter 65 ist zu spät",
    origen: { tipo: "recalculado", detalle: "Mit 65 ist das Referenzalter erreicht." },
    fecha: "2026-10-14",
    entrada: { jahreslohn: 80000, alter: 65, guthaben: 0, zins: null },
    esperaError: true,
  },
]);
