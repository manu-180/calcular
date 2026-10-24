import { definirCasos } from "@/motor/calculo";
import kuendigungsfristRechner from "./kuendigungsfrist-rechner";

export default definirCasos(kuendigungsfristRechner, [
  {
    nombre: "5. Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Zwei Monate auf ein Monatsende: 15.10. + 2 Monate = 15.12., Ende 31.12.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2022-03-01", zugang: "2026-10-15", probezeit: 1, vertragFrist: null },
    esperado: { dienstjahr: 5, ende: "2026-12-31" },
  },
  {
    nombre: "In der Probezeit",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Sieben Tage: 27.09.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2026-09-01", zugang: "2026-09-20", probezeit: 1, vertragFrist: null },
    esperado: { dienstjahr: 1, ende: "2026-09-27" },
  },
  {
    nombre: "12. Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Drei Monate: Ende 31.01.2027." },
    fecha: "2026-10-22",
    entrada: { beginn: "2015-01-01", zugang: "2026-10-15", probezeit: 1, vertragFrist: null },
    esperado: { dienstjahr: 12, ende: "2027-01-31" },
  },
  {
    nombre: "1. Dienstjahr nach der Probezeit",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Ein Monat: Ende 30.11.2026." },
    fecha: "2026-10-22",
    entrada: { beginn: "2026-01-10", zugang: "2026-10-15", probezeit: 1, vertragFrist: null },
    esperado: { dienstjahr: 1, ende: "2026-11-30" },
  },
  {
    nombre: "Kündigung vor Beginn",
    origen: { tipo: "recalculado", detalle: "Daten widersprechen sich." },
    fecha: "2026-10-22",
    entrada: { beginn: "2026-10-01", zugang: "2026-09-01", probezeit: 1, vertragFrist: null },
    esperaError: true,
  },
]);
