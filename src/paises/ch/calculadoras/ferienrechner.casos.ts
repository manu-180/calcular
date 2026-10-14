import { definirCasos } from "@/motor/calculo";
import ferienrechner from "./ferienrechner";

const OR = "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_329_a";

export default definirCasos(ferienrechner, [
  {
    nombre: "Erwachsene Person, 5-Tage-Woche",
    origen: { tipo: "recalculado", url: OR, detalle: "4 Wochen × 5 Tage = 20 Tage. Zuschlag 4 / 48 = 8,33 %." },
    fecha: "2026-10-14",
    entrada: { alter: 30, tageProWoche: 5, monate: 12, vertragWochen: null },
    esperado: { wochen: 4, tage: 20, tageJahr: 20, zuschlag: 8.33333333 },
  },
  {
    nombre: "Unter 20 Jahren",
    origen: { tipo: "recalculado", url: OR, detalle: "Bis zum vollendeten 20. Altersjahr 5 Wochen: 25 Tage. Zuschlag 5 / 47 = 10,64 %." },
    fecha: "2026-10-14",
    entrada: { alter: 19, tageProWoche: 5, monate: 12, vertragWochen: null },
    esperado: { wochen: 5, tage: 25, zuschlag: 10.63829787 },
  },
  {
    nombre: "Teilzeit, halbes Dienstjahr",
    origen: { tipo: "recalculado", url: OR, detalle: "4 Wochen × 3 Tage = 12 Tage im Jahr; 6 Monate: 6 Tage (Art. 329a Abs. 3)." },
    fecha: "2026-10-14",
    entrada: { alter: 40, tageProWoche: 3, monate: 6, vertragWochen: null },
    esperado: { tage: 6, tageJahr: 12 },
  },
  {
    nombre: "Fünf Wochen laut Vertrag",
    origen: { tipo: "recalculado", url: OR, detalle: "Vertrag 5 Wochen über dem Minimum: 25 Tage." },
    fecha: "2026-10-14",
    entrada: { alter: 50, tageProWoche: 5, monate: 12, vertragWochen: 5 },
    esperado: { wochen: 5, tage: 25 },
  },
]);
