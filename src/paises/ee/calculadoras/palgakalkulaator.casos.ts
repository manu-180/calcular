import { definirCasos } from "@/motor/calculo";
import palgakalkulaator from "./palgakalkulaator";

const TUMS = "https://www.riigiteataja.ee/akt/TuMS";
const ALUS = { sammas: "2", maksuvaba: true, pensioniiga: false } as const;

export default definirCasos(palgakalkulaator, [
  {
    nombre: "2000 eurot, II sammas 2%",
    origen: { tipo: "recalculado", url: TUMS, detalle: "Töötuskindlustus 32; II sammas 40; maksustatav 2000 - 72 - 700 = 1228; tulumaks 22% = 270,16; neto 1657,84. Sotsiaalmaks 660; töötuskindlustus 16; kulu 2676." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, bruto: 2000 },
    esperado: { tootuskindlustus: 32, kogumispension: 40, tulumaks: 270.16, neto: 1657.84, sotsiaalmaks: 660, tooandjaKulu: 2676 },
  },
  {
    nombre: "2000 eurot ilma maksuvaba tuluta",
    origen: { tipo: "recalculado", url: TUMS, detalle: "Maksustatav 1928; tulumaks 424,16; neto 1503,84." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, bruto: 2000, maksuvaba: false },
    esperado: { tulumaks: 424.16, neto: 1503.84 },
  },
  {
    nombre: "Miinimumpalk 946 eurot",
    origen: { tipo: "recalculado", url: TUMS, detalle: "Töötuskindlustus 15,14; II sammas 18,92; maksustatav 211,94; tulumaks 46,63; neto 865,31." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, bruto: 946 },
    esperado: { neto: 865.31 },
  },
  {
    nombre: "Pensioniealine, II sammast pole",
    origen: { tipo: "recalculado", url: "https://www.emta.ee/eraklient/maksud-ja-tasumine/maksusoodustused/maksuvaba-tulu-arvestamine", detalle: "Töötuskindlustus 16; maksuvaba 776; maksustatav 208; tulumaks 45,76; neto 938,24." },
    fecha: "2026-10-15",
    entrada: { bruto: 1000, sammas: "0", maksuvaba: true, pensioniiga: true },
    esperado: { neto: 938.24, maksuvaba: 776 },
  },
  {
    nombre: "Väike palk jääb maksuvaba tulu sisse",
    origen: { tipo: "recalculado", url: TUMS, detalle: "500 - 8 - 10 = 482; maksuvaba ainult 482 ulatuses; tulumaks 0; neto 482. Sotsiaalmaksu miinimum 292,38." },
    fecha: "2026-10-15",
    entrada: { ...ALUS, bruto: 500 },
    esperado: { neto: 482, tulumaks: 0, sotsiaalmaks: 292.38 },
  },
  { nombre: "Null ei sobi", origen: { tipo: "recalculado", url: TUMS, detalle: "Brutopalk peab olema suurem kui null." }, fecha: "2026-10-15", entrada: { ...ALUS, bruto: 0 }, esperaError: true },
]);
