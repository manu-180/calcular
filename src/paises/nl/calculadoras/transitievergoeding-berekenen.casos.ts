import { definirCasos } from "@/motor/calculo";
import calculadora from "./transitievergoeding-berekenen";

const BW = "https://wetten.overheid.nl/BWBR0005290/2026-01-01" as const;

export default definirCasos(calculadora, [
  {
    nombre: "8 jaar en 6 maanden met vakantiegeld",
    origen: { tipo: "recalculado", url: BW, detalle: "Maandloon 3.500 + 8% = 3.780; een derde = 1.260 per jaar. 8 × 1.260 + 6 × 105 = 10.710." },
    fecha: "2026-10-14",
    entrada: { begin: "2018-03-01", eind: "2026-08-31", salaris: 3500, vakantiegeld: true, toeslagen: 0, eindejaarsuitkering: 0 },
    esperado: { vergoeding: 10710, maandloon: 3780, perJaar: 1260, jaren: 8, maanden: 6, dagen: 0 },
  },
  {
    nombre: "Kort contract met losse dagen",
    origen: { tipo: "recalculado", detalle: "15-01-2025 tot en met 31-03-2026: 1 jaar, 2 maanden en 17 dagen. 1.000 + 2 × 83,33 + 1.000 × 17/365 = 1.213,24." },
    fecha: "2026-10-14",
    entrada: { begin: "2025-01-15", eind: "2026-03-31", salaris: 3000, vakantiegeld: false, toeslagen: 0, eindejaarsuitkering: 0 },
    esperado: { vergoeding: 1213.24, jaren: 1, maanden: 2, dagen: 17 },
  },
  {
    nombre: "Begrensd op het maximum",
    origen: {
      tipo: "recalculado",
      url: BW,
      detalle: "Maandloon 6.000 + 8% = 6.480, jaarloon 77.760 < 102.000. 50 jaar × 2.160 = 108.000, begrensd op 102.000.",
    },
    fecha: "2026-10-14",
    entrada: { begin: "1976-01-01", eind: "2025-12-31", salaris: 6000, vakantiegeld: true, toeslagen: 0, eindejaarsuitkering: 0 },
    esperado: { vergoeding: 102000, jaren: 50, maximum: 102000 },
  },
  {
    nombre: "Hoog jaarloon: maximum is een jaarsalaris",
    origen: { tipo: "recalculado", url: BW, detalle: "Maandloon 10.000 + 800 + 12.000/12 = 11.800; jaarloon 141.600 > 102.000. 40 jaar × 3.933,33 = 157.333,33, begrensd op 141.600." },
    fecha: "2026-10-14",
    entrada: { begin: "1986-01-01", eind: "2025-12-31", salaris: 10000, vakantiegeld: true, toeslagen: 0, eindejaarsuitkering: 12000 },
    esperado: { vergoeding: 141600, maandloon: 11800, maximum: 141600 },
  },
  {
    nombre: "Einddatum voor de begindatum",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { begin: "2026-05-01", eind: "2026-01-01", salaris: 3000, vakantiegeld: true, toeslagen: 0, eindejaarsuitkering: 0 },
    esperaError: true,
  },
]);
