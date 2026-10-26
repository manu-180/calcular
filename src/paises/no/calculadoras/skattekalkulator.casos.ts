import { definirCasos } from "@/motor/calculo";
import skattekalkulator from "./skattekalkulator";

const SATSER = "https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/";

export default definirCasos(skattekalkulator, [
  {
    nombre: "Lønn 650 000, renteinntekter 5 000 og gjeldsrenter 40 000",
    origen: {
      tipo: "recalculado",
      url: SATSER,
      detalle: "Alminnelig inntekt 650 000 − 95 700 + 5 000 − 40 000 = 519 300; − 114 540 = 404 760 × 22 % = 89 047,20. Trinnskatt 1 567,40 + 13 268 = 14 835,40. Trygdeavgift 49 400. Sum 153 282,60. Trukket 160 000 gir 6 717,40 til gode.",
    },
    fecha: "2026-10-24",
    entrada: { lonn: 650000, kapital: 5000, gjeldsrenter: 40000, andreFradrag: 0, trukket: 160000, tiltakssonen: false },
    esperado: { skatt: 153282.6, skattAlminnelig: 89047.2, trinnskatt: 14835.4, trygdeavgift: 49400, tilGode: 6717.4, restskatt: null },
  },
  {
    nombre: "Restskatt når det er trukket for lite",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Samme inntekt, trukket 150 000: 153 282,60 − 150 000 = 3 282,60 i restskatt." },
    fecha: "2026-10-24",
    entrada: { lonn: 650000, kapital: 5000, gjeldsrenter: 40000, andreFradrag: 0, trukket: 150000, tiltakssonen: false },
    esperado: { restskatt: 3282.6, tilGode: null },
  },
  {
    nombre: "Bare kapitalinntekt 200 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Ingen lønn: ingen minstefradrag, trinnskatt eller trygdeavgift. (200 000 − 114 540) × 22 % = 18 801,20." },
    fecha: "2026-10-24",
    entrada: { lonn: 0, kapital: 200000, gjeldsrenter: 0, andreFradrag: 0, trukket: 0, tiltakssonen: false },
    esperado: { skatt: 18801.2, trinnskatt: 0, trygdeavgift: 0 },
  },
  {
    nombre: "Ingen inntekt",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Uten inntekt er det ingenting å regne på." },
    fecha: "2026-10-24",
    entrada: { lonn: 0, kapital: 0, gjeldsrenter: 0, andreFradrag: 0, trukket: 0, tiltakssonen: false },
    esperaError: true,
  },
]);
