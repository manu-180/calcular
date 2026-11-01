import { definirCasos } from "@/motor/calculo";
import utbytteskatt from "./utbytteskatt";

const SATSER = "https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/";

export default definirCasos(utbytteskatt, [
  {
    nombre: "Utbytte 50 000 kr i 2026",
    origen: { tipo: "recalculado", url: SATSER, detalle: "50 000 × 1,72 × 22 % = 18 920. Effektiv sats 37,84 %." },
    fecha: "2026-10-24",
    entrada: { type: "utbytte", belop: 50000, skjerming: 0 },
    esperado: { skatt: 18920, netto: 31080, effektivSats: 37.84, skattepliktig: 86000 },
  },
  {
    nombre: "Gevinst med skjermingsfradrag",
    origen: { tipo: "recalculado", url: SATSER, detalle: "(50 000 − 5 000) × 1,72 × 22 % = 17 028." },
    fecha: "2026-10-24",
    entrada: { type: "gevinst", belop: 50000, skjerming: 5000 },
    esperado: { skatt: 17028 },
  },
  {
    nombre: "Uttak fra aksjesparekonto ut over innskudd",
    origen: { tipo: "recalculado", url: SATSER, detalle: "100 000 × 37,84 % = 37 840." },
    fecha: "2026-10-24",
    entrada: { type: "ask", belop: 100000, skjerming: 0 },
    esperado: { skatt: 37840 },
  },
  {
    nombre: "Skjerming større enn beløpet",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Skjermingen kan ikke gjøre skatten negativ: 0." },
    fecha: "2026-10-24",
    entrada: { type: "utbytte", belop: 3000, skjerming: 5000 },
    esperado: { skatt: 0, skjerming: 3000 },
  },
]);
