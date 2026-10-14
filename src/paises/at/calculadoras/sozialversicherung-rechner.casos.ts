import { definirCasos } from "@/motor/calculo";
import sozialversicherungRechner from "./sozialversicherung-rechner";

const BMF_RECHNER = "https://onlinerechner.haude.at/BMF-Brutto-Netto-Rechner/";
const SV_WERTE = "https://www.sozialversicherung.at/cdscontent/load?contentid=10008.806858";

export default definirCasos(sozialversicherungRechner, [
  {
    nombre: "3.500 Euro in Wien",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Wien: SV im Monat 641,20, je Sonderzahlung 597,45, im Jahr 8.889,30." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: true },
    esperado: { summe: 641.2, kv: 135.45, pv: 358.75, av: 103.25, ak: 17.5, wbf: 26.25, sonderzahlung: 597.45, jahr: 8889.3 },
  },
  {
    nombre: "3.500 Euro außerhalb Wiens",
    origen: { tipo: "recalculado", url: SV_WERTE, detalle: "3.500 × (3,87 + 10,25 + 2,95 + 0,5 + 0,5) % = 632,45; Wohnbauförderung 17,50." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: false },
    esperado: { summe: 632.45, wbf: 17.5, avSatz: 2.95 },
  },
  {
    nombre: "Höchstbeitrag bei 9.000 Euro",
    origen: { tipo: "recalculado", url: SV_WERTE, detalle: "Höchstbeiträge Angestellte 2026: KV 268,19, PV 710,33, AV 204,44, AK 34,65. Summe 6.930 × 18,07 % = 1.252,25 (einmal gerundet, Wohnbauförderung als Rest 34,64). Sonderzahlungen bis 13.860 im Jahr: 9.000 × 17,07 % = 1.536,30, dann 4.860 × 17,07 % = 829,60." },
    fecha: "2026-10-14",
    entrada: { brutto: 9000, wien: false },
    esperado: { summe: 1252.25, kv: 268.19, pv: 710.33, av: 204.44, ak: 34.65, wbf: 34.64, sonderzahlung: 1536.3, jahr: 17392.9 },
  },
  {
    nombre: "2.400 Euro: Arbeitslosenversicherung 1 %",
    origen: { tipo: "recalculado", url: SV_WERTE, detalle: "Beitragsgrundlage über 2.225 bis 2.427 Euro: AV-Dienstnehmeranteil 1 %. 2.400 × 16,12 % = 386,88." },
    fecha: "2026-10-14",
    entrada: { brutto: 2400, wien: false },
    esperado: { summe: 386.88, av: 24, avSatz: 1 },
  },
  {
    nombre: "Geringfügig: 551,10 Euro",
    origen: { tipo: "recalculado", url: SV_WERTE, detalle: "Bis zur Geringfügigkeitsgrenze von 551,10 Euro keine Dienstnehmerbeiträge." },
    fecha: "2026-10-14",
    entrada: { brutto: 551.1, wien: false },
    esperado: { summe: 0, jahr: 0 },
  },
]);
