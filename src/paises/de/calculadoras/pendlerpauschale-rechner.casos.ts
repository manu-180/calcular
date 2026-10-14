import { definirCasos } from "@/motor/calculo";
import pendlerpauschaleRechner from "./pendlerpauschale-rechner";

const ESTG9 = "https://www.gesetze-im-internet.de/estg/__9.html";

export default definirCasos(pendlerpauschaleRechner, [
  {
    nombre: "30 km, 220 Tage, mit Auto, Grenzsteuersatz 30 %",
    origen: { tipo: "recalculado", url: ESTG9, detalle: "30 × 220 × 0,38 = 2508. Über 1230: 1278. × 30 % = 383,40." },
    fecha: "2026-10-14",
    entrada: { km: 30, tage: 220, auto: true, steuersatz: 30 },
    esperado: { pauschale: 2508, ueberPauschbetrag: 1278, ersparnis: 383.4 },
  },
  {
    nombre: "60 km mit Bahn: Höchstbetrag",
    origen: { tipo: "recalculado", url: ESTG9, detalle: "60 × 230 × 0,38 = 5244, ohne Auto höchstens 4500." },
    fecha: "2026-10-14",
    entrada: { km: 60, tage: 230, auto: false, steuersatz: null },
    esperado: { pauschale: 4500, ueberPauschbetrag: 3270 },
  },
  {
    nombre: "Kurzer Weg bleibt unter dem Pauschbetrag",
    origen: { tipo: "recalculado", url: ESTG9, detalle: "8 × 200 × 0,38 = 608, unter 1230: keine Wirkung." },
    fecha: "2026-10-14",
    entrada: { km: 8, tage: 200, auto: true, steuersatz: 25 },
    esperado: { pauschale: 608, ueberPauschbetrag: 0, ersparnis: 0 },
  },
]);
