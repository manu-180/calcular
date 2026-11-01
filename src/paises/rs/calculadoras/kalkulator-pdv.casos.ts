import { definirCasos } from "@/motor/calculo";
import kalkulatorPdv from "./kalkulator-pdv";

const PDV = "https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2004/84/4/reg";

export default definirCasos(kalkulatorPdv, [
  {
    nombre: "1.000 bez PDV po opštoj stopi",
    origen: { tipo: "recalculado", url: PDV, detalle: "Čl. 23: 20 % od 1.000 = 200; ukupno 1.200." },
    fecha: "2026-10-31",
    entrada: { iznos: 1000, stopa: "opsta", smer: "bez" },
    esperado: { pdv: 200, ukupno: 1200 },
  },
  {
    nombre: "1.100 sa PDV po posebnoj stopi",
    origen: { tipo: "recalculado", url: PDV, detalle: "1.100 / 1,10 = 1.000; PDV 100." },
    fecha: "2026-10-31",
    entrada: { iznos: 1100, stopa: "posebna", smer: "sa" },
    esperado: { pdv: 100, osnovica: 1000 },
  },
]);
