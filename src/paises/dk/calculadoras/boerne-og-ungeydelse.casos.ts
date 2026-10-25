import { definirCasos } from "@/motor/calculo";
import boerneOgUngeydelse from "./boerne-og-ungeydelse";

const BUY = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/boerne-og-ungeydelsesloven";

export default definirCasos(boerneOgUngeydelse, [
  {
    nombre: "Et barn på 0-2 år, delt mellem to forældre",
    origen: { tipo: "oficial", url: BUY, detalle: "2026: 21.480 kr. pr. år (5.370 kr. pr. kvartal) til 0-2-årige. Halvdelen: 10.740 kr. om året, 2.685 kr. pr. kvartal." },
    fecha: "2026-10-24",
    entrada: { b02: 1, b36: 0, b714: 0, u1517: 0, deles: true, indkomst: null },
    esperado: { aar: 10740, kvartal: 2685, maaned: 0, aftrapning: 0 },
  },
  {
    nombre: "Et barn på 3-6 år og en ung på 15-17 år med aftrapning",
    origen: {
      tipo: "recalculado",
      url: BUY,
      detalle: "16.992 + 13.368 = 30.360. Indkomst 1.061.100 er 100.000 over grænsen på 961.100: aftrapning 2 % = 2.000. Efter aftrapning 28.360: 3.968,16 pr. kvartal og 1.040,61 pr. måned.",
    },
    fecha: "2026-10-24",
    entrada: { b02: 0, b36: 1, b714: 0, u1517: 1, deles: false, indkomst: 1061100 },
    esperado: { fuld: 30360, aftrapning: 2000, aar: 28360, kvartal: 3968.16, maaned: 1040.61 },
  },
  {
    nombre: "Satserne for 2027",
    origen: { tipo: "oficial", url: BUY, detalle: "2027: 21.912 kr. pr. år til 0-2-årige. Halvdelen er 10.956 kr." },
    fecha: "2027-01-02",
    entrada: { b02: 1, b36: 0, b714: 0, u1517: 0, deles: true, indkomst: null },
    esperado: { aar: 10956 },
  },
  {
    nombre: "Ingen børn",
    origen: { tipo: "recalculado", url: BUY, detalle: "Uden børn er der ingen ydelse." },
    fecha: "2026-10-24",
    entrada: { b02: 0, b36: 0, b714: 0, u1517: 0, deles: true, indkomst: null },
    esperaError: true,
  },
]);
