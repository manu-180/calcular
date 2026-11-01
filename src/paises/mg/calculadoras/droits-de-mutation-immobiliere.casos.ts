import { definirCasos } from "@/motor/calculo";
import calculadora from "./droits-de-mutation-immobiliere";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Maison de 150 000 000 Ar vendue par un particulier",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.02.39 : 5 % × 150 000 000 = 7 500 000. IPVI : 20 % × 25 % × 150 000 000 = 7 500 000." },
    fecha: F,
    entrada: { prix: 150000000, charges: 0, vendeurParticulier: true },
    esperado: { droits: 7500000, coutAcheteur: 157500000, ipvi: 7500000 },
  },
  {
    nombre: "Terrain vendu par une société avec charges reprises",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base 80 000 000 + 5 000 000 = 85 000 000 ; 5 % = 4 250 000. Pas d'IPVI." },
    fecha: F,
    entrada: { prix: 80000000, charges: 5000000, vendeurParticulier: false },
    esperado: { base: 85000000, droits: 4250000, ipvi: null },
  },
]);
