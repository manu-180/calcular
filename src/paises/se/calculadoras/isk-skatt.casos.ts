import { definirCasos } from "@/motor/calculo";
import iskSkatt from "./isk-skatt";

const SKV = "https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html";

export default definirCasos(iskSkatt, [
  {
    nombre: "Exemplet med Peter (inkomstår 2025, utan grundnivå)",
    origen: {
      tipo: "oficial",
      url: SKV,
      detalle: "Skatteverket: summa värden och insättningar 210 000 kr, kapitalunderlag 52 500 kr, schablonintäkt 2,96 % = 1 554 kr och skatt 466 kr. Exemplet räknar utan den skattefria grundnivån.",
    },
    fecha: "2026-10-24",
    entrada: { q1: 0, q2: 42000, q3: 50000, q4: 58000, insattningar: 60000 },
    valores: { "se.isk-schablonranta": 2.96, "se.isk-grundniva": 0 },
    esperado: { kapitalunderlag: 52500, schablonintakt: 1554, skatt: 466 },
  },
  {
    nombre: "425 000 kr i kapitalunderlag 2026",
    origen: {
      tipo: "recalculado",
      url: SKV,
      detalle: "Kapitalunderlag 1 700 000 / 4 = 425 000. Schablonintäkt 3,55 % = 15 087. Avdrag 300 000 × 3,55 % = 10 650. Skatt 30 % av 4 437 = 1 331 kr.",
    },
    fecha: "2026-10-24",
    entrada: { q1: 400000, q2: 410000, q3: 420000, q4: 430000, insattningar: 40000 },
    esperado: { kapitalunderlag: 425000, schablonintakt: 15087, avdrag: 10650, skatt: 1331, effektiv: 1.065 },
  },
  {
    nombre: "Under grundnivån: ingen skatt",
    origen: { tipo: "recalculado", url: SKV, detalle: "Kapitalunderlag 200 000 är under grundnivån 300 000 kr. Ingen skatt." },
    fecha: "2026-10-24",
    entrada: { q1: 200000, q2: 200000, q3: 200000, q4: 200000, insattningar: 0 },
    esperado: { skatt: 0 },
  },
  {
    nombre: "Tomt konto",
    origen: { tipo: "recalculado", url: SKV, detalle: "Utan värden finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { q1: 0, q2: 0, q3: 0, q4: 0, insattningar: 0 },
    esperaError: true,
  },
]);
