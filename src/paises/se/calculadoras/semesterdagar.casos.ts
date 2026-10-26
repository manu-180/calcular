import { definirCasos } from "@/motor/calculo";
import semesterdagar from "./semesterdagar";

const LAG = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/semesterlag-1977480_sfs-1977-480/";

export default definirCasos(semesterdagar, [
  {
    nombre: "Hela året anställd",
    origen: { tipo: "recalculado", url: LAG, detalle: "7 §: 365 / 365 × 25 = 25 betalda dagar." },
    fecha: "2026-10-24",
    entrada: { anstallda: 365, franvaro: 0, arslangd: "365" },
    esperado: { betalda: 25, obetalda: 0 },
  },
  {
    nombre: "Anställd från 1 oktober (182 dagar)",
    origen: { tipo: "recalculado", url: LAG, detalle: "7 §: 182 / 365 × 25 = 12,47, avrundas uppåt till 13 dagar. 12 dagar blir obetalda." },
    fecha: "2026-10-24",
    entrada: { anstallda: 182, franvaro: 0, arslangd: "365" },
    esperado: { betalda: 13, obetalda: 12 },
  },
  {
    nombre: "Tjänstledig utan lön i 60 dagar",
    origen: { tipo: "recalculado", url: LAG, detalle: "7 §: (365 − 60) / 365 × 25 = 20,89, uppåt 21 dagar." },
    fecha: "2026-10-24",
    entrada: { anstallda: 365, franvaro: 60, arslangd: "365" },
    esperado: { betalda: 21, obetalda: 4 },
  },
  {
    nombre: "Fler frånvarodagar än anställningsdagar",
    origen: { tipo: "recalculado", url: LAG, detalle: "Frånvaron kan inte vara större än anställningstiden." },
    fecha: "2026-10-24",
    entrada: { anstallda: 100, franvaro: 150, arslangd: "365" },
    esperaError: true,
  },
]);
