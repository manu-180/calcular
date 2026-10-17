import { definirCasos } from "@/motor/calculo";
import gewerbesteuerRechner from "./gewerbesteuer-rechner";

const GEWSTG = "https://www.gesetze-im-internet.de/gewstg/__11.html";

export default definirCasos(gewerbesteuerRechner, [
  {
    nombre: "Einzelunternehmen, 80.000 Euro, Hebesatz 400 %",
    origen: { tipo: "recalculado", url: GEWSTG, detalle: "(80000 − 24500) × 3,5 % = 1942,50; × 400 % = 7770." },
    fecha: "2026-10-14",
    entrada: { ertrag: 80000, rechtsform: "personen", hebesatz: 400 },
    esperado: { freibetrag: 24500, messbetrag: 1942.5, steuer: 7770 },
  },
  {
    nombre: "GmbH, 80.050 Euro, Hebesatz 490 %",
    origen: { tipo: "recalculado", url: GEWSTG, detalle: "Abgerundet 80000, kein Freibetrag: 2800 × 490 % = 13720." },
    fecha: "2026-10-14",
    entrada: { ertrag: 80050, rechtsform: "kapital", hebesatz: 490 },
    esperado: { abgerundet: 80000, freibetrag: 0, messbetrag: 2800, steuer: 13720 },
  },
  {
    nombre: "Unter dem Freibetrag",
    origen: { tipo: "recalculado", url: GEWSTG, detalle: "20000 < 24500: keine Gewerbesteuer." },
    fecha: "2026-10-14",
    entrada: { ertrag: 20000, rechtsform: "personen", hebesatz: 400 },
    esperado: { messbetrag: 0, steuer: 0 },
  },
  {
    nombre: "Hebesatz unter dem Mindesthebesatz",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/gewstg/__16.html", detalle: "250 % liegt unter 280 % (§ 16 Absatz 4 GewStG)." },
    fecha: "2026-10-14",
    entrada: { ertrag: 50000, rechtsform: "personen", hebesatz: 250 },
    esperaError: true,
  },
]);
