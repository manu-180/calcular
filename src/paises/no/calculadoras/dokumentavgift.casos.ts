import { definirCasos } from "@/motor/calculo";
import dokumentavgift from "./dokumentavgift";

const VEDTAK = "https://lovdata.no/dokument/STV/forskrift/2025-12-18-2777";
const KARTVERKET = "https://www.kartverket.no/eiendom/dokumentavgift-og-gebyr/dokumentavgift-ved-overforing-av-fast-eigedom";

export default definirCasos(dokumentavgift, [
  {
    nombre: "Bolig til 4 500 000 kr med boliglån",
    origen: { tipo: "recalculado", url: VEDTAK, detalle: "2,5 % av 4 500 000 = 112 500. Gebyr 545 for skjøte og 545 for pantedokument. Sum 113 590." },
    fecha: "2026-10-24",
    entrada: { verdi: 4500000, pant: true },
    esperado: { avgift: 112500, totalt: 113590 },
  },
  {
    nombre: "Grunnlaget rundes ned til hele tusen",
    origen: { tipo: "recalculado", url: KARTVERKET, detalle: "3 456 789 rundes ned til 3 456 000; 2,5 % = 86 400; med gebyr for skjøtet 86 945." },
    fecha: "2026-10-24",
    entrada: { verdi: 3456789, pant: false },
    esperado: { grunnlag: 3456000, avgift: 86400, totalt: 86945 },
  },
  {
    nombre: "Minstebeløp 250 kr",
    origen: { tipo: "recalculado", url: VEDTAK, detalle: "2,5 % av 5 000 = 125, men minst 250." },
    fecha: "2026-10-24",
    entrada: { verdi: 5000, pant: false },
    esperado: { avgift: 250, totalt: 795 },
  },
]);
