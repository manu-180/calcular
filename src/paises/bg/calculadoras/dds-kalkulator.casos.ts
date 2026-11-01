import { definirCasos } from "@/motor/calculo";
import calc from "./dds-kalkulator";

const MI = "https://www.mi.government.bg/en/general/otchitane-i-vazstanovyavane-na-dds/";

export default definirCasos(calc, [
  {
    nombre: "100 евро без ДДС, 20 %",
    origen: { tipo: "recalculado", url: MI, detalle: "100 × 20 % = 20; с ДДС 120." },
    fecha: "2026-10-31",
    entrada: { suma: 100, stavka: "osnovna", posoka: "bez" },
    esperado: { danak: 20, sDds: 120 },
  },
  {
    nombre: "120 евро с ДДС, 20 %",
    origen: { tipo: "recalculado", url: MI, detalle: "120 / 1,2 = 100." },
    fecha: "2026-10-31",
    entrada: { suma: 120, stavka: "osnovna", posoka: "s" },
    esperado: { danak: 20, bez: 100 },
  },
  {
    nombre: "100 евро без ДДС, 9 %",
    origen: { tipo: "recalculado", url: MI, detalle: "100 × 9 % = 9; с ДДС 109." },
    fecha: "2026-10-31",
    entrada: { suma: 100, stavka: "namalena", posoka: "bez" },
    esperado: { danak: 9, sDds: 109 },
  },
]);
