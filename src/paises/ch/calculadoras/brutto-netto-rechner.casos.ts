import { definirCasos } from "@/motor/calculo";
import bruttoNettoRechner from "./brutto-netto-rechner";

const AHV = "https://www.ahv-iv.ch/p/2.01.d";
const BVG = "https://www.fedlex.admin.ch/eli/cc/1983/797_797_797/de#art_8";

export default definirCasos(bruttoNettoRechner, [
  {
    nombre: "6500 Franken, 13 Löhne, 35 Jahre",
    origen: {
      tipo: "recalculado",
      url: AHV,
      detalle:
        "AHV/IV/EO 6500 × 5,3 % = 344,50; ALV 6500 × 1,1 % = 71,50; NBU 1 % = 65. BVG: Jahreslohn 84 500, koordiniert 84 500 − 26 460 = 58 040, Altersgutschrift 10 % = 5804, Hälfte 2902 / 12 = 241,83. Netto 6500 − 722,83 = 5777,17. Jahr: 84 500 − 4478,50 − 929,50 − 2901,96 − 845 = 75 345,04.",
    },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, anzahl: "13", alter: 35, nbu: 1, ktg: 0, bvgMonat: null },
    esperado: { ahv: 344.5, alv: 71.5, bvg: 241.83, nbu: 65, total: 722.83, netto: 5777.17, jahreslohn: 84500, nettoJahr: 75345.04, koordinierterLohn: 58040 },
  },
  {
    nombre: "Lohn über dem höchsten versicherten Verdienst",
    origen: {
      tipo: "recalculado",
      url: BVG,
      detalle:
        "14 000 × 12 = 168 000. AHV 742. ALV nur bis 148 200 / 12 = 12 350: 135,85. NBU 1,2 % von 12 350 = 148,20. BVG koordiniert 90 720 − 26 460 = 64 260, 15 % = 9639, Hälfte / 12 = 401,63. Netto 14 000 − 1427,68 = 12 572,32.",
    },
    fecha: "2026-10-14",
    entrada: { monatslohn: 14000, anzahl: "12", alter: 50, nbu: 1.2, ktg: 0, bvgMonat: null },
    esperado: { ahv: 742, alv: 135.85, nbu: 148.2, bvg: 401.63, netto: 12572.32, nettoJahr: 150867.84 },
  },
  {
    nombre: "Lohn unter der BVG-Eintrittsschwelle",
    origen: { tipo: "recalculado", url: BVG, detalle: "1800 × 12 = 21 600 liegt nicht über 22 680: kein BVG. AHV 95,40; ALV 19,80; NBU 18. Netto 1666,80." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 1800, anzahl: "12", alter: 22, nbu: 1, ktg: 0, bvgMonat: null },
    esperado: { bvg: 0, koordinierterLohn: 0, total: 133.2, netto: 1666.8 },
  },
  {
    nombre: "BVG-Abzug aus der Lohnabrechnung",
    origen: { tipo: "recalculado", url: AHV, detalle: "AHV 344,50; ALV 71,50; NBU 0,8 % = 52; BVG 300 wie eingegeben. Netto 6500 − 768 = 5732." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, anzahl: "12", alter: 40, nbu: 0.8, ktg: 0, bvgMonat: 300 },
    esperado: { bvg: 300, total: 768, netto: 5732 },
  },
  {
    nombre: "Alter ausserhalb des Bereichs",
    origen: { tipo: "recalculado", detalle: "Alter 12 ist nicht zulässig." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, anzahl: "12", alter: 12, nbu: 1, ktg: 0, bvgMonat: null },
    esperaError: true,
  },
]);
