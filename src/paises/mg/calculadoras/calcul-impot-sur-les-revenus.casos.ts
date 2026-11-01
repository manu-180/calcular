import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-impot-sur-les-revenus";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Société de services, bénéfice de 50 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 01.01.14 : 20 % × 50 000 000 = 10 000 000. Minimum 1 000 000 + 1 % × 500 000 000 = 6 000 000. On retient 10 000 000." },
    fecha: F,
    entrada: { benefice: 50000000, ca: 500000000, activite: "autres" },
    esperado: { impot: 10000000, minimum: 6000000, retenu: "Impôt au taux de 20 %" },
  },
  {
    nombre: "Hôtel en perte : minimum de perception",
    origen: { tipo: "recalculado", url: CDI, detalle: "Minimum 500 000 + 1 % × 300 000 000 = 3 500 000." },
    fecha: F,
    entrada: { benefice: 0, ca: 300000000, activite: "production" },
    esperado: { impot: 3500000, impotTaux: 0, retenu: "Minimum de perception" },
  },
  {
    nombre: "Bénéfice arrondi au millier inférieur",
    origen: { tipo: "recalculado", url: CDI, detalle: "Bénéfice 12 345 678 arrondi à 12 345 000 ; 20 % = 2 469 000. Minimum 1 000 000 + 1 % × 100 000 000 = 2 000 000." },
    fecha: F,
    entrada: { benefice: 12345678, ca: 100000000, activite: "autres" },
    esperado: { impotTaux: 2469000, impot: 2469000 },
  },
  {
    nombre: "Station-service : 1 pour mille du chiffre d'affaires",
    origen: { tipo: "recalculado", url: CDI, detalle: "Minimum 1 ‰ × 2 000 000 000 = 2 000 000 ; 20 % × 5 000 000 = 1 000 000. On retient 2 000 000." },
    fecha: F,
    entrada: { benefice: 5000000, ca: 2000000000, activite: "carburant" },
    esperado: { minimum: 2000000, impot: 2000000 },
  },
  {
    nombre: "Compagnie pétrolière",
    origen: { tipo: "recalculado", url: CDI, detalle: "Minimum 1 000 000 + 0,7 % × 10 000 000 000 = 71 000 000." },
    fecha: F,
    entrada: { benefice: 100000000, ca: 10000000000, activite: "petrolier" },
    esperado: { minimum: 71000000, impot: 71000000 },
  },
]);
