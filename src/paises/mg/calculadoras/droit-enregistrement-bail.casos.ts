import { definirCasos } from "@/motor/calculo";
import calculadora from "./droit-enregistrement-bail";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Appartement à 800 000 Ar par mois pour un an",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 02.02.12 : 1 % × 800 000 × 12 = 96 000." },
    fecha: F,
    entrada: { usage: "habitation", loyer: 800000, charges: 0, mois: 12 },
    esperado: { base: 9600000, droit: 96000 },
  },
  {
    nombre: "Local commercial sur trois ans avec charges",
    origen: { tipo: "recalculado", url: CDI, detalle: "2 % × (2 000 000 + 100 000) × 36 = 1 512 000." },
    fecha: F,
    entrada: { usage: "autres", loyer: 2000000, charges: 100000, mois: 36 },
    esperado: { droit: 1512000 },
  },
]);
