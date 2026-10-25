import { definirCasos } from "@/motor/calculo";
import mvaKalkulator from "./mva-kalkulator";

const SATSER = "https://www.skatteetaten.no/satser/merverdiavgift/?year=2026";

export default definirCasos(mvaKalkulator, [
  {
    nombre: "Legge til 25 % på 1 000 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "1 000 × 25 % = 250; inkl. mva. 1 250." },
    fecha: "2026-10-24",
    entrada: { belop: 1000, retning: "legg-til", sats: "alminnelig" },
    esperado: { inkl: 1250, mva: 250, eks: 1000 },
  },
  {
    nombre: "Trekke ut 25 % av 1 250 kr",
    origen: { tipo: "recalculado", url: SATSER, detalle: "1 250 / 1,25 = 1 000; mva. 250." },
    fecha: "2026-10-24",
    entrada: { belop: 1250, retning: "trekk-ut", sats: "alminnelig" },
    esperado: { eks: 1000, mva: 250 },
  },
  {
    nombre: "Mat med 15 %",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Inkl. 115 kr / 1,15 = 100; mva. 15." },
    fecha: "2026-10-24",
    entrada: { belop: 115, retning: "trekk-ut", sats: "naeringsmidler" },
    esperado: { eks: 100, mva: 15 },
  },
  {
    nombre: "Hotell med 12 %",
    origen: { tipo: "recalculado", url: SATSER, detalle: "2 000 × 12 % = 240; inkl. 2 240." },
    fecha: "2026-10-24",
    entrada: { belop: 2000, retning: "legg-til", sats: "lav" },
    esperado: { inkl: 2240, mva: 240 },
  },
]);
