import { definirCasos } from "@/motor/calculo";
import bruttoBerKalkulator from "./brutto-ber-kalkulator";

const SZJA = "https://njt.jog.gov.hu/jogszabaly/1995-117-00-00";

export default definirCasos(bruttoBerKalkulator, [
  {
    nombre: "A minimálbér nettójából vissza a bruttóig",
    origen: { tipo: "recalculado", url: SZJA, detalle: "322 800 − 59 718 − 48 420 = 214 662; 322 799-ből csak 214 661 maradna." },
    fecha: "2026-10-24",
    entrada: { netto: 214662, gyerekek: 0, eltartottak: null, alatt25: false, anyak: false },
    esperado: { brutto: 322800, tb: 59718, szja: 48420, nettoKapott: 214662 },
  },
  {
    nombre: "400 000 Ft nettó kedvezmények nélkül",
    origen: { tipo: "recalculado", url: SZJA, detalle: "601 503 − 111 278 − 90 225 = 400 000; 601 502-ből 399 999 maradna." },
    fecha: "2026-10-24",
    entrada: { netto: 400000, gyerekek: 0, eltartottak: null, alatt25: false, anyak: false },
    esperado: { brutto: 601503, munkaltatoiKoltseg: 679698 },
  },
  {
    nombre: "400 000 Ft nettó 25 év alatt",
    origen: { tipo: "recalculado", url: "https://nav.gov.hu/ado/szja/25-ev-alatti-fiatalok-kedvezmenye", detalle: "SZJA nincs, csak TB: 490 797 − 90 797 = 400 000." },
    fecha: "2026-10-24",
    entrada: { netto: 400000, gyerekek: 0, eltartottak: null, alatt25: true, anyak: false },
    esperado: { brutto: 490797, szja: 0 },
  },
  {
    nombre: "Nulla nettó",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Nullából nincs mit visszaszámolni." },
    fecha: "2026-10-24",
    entrada: { netto: 0, gyerekek: 0, eltartottak: null, alatt25: false, anyak: false },
    esperaError: true,
  },
]);
