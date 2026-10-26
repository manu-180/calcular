import { definirCasos } from "@/motor/calculo";
import fastighetsavgift from "./fastighetsavgift";

const BELOPP = "https://skatteverket.se/download/18.1522bf3f19aea8075ba3285/1767885159120/belopp-och-procentsatser-for-inkomstaret-2026.pdf";

export default definirCasos(fastighetsavgift, [
  {
    nombre: "Taxeringsvärde 1 000 000 kr",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "0,75 % av 1 000 000 = 7 500 kr, under taket 10 425 kr." },
    fecha: "2026-10-24",
    entrada: { taxeringsvarde: 1000000, vardear: 1975 },
    esperado: { avgift: 7500, perManad: 625 },
  },
  {
    nombre: "Taxeringsvärde 2 000 000 kr: taket",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Skatteverket: avgiften är 10 425 kronor men högst 0,75 procent av taxeringsvärdet. 0,75 % av 2 000 000 = 15 000, alltså 10 425 kr." },
    fecha: "2026-10-24",
    entrada: { taxeringsvarde: 2000000, vardear: 1990 },
    esperado: { avgift: 10425, procent: 15000 },
  },
  {
    nombre: "Hus med värdeår 2015",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Ingen fastighetsavgift de första 15 åren för hus byggda 2012 eller senare." },
    fecha: "2026-10-24",
    entrada: { taxeringsvarde: 3000000, vardear: 2015 },
    esperado: { avgift: 0 },
  },
  {
    nombre: "Inget taxeringsvärde",
    origen: { tipo: "recalculado", url: BELOPP, detalle: "Utan taxeringsvärde finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { taxeringsvarde: 0, vardear: 1990 },
    esperaError: true,
  },
]);
