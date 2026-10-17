import { definirCasos } from "@/motor/calculo";
import kuendigungsfristRechner from "./kuendigungsfrist-rechner";

const OR = "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_335_c";

export default definirCasos(kuendigungsfristRechner, [
  {
    nombre: "Siebtes Dienstjahr, zwei Monate",
    origen: { tipo: "recalculado", url: OR, detalle: "Beginn 1.3.2020, Kündigung trifft am 14.10.2026 ein: 7. Dienstjahr, 2 Monate bis 14.12.2026, auf Ende Monat: 31.12.2026." },
    fecha: "2026-10-14",
    entrada: { beginn: "2020-03-01", zugang: "2026-10-14", probezeit: 1, vertragFrist: null },
    esperado: { ende: "2026-12-31", dienstjahr: 7, frist: "2 Monate auf ein Monatsende" },
  },
  {
    nombre: "Erstes Dienstjahr nach der Probezeit",
    origen: { tipo: "recalculado", url: OR, detalle: "Beginn 1.1.2026, Kündigung 15.6.2026: 1 Monat bis 15.7., Ende 31.7.2026." },
    fecha: "2026-10-14",
    entrada: { beginn: "2026-01-01", zugang: "2026-06-15", probezeit: 1, vertragFrist: null },
    esperado: { ende: "2026-07-31", dienstjahr: 1 },
  },
  {
    nombre: "Kündigung am letzten Tag des Monats",
    origen: { tipo: "recalculado", url: OR, detalle: "Eintreffen 30.4.2026, 1 Monat bis 30.5., Ende 31.5.2026." },
    fecha: "2026-10-14",
    entrada: { beginn: "2025-09-01", zugang: "2026-04-30", probezeit: 1, vertragFrist: null },
    esperado: { ende: "2026-05-31" },
  },
  {
    nombre: "In der Probezeit",
    origen: { tipo: "recalculado", url: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_335_b", detalle: "Beginn 1.10.2026, Kündigung 14.10.2026 in der Probezeit: 7 Tage, Ende 21.10.2026." },
    fecha: "2026-10-14",
    entrada: { beginn: "2026-10-01", zugang: "2026-10-14", probezeit: 1, vertragFrist: null },
    esperado: { ende: "2026-10-21", frist: "7 Tage (Probezeit)" },
  },
  {
    nombre: "Elftes Dienstjahr, drei Monate",
    origen: { tipo: "recalculado", url: OR, detalle: "Beginn 1.5.2016, Kündigung 30.6.2026: 11. Dienstjahr, 3 Monate bis 30.9., Ende 30.9.2026." },
    fecha: "2026-10-14",
    entrada: { beginn: "2016-05-01", zugang: "2026-06-30", probezeit: 1, vertragFrist: null },
    esperado: { ende: "2026-09-30", dienstjahr: 11 },
  },
  {
    nombre: "Kündigung vor Stellenantritt",
    origen: { tipo: "recalculado", detalle: "Eintreffen vor dem Beginn ist nicht möglich." },
    fecha: "2026-10-14",
    entrada: { beginn: "2026-10-01", zugang: "2026-09-01", probezeit: 1, vertragFrist: null },
    esperaError: true,
  },
]);
