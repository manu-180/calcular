import { definirCasos } from "@/motor/calculo";
import arbetsgivaravgift from "./arbetsgivaravgift";

const SKV = "https://skatteverket.se/arbetsgivaravgifter";

export default definirCasos(arbetsgivaravgift, [
  {
    nombre: "35 000 kr med full avgift",
    origen: { tipo: "recalculado", url: SKV, detalle: "31,42 % av 35 000 = 10 997 kr. Lön och avgift 45 997 kr." },
    fecha: "2026-10-24",
    entrada: { lon: 35000, grupp: "vanlig" },
    esperado: { avgift: 10997, kostnad: 45997, avgiftAr: 131964 },
  },
  {
    nombre: "Ung anställd med 30 000 kr: sänkt avgift upp till 25 000 kr",
    origen: { tipo: "recalculado", url: SKV, detalle: "20,81 % av 25 000 = 5 202,50 och 31,42 % av 5 000 = 1 571. Summa 6 773,50 kr." },
    fecha: "2026-10-24",
    entrada: { lon: 30000, grupp: "unga" },
    esperado: { avgift: 6773.5, kostnad: 36773.5 },
  },
  {
    nombre: "Ung anställd med lön under taket",
    origen: { tipo: "recalculado", url: SKV, detalle: "Hela lönen är under 25 000 kr: 20,81 % av 20 000 = 4 162 kr." },
    fecha: "2026-10-24",
    entrada: { lon: 20000, grupp: "unga" },
    esperado: { avgift: 4162 },
  },
  {
    nombre: "Anställd som fyllt 67 år",
    origen: { tipo: "recalculado", url: SKV, detalle: "Bara ålderspensionsavgift, 10,21 % av 30 000 = 3 063 kr." },
    fecha: "2026-10-24",
    entrada: { lon: 30000, grupp: "aldre" },
    esperado: { avgift: 3063 },
  },
  {
    nombre: "Ingen lön",
    origen: { tipo: "recalculado", url: SKV, detalle: "Utan lön finns ingen avgift att räkna." },
    fecha: "2026-10-24",
    entrada: { lon: 0, grupp: "vanlig" },
    esperaError: true,
  },
]);
