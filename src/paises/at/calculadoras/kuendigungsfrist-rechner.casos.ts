import { definirCasos } from "@/motor/calculo";
import kuendigungsfristRechner from "./kuendigungsfrist-rechner";

const USP = "https://www.usp.gv.at/themen/mitarbeiter-und-gesundheit/beendigung-des-arbeitsverhaeltnisses/kuendigung.html";

export default definirCasos(kuendigungsfristRechner, [
  {
    nombre: "Arbeitgeber, sechs Dienstjahre: drei Monate zum Quartalsende",
    origen: { tipo: "recalculado", url: USP, detalle: "Nach dem vollendeten fünften Dienstjahr drei Monate; 14.10.2026 plus drei Monate = 14.1.2027, nächstes Quartalsende 31.3.2027." },
    fecha: "2026-10-14",
    entrada: { wer: "arbeitgeber", beginn: "2020-03-01", zugang: "2026-10-14", termin: "quartal" },
    esperado: { ende: "2027-03-31", frist: "3 Monate", dienstjahre: 6 },
  },
  {
    nombre: "Arbeitnehmer: ein Monat zum Monatsletzten",
    origen: { tipo: "recalculado", url: USP, detalle: "Für Arbeitnehmer ein Monat zum Monatsletzten: 14.10.2026 plus ein Monat = 14.11.2026, Ende 30.11.2026." },
    fecha: "2026-10-14",
    entrada: { wer: "arbeitnehmer", beginn: "2020-03-01", zugang: "2026-10-14", termin: "quartal" },
    esperado: { ende: "2026-11-30", frist: "1 Monat" },
  },
  {
    nombre: "Arbeitgeber im ersten Dienstjahr: sechs Wochen zum Quartalsende",
    origen: { tipo: "recalculado", url: USP, detalle: "Sechs Wochen ab 14.10.2026 = 25.11.2026, Quartalsende 31.12.2026." },
    fecha: "2026-10-14",
    entrada: { wer: "arbeitgeber", beginn: "2026-01-01", zugang: "2026-10-14", termin: "quartal" },
    esperado: { ende: "2026-12-31", frist: "6 Wochen", dienstjahre: 0 },
  },
  {
    nombre: "Vereinbart 15. oder Monatsletzter",
    origen: { tipo: "recalculado", url: USP, detalle: "Sechs Wochen ab 1.10.2026 = 12.11.2026, nächster Termin 15.11.2026." },
    fecha: "2026-10-14",
    entrada: { wer: "arbeitgeber", beginn: "2025-01-01", zugang: "2026-10-01", termin: "fuenfzehnter" },
    esperado: { ende: "2026-11-15" },
  },
  {
    nombre: "26 Dienstjahre: fünf Monate",
    origen: { tipo: "recalculado", url: USP, detalle: "Nach dem vollendeten 25. Dienstjahr fünf Monate: 14.10.2026 plus fünf Monate = 14.3.2027, Quartalsende 31.3.2027." },
    fecha: "2026-10-14",
    entrada: { wer: "arbeitgeber", beginn: "2000-01-01", zugang: "2026-10-14", termin: "quartal" },
    esperado: { ende: "2027-03-31", frist: "5 Monate", dienstjahre: 26 },
  },
]);
