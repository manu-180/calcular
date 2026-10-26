import { definirCasos } from "@/motor/calculo";
import reseavdrag from "./reseavdrag";

const BELOPP = "https://skatteverket.se/download/18.1522bf3f19aea8075ba3285/1767885159120/belopp-och-procentsatser-for-inkomstaret-2026.pdf";

export default definirCasos(reseavdrag, [
  {
    nombre: "Egen bil, 40 km enkel väg, 200 dagar",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "40 × 2 × 200 = 16 000 km = 1 600 mil. 1 600 × 25 = 40 000 kr. Avdrag 40 000 − 15 000 = 25 000 kr." },
    fecha: "2026-10-24",
    entrada: { fardmedel: "egen-bil", km: 40, dagar: 200, kostnad: null },
    esperado: { mil: 1600, kostnad: 40000, avdrag: 25000 },
  },
  {
    nombre: "Elförmånsbil, 30 km, 210 dagar",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "30 × 2 × 210 / 10 = 1 260 mil × 9,50 = 11 970 kr. Under 15 000 kr, inget avdrag." },
    fecha: "2026-10-24",
    entrada: { fardmedel: "formansbil-el", km: 30, dagar: 210, kostnad: null },
    esperado: { kostnad: 11970, avdrag: 0 },
  },
  {
    nombre: "Kollektivtrafik 18 000 kr per år",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "18 000 − 15 000 = 3 000 kr i avdrag." },
    fecha: "2026-10-24",
    entrada: { fardmedel: "kollektivt", km: null, dagar: null, kostnad: 18000 },
    esperado: { avdrag: 3000 },
  },
  {
    nombre: "Inget avstånd",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "Utan resor finns inget avdrag att räkna." },
    fecha: "2026-10-24",
    entrada: { fardmedel: "egen-bil", km: 0, dagar: 200, kostnad: null },
    esperaError: true,
  },
]);
