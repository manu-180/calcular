import { definirCasos } from "@/motor/calculo";
import urlaubsanspruchRechner from "./urlaubsanspruch-rechner";

const BURLG = "https://www.gesetze-im-internet.de/burlg/__3.html";

export default definirCasos(urlaubsanspruchRechner, [
  {
    nombre: "Fünftagewoche: 20 Tage",
    origen: { tipo: "recalculado", url: BURLG, detalle: "24 Werktage × 5 / 6 = 20 Arbeitstage." },
    fecha: "2026-10-14",
    entrada: { tageProWoche: 5, vertraglich: null, monate: 12 },
    esperado: { gesetzlich: 20, jahresurlaub: 20, anteilig: 20 },
  },
  {
    nombre: "Dreitagewoche: 12 Tage",
    origen: { tipo: "recalculado", url: BURLG, detalle: "24 × 3 / 6 = 12." },
    fecha: "2026-10-14",
    entrada: { tageProWoche: 3, vertraglich: null, monate: 12 },
    esperado: { gesetzlich: 12, anteilig: 12 },
  },
  {
    nombre: "30 Tage laut Vertrag, sieben volle Monate",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/burlg/__5.html", detalle: "30 × 7 / 12 = 17,5; ab einem halben Tag aufgerundet: 18 (§ 5 Absatz 2 BUrlG)." },
    fecha: "2026-10-14",
    entrada: { tageProWoche: 5, vertraglich: 30, monate: 7 },
    esperado: { jahresurlaub: 30, anteilig: 18 },
  },
  {
    nombre: "Gesetzlicher Urlaub, fünf Monate",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/burlg/__5.html", detalle: "20 × 5 / 12 = 8,33; unter einem halben Tag bleibt der Bruchteil stehen." },
    fecha: "2026-10-14",
    entrada: { tageProWoche: 5, vertraglich: null, monate: 5 },
    esperado: { anteilig: 8.33 },
  },
]);
