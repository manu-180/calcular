import { definirCasos } from "@/motor/calculo";
import elterngeldRechner from "./elterngeld-rechner";

const BEEG = "https://www.gesetze-im-internet.de/beeg/__2.html";

export default definirCasos(elterngeldRechner, [
  {
    nombre: "2000 Euro netto vorher: 65 %",
    origen: { tipo: "recalculado", url: BEEG, detalle: "Über 1200: 67 − 400 × 0,1 = 27, mindestens 65 %. 2000 × 65 % = 1300. ElterngeldPlus 650." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 2000, nettoNachher: 0, ueberGrenze: false },
    esperado: { rate: 65, basis: 1300, plus: 650, basisGesamt12: 15600 },
  },
  {
    nombre: "900 Euro netto vorher: 72 %",
    origen: { tipo: "recalculado", url: BEEG, detalle: "Unter 1000: 67 + 50 × 0,1 = 72 %. 900 × 72 % = 648; Plus 324." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 900, nettoNachher: 0, ueberGrenze: false },
    esperado: { rate: 72, basis: 648, plus: 324 },
  },
  {
    nombre: "Hohes Einkommen: Höchstbetrag",
    origen: { tipo: "recalculado", url: BEEG, detalle: "3500 × 65 % = 2275, begrenzt auf 1800; Plus 900." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 3500, nettoNachher: 0, ueberGrenze: false },
    esperado: { basis: 1800, plus: 900 },
  },
  {
    nombre: "Teilzeit im Bezug",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/beeg/__4a.html", detalle: "2500 vorher, 1000 nachher: 65 % × 1500 = 975. Plus höchstens die Hälfte von 2500 × 65 % = 1625, also 812,50." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 2500, nettoNachher: 1000, ueberGrenze: false },
    esperado: { basis: 975, plus: 812.5 },
  },
  {
    nombre: "Kein Einkommen vorher: Mindestbetrag",
    origen: { tipo: "recalculado", url: BEEG, detalle: "§ 2 Absatz 4 BEEG: mindestens 300 Euro, ElterngeldPlus 150." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 0, nettoNachher: 0, ueberGrenze: false },
    esperado: { rate: 100, basis: 300, plus: 150 },
  },
  {
    nombre: "Über der Einkommensgrenze",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/beeg/__1.html", detalle: "§ 1 Absatz 8 BEEG: kein Anspruch über 175000 Euro." },
    fecha: "2026-10-14",
    entrada: { nettoVorher: 6000, nettoNachher: 0, ueberGrenze: true },
    esperaError: true,
  },
]);
