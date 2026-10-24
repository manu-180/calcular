import { definirCasos } from "@/motor/calculo";
import steuerrechner from "./steuerrechner";

export default definirCasos(steuerrechner, [
  {
    nombre: "80 000 Franken, alleinstehend, 150 %",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "0,05 x 80 000 - 1744 = 2256; Gemeinde 150 % = 3384; total 5640." },
    fecha: "2026-10-22",
    entrada: { erwerb: 80000, tarif: "alleinstehend", zuschlag: 150 },
    esperado: { landessteuer: 2256, gemeindesteuer: 3384, total: 5640, durchschnitt: 7.05, grenzsatz: 12.5 },
  },
  {
    nombre: "60 000 Franken, Ehegatten, 200 %",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "0,03 x 60 000 - 1163 = 637; Gemeinde 1274; total 1911." },
    fecha: "2026-10-22",
    entrada: { erwerb: 60000, tarif: "ehegatten", zuschlag: 200 },
    esperado: { landessteuer: 637, gemeindesteuer: 1274, total: 1911 },
  },
  {
    nombre: "250 000 Franken, alleinerziehend, 180 %",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "0,065 x 250 000 - 5232 = 11 018; Gemeinde 19 832,40; total 30 850,40." },
    fecha: "2026-10-22",
    entrada: { erwerb: 250000, tarif: "alleinerziehend", zuschlag: 180 },
    esperado: { landessteuer: 11018, gemeindesteuer: 19832.4, total: 30850.4 },
  },
  {
    nombre: "Unter dem Grundfreibetrag",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "15 000 liegt unter 15 855: keine Steuer." },
    fecha: "2026-10-22",
    entrada: { erwerb: 15000, tarif: "alleinstehend", zuschlag: 150 },
    esperado: { total: 0 },
  },
  {
    nombre: "Abrundung auf 10 Franken",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "80 009 wird zu 80 000." },
    fecha: "2026-10-22",
    entrada: { erwerb: 80009, tarif: "alleinstehend", zuschlag: 150 },
    esperado: { erwerb: 80000, landessteuer: 2256 },
  },
]);
