import { definirCasos } from "@/motor/calculo";
import bhmKalkulyatori from "./bhm-kalkulyatori";

const PF115 = "https://lex.uz/uz/docs/-8283656";
const PF2025 = "https://president.uz/oz/lists/view/8180";

export default definirCasos(bhmKalkulyatori, [
  {
    nombre: "5 BHM, 2026-yil oktabr",
    origen: { tipo: "oficial", url: PF115, detalle: "PF-115, 3-band (b): 2026-yil 1-sentabrdan BHM 440 000 soʻm; 5 × 440 000 = 2 200 000." },
    fecha: "2026-10-24",
    entrada: { yonalish: "bhm-som", bhm: 5, som: null },
    esperado: { summa: 2200000, bhm: 440000 },
  },
  {
    nombre: "1 BHM, 2026-yil avgust",
    origen: { tipo: "oficial", url: PF2025, detalle: "2025-yil 1-avgustdan BHM 412 000 soʻm." },
    fecha: "2026-08-15",
    entrada: { yonalish: "bhm-som", bhm: 1, som: null },
    esperado: { summa: 412000 },
  },
  {
    nombre: "1 100 000 soʻm necha BHM",
    origen: { tipo: "recalculado", url: PF115, detalle: "1 100 000 / 440 000 = 2,5." },
    fecha: "2026-10-24",
    entrada: { yonalish: "som-bhm", bhm: null, som: 1100000 },
    esperado: { soni: 2.5 },
  },
]);
