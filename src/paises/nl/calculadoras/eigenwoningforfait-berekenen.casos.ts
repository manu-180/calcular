import { definirCasos } from "@/motor/calculo";
import calculadora from "./eigenwoningforfait-berekenen";

const WIB = "https://wetten.overheid.nl/BWBR0011353/2026-01-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "WOZ € 400.000",
    origen: { tipo: "oficial", url: WIB, detalle: "Artikel 3.112: € 75.000 tot € 1.350.000 is 0,35%. 400.000 × 0,35% = 1.400." },
    fecha: "2026-10-14",
    entrada: { woz: 400000, maanden: 12 },
    esperado: { forfait: 1400, perJaar: 1400, percentage: 0.35 },
  },
  {
    nombre: "WOZ € 60.000",
    origen: { tipo: "oficial", url: WIB, detalle: "€ 50.000 tot € 75.000 is 0,25%: 150." },
    fecha: "2026-10-14",
    entrada: { woz: 60000, maanden: 12 },
    esperado: { forfait: 150 },
  },
  {
    nombre: "Boven € 1.350.000 (villataks)",
    origen: { tipo: "oficial", url: WIB, detalle: "€ 4.725 + 2,35% × (1.500.000 − 1.350.000) = 8.250." },
    fecha: "2026-10-14",
    entrada: { woz: 1500000, maanden: 12 },
    esperado: { forfait: 8250 },
  },
  {
    nombre: "Tot € 12.500 nihil",
    origen: { tipo: "oficial", url: WIB, detalle: "Tot € 12.500: nihil." },
    fecha: "2026-10-14",
    entrada: { woz: 10000, maanden: 12 },
    esperado: { forfait: 0 },
  },
  {
    nombre: "Half jaar in de woning",
    origen: { tipo: "recalculado", detalle: "1.400 × 6/12 = 700." },
    fecha: "2026-10-14",
    entrada: { woz: 400000, maanden: 6 },
    esperado: { forfait: 700, perJaar: 1400 },
  },
]);
