import { definirCasos } from "@/motor/calculo";
import calculadora from "./vakantiegeld-berekenen";

export default definirCasos(calculadora, [
  {
    nombre: "Heel jaar met het wettelijk minimum",
    origen: { tipo: "recalculado", detalle: "3.500 × 12 = 42.000; × 8% = 3.360; per maand 280.", url: "https://wetten.overheid.nl/BWBR0002638/2026-01-01" },
    fecha: "2026-10-14",
    entrada: { maandloon: 3500, maanden: 12, percentage: null },
    esperado: { vakantiegeld: 3360, perMaand: 280, loon: 42000, percentage: 8 },
  },
  {
    nombre: "Vijf maanden in dienst",
    origen: { tipo: "recalculado", detalle: "2.800 × 5 = 14.000; × 8% = 1.120." },
    fecha: "2026-10-14",
    entrada: { maandloon: 2800, maanden: 5, percentage: null },
    esperado: { vakantiegeld: 1120, loon: 14000 },
  },
  {
    nombre: "Cao met 8,33%",
    origen: { tipo: "recalculado", detalle: "4.000 × 12 = 48.000; × 8,33% = 3.998,40." },
    fecha: "2026-10-14",
    entrada: { maandloon: 4000, maanden: 12, percentage: 8.33 },
    esperado: { vakantiegeld: 3998.4, percentage: 8.33 },
  },
  {
    nombre: "Nul maanden is geen geldige invoer",
    origen: { tipo: "recalculado", detalle: "Zonder gewerkte maanden is er geen opbouw." },
    fecha: "2026-10-14",
    entrada: { maandloon: 3000, maanden: 0, percentage: null },
    esperaError: true,
  },
]);
