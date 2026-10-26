import { definirCasos } from "@/motor/calculo";
import lonnEtterSkatt from "./lonn-etter-skatt";

const SATSER = "https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/";

export default definirCasos(lonnEtterSkatt, [
  {
    nombre: "Årslønn 600 000 kr i 2026",
    origen: {
      tipo: "recalculado",
      url: SATSER,
      detalle: "Minstefradrag 46 % = 276 000, tak 95 700. Alminnelig inntekt 504 300 − personfradrag 114 540 = 389 760 × 22 % = 85 747,20. Trinnskatt 92 200 × 1,7 % + 281 700 × 4 % = 12 835,40. Trygdeavgift 7,6 % = 45 600. Sum 144 182,60.",
    },
    fecha: "2026-10-24",
    entrada: { lonn: 600000, periode: "ar", fradrag: 0, tiltakssonen: false, ungEllerEldre: false },
    esperado: { skattAlminnelig: 85747.2, trinnskatt: 12835.4, trygdeavgift: 45600, skattAr: 144182.6, nettoAr: 455817.4, nettoMnd: 37984.78, marginalskatt: 33.6 },
  },
  {
    nombre: "Månedslønn 50 000 kr gir samme som 600 000 i året",
    origen: { tipo: "recalculado", url: SATSER, detalle: "50 000 × 12 = 600 000: samme skatt, 12 015,22 kr i snitt per måned." },
    fecha: "2026-10-24",
    entrada: { lonn: 50000, periode: "mnd", fradrag: 0, tiltakssonen: false, ungEllerEldre: false },
    esperado: { skattMnd: 12015.22, nettoMnd: 37984.78 },
  },
  {
    nombre: "Årslønn 1 500 000 kr: trinn 5",
    origen: {
      tipo: "recalculado",
      url: SATSER,
      detalle: "Trinnskatt 1 567,40 + 16 270 + 34 941,85 + 81 832,80 + 5 838,40 = 140 450,45. Alminnelig 1 289 760 × 22 % = 283 747,20. Trygdeavgift 114 000. Sum 538 197,65.",
    },
    fecha: "2026-10-24",
    entrada: { lonn: 1500000, periode: "ar", fradrag: 0, tiltakssonen: false, ungEllerEldre: false },
    esperado: { trinnskatt: 140450.45, skattAr: 538197.65, nettoAr: 961802.35 },
  },
  {
    nombre: "Tiltakssonen: 18,5 % og særskilt fradrag 45 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Alminnelig inntekt 504 300 − 45 000 = 459 300 − 114 540 = 344 760 × 18,5 % = 63 780,60. Sum 122 216." },
    fecha: "2026-10-24",
    entrada: { lonn: 600000, periode: "ar", fradrag: 0, tiltakssonen: true, ungEllerEldre: false },
    esperado: { skattAlminnelig: 63780.6, skattAr: 122216 },
  },
  {
    nombre: "Lav lønn 120 000 kr: opptrapping av trygdeavgiften",
    origen: { tipo: "recalculado", url: SATSER, detalle: "7,6 % av 120 000 = 9 120, men høyst 25 % av 20 350 = 5 087,50. Alminnelig inntekt 64 800 er under personfradraget." },
    fecha: "2026-10-24",
    entrada: { lonn: 120000, periode: "ar", fradrag: 0, tiltakssonen: false, ungEllerEldre: false },
    esperado: { trygdeavgift: 5087.5, skattAlminnelig: 0, skattAr: 5087.5 },
  },
  {
    nombre: "Gjeldsrenter 30 000 kr i fradrag",
    origen: { tipo: "recalculado", url: SATSER, detalle: "450 000: alminnelig inntekt 450 000 − 95 700 − 30 000 = 324 300; 209 760 × 22 % = 46 147,20. Trinnskatt 6 835,40, trygdeavgift 34 200." },
    fecha: "2026-10-24",
    entrada: { lonn: 450000, periode: "ar", fradrag: 30000, tiltakssonen: false, ungEllerEldre: false },
    esperado: { skattAlminnelig: 46147.2, skattAr: 87182.6 },
  },
  {
    nombre: "Lønn null",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Uten lønn er det ingenting å regne på." },
    fecha: "2026-10-24",
    entrada: { lonn: 0, periode: "ar", fradrag: 0, tiltakssonen: false, ungEllerEldre: false },
    esperaError: true,
  },
]);
