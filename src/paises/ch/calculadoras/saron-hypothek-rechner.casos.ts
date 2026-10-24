import { definirCasos } from "@/motor/calculo";
import saronHypothekRechner from "./saron-hypothek-rechner";

const SNB = "https://data.snb.ch/api/cube/snbgwdzid/data/csv/de";

export default definirCasos(saronHypothekRechner, [
  {
    nombre: "600 000 Franken, Marge 0,8 %, SARON unter null als 0",
    origen: { tipo: "recalculado", url: SNB, detalle: "SARON am 9.10.2026: −0,04 %, als 0 gerechnet. 0,8 % × 600 000 = 4800 pro Jahr, 400 pro Monat, 1200 pro Quartal. Leitzins 0 %." },
    fecha: "2026-10-09",
    entrada: { betrag: 600000, marge: 0.8, negativ: "null" },
    esperado: { saron: -0.04, saronDatum: "2026-10-09", satz: 0.8, jahr: 4800, monat: 400, quartal: 1200, leitzins: 0 },
  },
  {
    nombre: "SARON wie publiziert",
    origen: { tipo: "recalculado", url: SNB, detalle: "−0,04 + 0,8 = 0,76 %: 600 000 × 0,76 % = 4560 pro Jahr, 380 pro Monat." },
    fecha: "2026-10-09",
    entrada: { betrag: 600000, marge: 0.8, negativ: "voll" },
    esperado: { satz: 0.76, jahr: 4560, monat: 380 },
  },
]);
