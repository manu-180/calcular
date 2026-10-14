import { definirCasos } from "@/motor/calculo";
import kuendigungsfristRechner from "./kuendigungsfrist-rechner";

const BGB = "https://www.gesetze-im-internet.de/bgb/__622.html";

export default definirCasos(kuendigungsfristRechner, [
  {
    nombre: "Arbeitgeber nach zehn Jahren: vier Monate zum Monatsende",
    origen: { tipo: "recalculado", url: BGB, detalle: "Beginn 1.3.2016, Zugang 14.10.2026: 10 volle Jahre, § 622 Absatz 2 Nummer 4. 14.10.2026 + 4 Monate = 14.2.2027, Ende 28.2.2027." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitgeber", beginn: "2016-03-01", zugang: "2026-10-14", probezeit: false },
    esperado: { ende: "2027-02-28", jahre: 10, frist: "4 Monate zum Monatsende" },
  },
  {
    nombre: "Arbeitnehmer: vier Wochen zum Monatsende",
    origen: { tipo: "recalculado", url: BGB, detalle: "Zugang 1.6.2026 + 28 Tage = 29.6.2026, nächster Termin 30.6.2026." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitnehmer", beginn: "2020-01-01", zugang: "2026-06-01", probezeit: false },
    esperado: { ende: "2026-06-30", frist: "4 Wochen zum 15. oder zum Monatsende" },
  },
  {
    nombre: "Unter zwei Jahren: vier Wochen zum 15.",
    origen: { tipo: "recalculado", url: BGB, detalle: "Zugang 3.6.2026 + 28 Tage = 1.7.2026, nächster Termin 15.7.2026." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitgeber", beginn: "2025-09-01", zugang: "2026-06-03", probezeit: false },
    esperado: { ende: "2026-07-15", jahre: 0 },
  },
  {
    nombre: "Genau zwei Jahre, Zugang am 31. Januar",
    origen: { tipo: "recalculado", url: BGB, detalle: "2 Jahre: ein Monat zum Monatsende. 31.1.2026 + 1 Monat = 28.2.2026 (§ 188 Absatz 3 BGB), Ende 28.2.2026." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitgeber", beginn: "2024-01-31", zugang: "2026-01-31", probezeit: false },
    esperado: { ende: "2026-02-28", jahre: 2, frist: "1 Monat zum Monatsende" },
  },
  {
    nombre: "Probezeit: zwei Wochen",
    origen: { tipo: "recalculado", url: BGB, detalle: "14.10.2026 + 14 Tage = 28.10.2026 (§ 622 Absatz 3 BGB)." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitgeber", beginn: "2026-08-01", zugang: "2026-10-14", probezeit: true },
    esperado: { ende: "2026-10-28" },
  },
  {
    nombre: "Zugang vor Beginn wird abgewiesen",
    origen: { tipo: "recalculado", detalle: "Zugang 1.1.2026 liegt vor dem Beginn am 1.2.2026." },
    fecha: "2026-10-14",
    entrada: { seite: "arbeitgeber", beginn: "2026-02-01", zugang: "2026-01-01", probezeit: false },
    esperaError: true,
  },
]);
