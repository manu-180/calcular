import { definirCasos } from "@/motor/calculo";
import bruttoNettoRechner from "./brutto-netto-rechner";

export default definirCasos(bruttoNettoRechner, [
  {
    nombre: "6500 Franken, 12 Löhne, 35 Jahre",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1", detalle: "AHV/IV/FAK 4,9 % = 318,50; ALV 0,5 % von 78 000 / 12 = 32,50; Pensionskasse 4 % von 78 000 / 12 = 260. Abzüge 611, netto 5889." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 6500, anzahl: "12", alter: 35, nbu: 0, bpvMonat: null },
    esperado: { ahv: 318.5, alv: 32.5, bpv: 260, total: 611, netto: 5889, nettoJahr: 70668 },
  },
  {
    nombre: "12 000 Franken, 13 Löhne, NBU 1 %",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1", detalle: "AHV 588; ALV 0,5 % bis 126 000 = 630 / 13 = 48,46; BPV 4 % von 156 000 / 13 = 480; NBU 120. Abzüge 1236,46." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 12000, anzahl: "13", alter: 45, nbu: 1, bpvMonat: null },
    esperado: { ahv: 588, alv: 48.46, bpv: 480, nbu: 120, total: 1236.46, netto: 10763.54, jahreslohn: 156000 },
  },
  {
    nombre: "19 Jahre: noch keine Altersvorsorge",
    origen: { tipo: "recalculado", url: "https://www.ahv.li/beitraege/arbeitnehmer-arbeitgeber/beitragsansaetze-ahv-iv-fak-vk-gueltig-ab-01012021-1-1-1", detalle: "AHV 196, ALV 240 / 12 = 20, keine Pensionskasse vor dem 20. Kalenderjahr." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 4000, anzahl: "12", alter: 19, nbu: 0, bpvMonat: null },
    esperado: { ahv: 196, alv: 20, bpv: 0, netto: 3784 },
  },
  {
    nombre: "Lohn null",
    origen: { tipo: "recalculado", detalle: "Kein Lohn." },
    fecha: "2026-10-22",
    entrada: { monatslohn: 0, anzahl: "12", alter: 35, nbu: 0, bpvMonat: null },
    esperaError: true,
  },
]);
