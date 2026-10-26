import { definirCasos } from "@/motor/calculo";
import lomarahalaskuri from "./lomarahalaskuri";

const VLL = "https://www.finlex.fi/fi/lainsaadanto/2005/162";

export default definirCasos(lomarahalaskuri, [
  {
    nombre: "3 000 euroa, 30 lomapäivää, 50 prosenttia ja vero 20 prosenttia",
    origen: {
      tipo: "recalculado",
      url: VLL,
      detalle: "Lomapäivän palkka 3 000 / 25 = 120 (17 §:n jakaja). Lomapalkka 3 600, lomaraha 50 % = 1 800. Vero 360, TyEL 7,30 % + työttömyys 0,89 % = 147,42. Käteen 1 292,58.",
    },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 3000, lomapaivat: 30, prosentti: 50, veroprosentti: 20 },
    esperado: { lomapalkka: 3600, lomaraha: 1800, maksut: 147.42, vero: 360, netto: 1292.58 },
  },
  {
    nombre: "Kesäloma 24 päivää ilman veroprosenttia",
    origen: { tipo: "recalculado", url: VLL, detalle: "2 500 / 25 × 24 = 2 400; 50 % = 1 200." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 2500, lomapaivat: 24, prosentti: 50, veroprosentti: null },
    esperado: { lomaraha: 1200, netto: null },
  },
]);
