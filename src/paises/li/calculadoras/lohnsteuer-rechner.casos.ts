import { definirCasos } from "@/motor/calculo";
import lohnsteuerRechner from "./lohnsteuer-rechner";

export default definirCasos(lohnsteuerRechner, [
  {
    nombre: "85 000 Franken, alleinstehend",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "Abzüge: AHV 4165 + ALV 425 + BPV 3400 + Pauschale 1600 + Prämien 3700 = 13 290. Erwerb 71 710: 0,04 x 71 710 - 1004 = 1864,40; Gemeinde 2796,60; total 4661." },
    fecha: "2026-10-22",
    entrada: { jahreslohn: 85000, tarif: "alleinstehend", kinder: 0, praemien: 3700, zuschlag: 150 },
    esperado: { abzuege: 13290, erwerb: 71710, landessteuer: 1864.4, total: 4661, monat: 388.42 },
  },
  {
    nombre: "120 000 Franken, Ehegatten, 2 Kinder",
    origen: { tipo: "recalculado", url: "https://www.gesetze.li/konso/2010340000", detalle: "Abzüge: 6480 + 4800 + 1600 + Prämien 11 800 (Höchstbetrag 7400 + 2 x 2200) + Kinder 25 400 = 50 080. Erwerb 69 920: 0,03 x 69 920 - 1163 = 934,60; Gemeinde 200 % = 1869,20." },
    fecha: "2026-10-22",
    entrada: { jahreslohn: 120000, tarif: "ehegatten", kinder: 2, praemien: 12000, zuschlag: 200 },
    esperado: { abzuege: 50080, erwerb: 69920, landessteuer: 934.6, gemeindesteuer: 1869.2, total: 2803.8 },
  },
]);
