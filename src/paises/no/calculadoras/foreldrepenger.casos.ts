import { definirCasos } from "@/motor/calculo";
import foreldrepenger from "./foreldrepenger";

const NAV = "https://www.nav.no/foreldrepenger";

export default definirCasos(foreldrepenger, [
  {
    nombre: "600 000 kr, begge har rett, 100 %",
    origen: { tipo: "recalculado", url: NAV, detalle: "Dagsats 600 000 / 260 = 2 307,69. 49 uker = 245 dager: 2 307,69 × 245 = 565 384,05." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, dekning: "100", hvem: "begge" },
    esperado: { dagsats: 2307.69, perUke: 11538.45, perManed: 50000, totalt: 565384.05, uker: 49 },
  },
  {
    nombre: "600 000 kr, begge har rett, 80 %",
    origen: { tipo: "recalculado", url: NAV, detalle: "Dagsats 480 000 / 260 = 1 846,15. 61 uker og 1 dag = 306 dager: 564 921,90." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, dekning: "80", hvem: "begge" },
    esperado: { dagsats: 1846.15, perManed: 40000, totalt: 564921.9, uker: 61.2 },
  },
  {
    nombre: "Far alene med 100 %",
    origen: { tipo: "recalculado", url: NAV, detalle: "46 uker = 230 dager × 2 307,69 = 530 768,70." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, dekning: "100", hvem: "far-alene" },
    esperado: { totalt: 530768.7, uker: 46 },
  },
  {
    nombre: "Mor alene får samme periode som når begge har rett",
    origen: { tipo: "recalculado", url: NAV, detalle: "Mor alene: 49 uker med 100 %." },
    fecha: "2026-10-24",
    entrada: { inntekt: 600000, dekning: "100", hvem: "mor-alene" },
    esperado: { uker: 49 },
  },
  {
    nombre: "Inntekt over 6 G",
    origen: { tipo: "recalculado", url: NAV, detalle: "6 G = 819 294; dagsats 3 151,13 × 245 = 772 026,85." },
    fecha: "2026-10-24",
    entrada: { inntekt: 1000000, dekning: "100", hvem: "begge" },
    esperado: { dagsats: 3151.13, totalt: 772026.85 },
  },
  {
    nombre: "Under halv G: engangsstønad",
    origen: { tipo: "recalculado", url: "https://www.nav.no/engangsstonad", detalle: "50 000 er under 0,5 G. Engangsstønad 92 648 per barn." },
    fecha: "2026-10-24",
    entrada: { inntekt: 50000, dekning: "100", hvem: "begge" },
    esperado: { rett: "Nei", engangsstonad: 92648, totalt: null },
  },
]);
