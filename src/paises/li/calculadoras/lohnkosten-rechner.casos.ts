import { definirCasos } from "@/motor/calculo";
import lohnkostenRechner from "./lohnkosten-rechner";

export default definirCasos(lohnkostenRechner, [
  {
    nombre: "6000 Franken, 12 Löhne",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1", detalle: "AG 7,385 % = 443,10; ALV 30; BPV 4 % von 72 000 / 12 = 240. Beiträge 713,10, Kosten 6713,10." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 6000, anzahl: "12", alter: 35, bu: 0, bpvAg: null },
    esperado: { ahv: 443.1, alv: 30, bpv: 240, beitraege: 713.1, kosten: 6713.1, jahr: 80557.2 },
  },
  {
    nombre: "Mit BU 0,2 % und eigenem BPV-Beitrag",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1", detalle: "AG 443,10; ALV 30; BPV 300; BU 12. Beiträge 785,10." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 6000, anzahl: "12", alter: 35, bu: 0.2, bpvAg: 300 },
    esperado: { bu: 12, bpv: 300, beitraege: 785.1, kosten: 6785.1 },
  },
]);
