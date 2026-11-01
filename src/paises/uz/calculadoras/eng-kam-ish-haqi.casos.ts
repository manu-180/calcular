import { definirCasos } from "@/motor/calculo";
import engKam from "./eng-kam-ish-haqi";

const PF115 = "https://lex.uz/uz/docs/-8283656";
const PF2025 = "https://president.uz/oz/lists/view/8180";

export default definirCasos(engKam, [
  {
    nombre: "2026-yil oktabr, toʻliq stavka",
    origen: { tipo: "oficial", url: PF115, detalle: "PF-115, 3-band (b): 2026-yil 1-sentabrdan oyiga 1 360 000 soʻm; soliqdan keyin 1 196 800." },
    fecha: "2026-10-24",
    entrada: { ulush: 100, maosh: null },
    esperado: { mhtekm: 1360000, engKam: 1360000, sof: 1196800 },
  },
  {
    nombre: "2026-yil 31-avgust, oldingi miqdor",
    origen: { tipo: "oficial", url: PF2025, detalle: "2025-yil 3-iyundagi Farmon, 3-band (b): 2025-yil 1-avgustdan 1 271 000 soʻm." },
    fecha: "2026-08-31",
    entrada: { ulush: 100, maosh: null },
    esperado: { mhtekm: 1271000 },
  },
  {
    nombre: "Yarim stavka va past maosh",
    origen: { tipo: "recalculado", url: PF115, detalle: "1 360 000 × 50% = 680 000; 600 000 − 680 000 = −80 000." },
    fecha: "2026-10-24",
    entrada: { ulush: 50, maosh: 600000 },
    esperado: { engKam: 680000, farq: -80000 },
  },
]);
