import { definirCasos } from "@/motor/calculo";
import nettoberKalkulator from "./nettober-kalkulator";

const SZJA = "https://njt.jog.gov.hu/jogszabaly/1995-117-00-00";
const NAV_25 = "https://nav.gov.hu/ado/szja/25-ev-alatti-fiatalok-kedvezmenye";
const ALAP = { gyerekek: 0, eltartottak: null, tartosanBeteg: 0, alatt25: false, anyak: false, szemelyi: false, elsoHazasok: false };

export default definirCasos(nettoberKalkulator, [
  {
    nombre: "Minimálbér 2026: 322 800 Ft",
    origen: { tipo: "recalculado", url: SZJA, detalle: "TB 18,5% = 59 718; SZJA 15% = 48 420; nettó 322 800 − 59 718 − 48 420 = 214 662." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 322800 },
    esperado: { tb: 59718, szja: 48420, netto: 214662, munkaltatoiKoltseg: 364764 },
  },
  {
    nombre: "500 000 Ft, egy gyermek",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Családi kedvezmény 133 340 (29/A. § (2)); SZJA-alap 366 660, SZJA 54 999; TB 92 500; nettó 352 501." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 500000, gyerekek: 1 },
    esperado: { csaladiKedvezmeny: 133340, szja: 54999, netto: 352501, jarulekKedvezmeny: 0 },
  },
  {
    nombre: "600 000 Ft, két gyermek",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Kedvezmény 2 × 266 660 = 533 320; SZJA-alap 66 680, SZJA 10 002; TB 111 000; nettó 478 998." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 600000, gyerekek: 2 },
    esperado: { csaladiKedvezmeny: 533320, szja: 10002, netto: 478998 },
  },
  {
    nombre: "Minimálbér, három gyermek: a járulékkedvezmény is elfogy",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Kedvezmény 3 × 440 000 = 1 320 000; SZJA 0; maradék 997 200 × 15% = 149 580, de legfeljebb a TB 59 718; nettó = bruttó." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 322800, gyerekek: 3 },
    esperado: { szja: 0, jarulekKedvezmeny: 59718, netto: 322800 },
  },
  {
    nombre: "Egy kedvezményezett és egy további eltartott",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Két eltartott: 266 660 egy kedvezményezett után; 500 000 − 266 660 = 233 340, SZJA 35 001; nettó 372 499." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 500000, gyerekek: 1, eltartottak: 2 },
    esperado: { csaladiKedvezmeny: 266660, szja: 35001, netto: 372499 },
  },
  {
    nombre: "25 év alatti, 500 000 Ft",
    origen: { tipo: "recalculado", url: NAV_25, detalle: "A bér a havi 715 765 Ft-os határ alatt van: SZJA 0; nettó 500 000 − 92 500 = 407 500." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 500000, alatt25: true },
    esperado: { szja: 0, kedvezmeny25: 500000, netto: 407500 },
  },
  {
    nombre: "25 év alatti, 900 000 Ft: a határ feletti rész adózik",
    origen: { tipo: "recalculado", url: NAV_25, detalle: "SZJA-alap 900 000 − 715 765 = 184 235, SZJA 27 635; TB 166 500; nettó 705 865." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 900000, alatt25: true },
    esperado: { kedvezmeny25: 715765, szja: 27635, netto: 705865 },
  },
  {
    nombre: "Anyák kedvezménye két gyermekkel: a családi kedvezmény a járulékot csökkenti",
    origen: { tipo: "recalculado", url: SZJA, detalle: "SZJA-alap 0 (29/H. §); családi kedvezmény 533 320 egésze marad, × 15% = 79 998 járulékkedvezmény; nettó 800 000 − 148 000 + 79 998 = 731 998." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 800000, anyak: true, gyerekek: 2 },
    esperado: { szja: 0, jarulekKedvezmeny: 79998, netto: 731998 },
  },
  {
    nombre: "Személyi és első házas kedvezmény",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Személyi kedvezmény 322 800 / 3 = 107 600; első házasok 33 335; alap 400 000 − 140 935 = 259 065, SZJA 38 860; nettó 400 000 − 74 000 − 38 860 = 287 140." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 400000, szemelyi: true, elsoHazasok: true },
    esperado: { szemelyiKedvezmeny: 107600, elsoHazasokKedvezmeny: 33335, szja: 38860, netto: 287140 },
  },
  {
    nombre: "Nulla bruttó bér",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Bér nélkül nincs mit számolni." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, brutto: 0 },
    esperaError: true,
  },
]);
