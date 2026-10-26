import { definirCasos } from "@/motor/calculo";
import csaladiAdokedvezmenyKalkulator from "./csaladi-adokedvezmeny-kalkulator";

const SZJA = "https://njt.jog.gov.hu/jogszabaly/1995-117-00-00";

export default definirCasos(csaladiAdokedvezmenyKalkulator, [
  {
    nombre: "Két gyermek, 500 000 Ft bruttó",
    origen: { tipo: "recalculado", url: SZJA, detalle: "2 × 266 660 = 533 320; SZJA 75 000 helyett 0; maradék 33 320 × 15% = 4998 járulékkedvezmény; összesen 79 998." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 2, eltartottak: null, tartosanBeteg: 0, brutto: 500000 },
    esperado: { kedvezmeny: 533320, maximum: 79998, szjaBol: 75000, jarulekbol: 4998, havi: 79998, elveszo: 0 },
  },
  {
    nombre: "Három gyermek, minimálbér: a kedvezmény egy része elvész",
    origen: { tipo: "recalculado", url: SZJA, detalle: "3 × 440 000 = 1 320 000, értéke 198 000; SZJA 48 420 és TB 59 718 tűnik el, havonta 108 138; 89 862 nem érvényesíthető." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 3, eltartottak: null, tartosanBeteg: 0, brutto: 322800 },
    esperado: { maximum: 198000, havi: 108138, szjaBol: 48420, jarulekbol: 59718, elveszo: 89862, eves: 1297656 },
  },
  {
    nombre: "Egy tartósan beteg gyermek",
    origen: { tipo: "recalculado", url: SZJA, detalle: "133 340 + 133 340 (29/A. § (2a)) = 266 680; értéke 40 002." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 1, eltartottak: null, tartosanBeteg: 1, brutto: 500000 },
    esperado: { kedvezmeny: 266680, maximum: 40002, havi: 40002 },
  },
  {
    nombre: "Több beteg gyermek, mint gyermek",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Hibás bevitel." },
    fecha: "2026-10-24",
    entrada: { gyerekek: 1, eltartottak: null, tartosanBeteg: 2, brutto: 500000 },
    esperaError: true,
  },
]);
