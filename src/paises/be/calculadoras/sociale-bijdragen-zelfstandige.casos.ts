import { definirCasos } from "@/motor/calculo";
import calculadora from "./sociale-bijdragen-zelfstandige";

const RSVZ = "https://socialsecurity.belgium.be/sites/default/files/content/docs/nl/sociaal-beleid-vorm-geven/zelfstandigen/bijdragennota_2026_tabel_nl.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Minimumbijdrage hoofdberoep 2026",
    origen: { tipo: "oficial", url: RSVZ, detalle: "Minimumbijdrage per kwartaal, algemene regel: 890,42 (20,50 % op 17.374,08 ÷ 4)." },
    fecha: "2026-10-14",
    entrada: { inkomen: 10000, statuut: "hoofdberoep", primostarter: false },
    esperado: { perKwartaal: 890.42, basis: 17374.08 },
  },
  {
    nombre: "Maximumbijdrage hoofdberoep 2026",
    origen: { tipo: "oficial", url: RSVZ, detalle: "Maximumbijdrage per kwartaal: 5.103,05 (20,50 % tot 75.024,54 en 14,16 % tot 110.562,42)." },
    fecha: "2026-10-14",
    entrada: { inkomen: 200000, statuut: "hoofdberoep", primostarter: false },
    esperado: { perKwartaal: 5103.05 },
  },
  {
    nombre: "Primostarter met een laag inkomen",
    origen: { tipo: "oficial", url: RSVZ, detalle: "Kwartalen als primostarter: 459,82 (20,50 % op 8.972,07 ÷ 4)." },
    fecha: "2026-10-14",
    entrada: { inkomen: 5000, statuut: "hoofdberoep", primostarter: true },
    esperado: { perKwartaal: 459.82 },
  },
  {
    nombre: "Hoofdberoep met € 40.000",
    origen: { tipo: "recalculado", url: RSVZ, detalle: "20,50 % × 40.000 = 8.200 per jaar, 2.050 per kwartaal." },
    fecha: "2026-10-14",
    entrada: { inkomen: 40000, statuut: "hoofdberoep", primostarter: false },
    esperado: { perJaar: 8200, perKwartaal: 2050 },
  },
  {
    nombre: "Bijberoep onder de drempel",
    origen: { tipo: "oficial", url: RSVZ, detalle: "Bijberoep met I < 1.922,16: 0." },
    fecha: "2026-10-14",
    entrada: { inkomen: 1500, statuut: "bijberoep", primostarter: false },
    esperado: { perKwartaal: 0 },
  },
  {
    nombre: "Bijberoep op de drempel",
    origen: { tipo: "oficial", url: RSVZ, detalle: "Minimumbijdrage bijberoep: 98,51 per kwartaal (20,50 % op 1.922,16 ÷ 4)." },
    fecha: "2026-10-14",
    entrada: { inkomen: 1922.16, statuut: "bijberoep", primostarter: false },
    esperado: { perKwartaal: 98.51 },
  },
]);
