import { definirCasos } from "@/motor/calculo";
import kalkulatorZaInflacija from "./kalkulator-za-inflacija";

const DZS = "https://www.stat.mk/mk/stat/економија-и-финансии/feni/indeksi-na-troshofite-na-zhivotot-i-na-fenite-na-malo/indeksi-na-troshofite-na-zhivotot-i-na-fenite-na-malo-septemvri-2026-godina/";

export default definirCasos(kalkulatorZaInflacija, [
  {
    nombre: "100.000 денари, една година, септември 2026",
    origen: { tipo: "recalculado", url: DZS, detalle: "Годишна инфлација 2,7 %: 100.000 × 1,027 = 102.700; 100.000 / 1,027 = 97.371." },
    fecha: "2026-11-01",
    entrada: { iznos: 100000, godini: 1 },
    esperado: { potreben: 102700, vrednost: 97371, stapka: 2.7, zaguba: 2629 },
  },
  {
    nombre: "Со податок за август 2026",
    origen: { tipo: "recalculado", url: DZS, detalle: "Годишна инфлација 2,6 % за август 2026: 100.000 × 1,026 = 102.600." },
    fecha: "2026-08-15",
    entrada: { iznos: 100000, godini: 1 },
    esperado: { potreben: 102600, stapka: 2.6 },
  },
]);
