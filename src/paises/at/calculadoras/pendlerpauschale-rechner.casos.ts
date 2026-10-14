import { definirCasos } from "@/motor/calculo";
import pendlerpauschaleRechner from "./pendlerpauschale-rechner";

const STEUERBUCH = "https://www.bmf.gv.at/dam/jcr:436f8c01-38e0-41bf-b904-c0e62a862bf1/251117_Steuerbuch2026_DE_BF.pdf";
const BMF_PENDLER = "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/pendlerfoerderung-das-pendlerpauschale/allgemeines-zum-pendlerpauschale.html";

export default definirCasos(pendlerpauschaleRechner, [
  {
    nombre: "Beispiel des Steuerbuchs: 30 km, großes Pendlerpauschale, acht Fahrten",
    origen: { tipo: "oficial", url: STEUERBUCH, detalle: "Steuerbuch 2026, Seite 53: Pendlerpauschale 1.476 / 12 × 2/3 = 82 Euro im Monat; Pendlereuro (30 × 2) / 12 × 2/3 = 3,33 Euro (Wert 2025 mit 2 Euro je km)." },
    fecha: "2026-10-14",
    entrada: { art: "gross", km: 30, tage: "8", brutto: null },
    valores: { "at.pendlereuro": 2 },
    esperado: { pauschaleMonat: 82, euroMonat: 3.33, pauschaleJahr: 984, euroJahr: 40 },
  },
  {
    nombre: "30 km, großes Pendlerpauschale, 3.500 Euro brutto",
    origen: { tipo: "recalculado", url: BMF_PENDLER, detalle: "Pauschale 1.476 Euro, Pendlereuro 30 × 6 = 180 Euro. Lohnsteuer ohne 406,72, mit (2.744,55 BMG) 411,148 − 41,33 − 15 = 354,82; 51,90 im Monat, 622,80 im Jahr." },
    fecha: "2026-10-14",
    entrada: { art: "gross", km: 30, tage: "11", brutto: 3500 },
    esperado: { pauschaleJahr: 1476, euroJahr: 180, ersparnis: 622.8 },
  },
  {
    nombre: "Kleines Pendlerpauschale, 45 km",
    origen: { tipo: "recalculado", url: BMF_PENDLER, detalle: "Mehr als 40 bis 60 km: 1.356 Euro im Jahr, 113 Euro im Monat; Pendlereuro 45 × 6 = 270." },
    fecha: "2026-10-14",
    entrada: { art: "klein", km: 45, tage: "11", brutto: null },
    esperado: { pauschaleJahr: 1356, pauschaleMonat: 113, euroJahr: 270, ersparnis: null },
  },
  {
    nombre: "Kleines Pendlerpauschale unter 20 km",
    origen: { tipo: "recalculado", url: BMF_PENDLER, detalle: "Das kleine Pendlerpauschale beginnt bei 20 km." },
    fecha: "2026-10-14",
    entrada: { art: "klein", km: 15, tage: "11", brutto: null },
    esperaError: true,
  },
]);
