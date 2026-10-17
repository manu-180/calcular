import { definirCasos } from "@/motor/calculo";
import minijobRechner from "./minijob-rechner";

export default definirCasos(minijobRechner, [
  {
    nombre: "603 Euro, rentenversicherungspflichtig, gesetzlich versichert",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/sgb_6/__168.html",
      detalle: "AG: KV 13 % = 78,39; RV 15 % = 90,45; Pauschsteuer 2 % = 12,06; zusammen 180,90. AN: 18,6 % × 603 = 112,158 − 90,45 = 21,71. Netto 581,29. Kosten 783,90.",
    },
    fecha: "2026-10-14",
    entrada: { verdienst: 603, rvBefreit: false, gesetzlichVersichert: true },
    esperado: { grenze: 603, agKv: 78.39, agRv: 90.45, agSteuer: 12.06, agSumme: 180.9, kosten: 783.9, anRv: 21.71, netto: 581.29 },
  },
  {
    nombre: "150 Euro: Mindestbemessungsgrundlage von 175 Euro",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/sgb_6/__163.html",
      detalle: "AG RV 15 % × 150 = 22,50. AN: 18,6 % × 175 = 32,55 − 22,50 = 10,05. Netto 139,95.",
    },
    fecha: "2026-10-14",
    entrada: { verdienst: 150, rvBefreit: false, gesetzlichVersichert: true },
    esperado: { agRv: 22.5, anRv: 10.05, netto: 139.95 },
  },
  {
    nombre: "Befreit von der Rentenversicherung, privat versichert",
    origen: { tipo: "recalculado", detalle: "400 Euro: kein AN-Beitrag, kein KV-Pauschalbeitrag. AG: RV 60 + Steuer 8 = 68." },
    fecha: "2026-10-14",
    entrada: { verdienst: 400, rvBefreit: true, gesetzlichVersichert: false },
    esperado: { anRv: 0, agKv: 0, agSumme: 68, netto: 400 },
  },
  {
    nombre: "Über der Grenze wird abgewiesen",
    origen: { tipo: "recalculado", detalle: "604 Euro liegen über der Grenze von 603 Euro." },
    fecha: "2026-10-14",
    entrada: { verdienst: 604, rvBefreit: false, gesetzlichVersichert: true },
    esperaError: true,
  },
]);
