import { definirCasos } from "@/motor/calculo";
import trygdeavgift from "./trygdeavgift";

const SATSER = "https://www.skatteetaten.no/satser/trygdeavgift/?year=2026";

export default definirCasos(trygdeavgift, [
  {
    nombre: "Lønn 500 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "7,6 % av 500 000 = 38 000." },
    fecha: "2026-10-24",
    entrada: { inntekt: 500000, type: "lonn" },
    esperado: { avgift: 38000, perManed: 3166.67, sats: 7.6 },
  },
  {
    nombre: "Næringsinntekt 500 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "10,8 % av 500 000 = 54 000." },
    fecha: "2026-10-24",
    entrada: { inntekt: 500000, type: "naering" },
    esperado: { avgift: 54000 },
  },
  {
    nombre: "Pensjon 300 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "5,1 % av 300 000 = 15 300." },
    fecha: "2026-10-24",
    entrada: { inntekt: 300000, type: "pensjon" },
    esperado: { avgift: 15300 },
  },
  {
    nombre: "Lønn 110 000 kr: opptrapping",
    origen: { tipo: "recalculado", url: SATSER, detalle: "7,6 % = 8 360, men høyst 25 % av 10 350 = 2 587,50." },
    fecha: "2026-10-24",
    entrada: { inntekt: 110000, type: "lonn" },
    esperado: { avgift: 2587.5 },
  },
  {
    nombre: "Under nedre grense",
    origen: { tipo: "recalculado", url: SATSER, detalle: "90 000 er under 99 650: ingen trygdeavgift." },
    fecha: "2026-10-24",
    entrada: { inntekt: 90000, type: "lonn" },
    esperado: { avgift: 0 },
  },
]);
