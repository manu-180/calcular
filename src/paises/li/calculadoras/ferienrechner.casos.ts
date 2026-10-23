import { definirCasos } from "@/motor/calculo";
import ferienrechner from "./ferienrechner";

export default definirCasos(ferienrechner, [
  {
    nombre: "30 Jahre, 5-Tage-Woche",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Vier Wochen: 20 Tage. Zuschlag 4 / 48 = 8,33 %." },
    fecha: "2026-10-22",
    entrada: { alter: 30, tageProWoche: 5, monate: 12, vertragWochen: null },
    esperado: { wochen: 4, tage: 20, tageJahr: 20, zuschlag: 8.3333 },
    tolerancia: 0.001,
  },
  {
    nombre: "18 Jahre, halbes Dienstjahr",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Fünf Wochen bis zum vollendeten 20. Altersjahr: 25 Tage x 6 / 12 = 12,5." },
    fecha: "2026-10-22",
    entrada: { alter: 18, tageProWoche: 5, monate: 6, vertragWochen: null },
    esperado: { wochen: 5, tage: 12.5 },
  },
  {
    nombre: "Vertrag mit fünf Wochen",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/1003001000", detalle: "Der Vertrag gibt mehr: 25 Tage." },
    fecha: "2026-10-22",
    entrada: { alter: 40, tageProWoche: 5, monate: 12, vertragWochen: 5 },
    esperado: { wochen: 5, tage: 25 },
  },
]);
