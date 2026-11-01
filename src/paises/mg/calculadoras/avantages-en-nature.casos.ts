import { definirCasos } from "@/motor/calculo";
import calculadora from "./avantages-en-nature";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";
const base = { remunerationFixe: 2000000, loyer: 0, vehicule: 0, telephone: 0, autres: 0, retenues: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "Logement à 800 000 Ar et voiture à 600 000 Ar de frais",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 01.03.08 : logement 50 % × 800 000 = 400 000 (plafond 25 % × 2 000 000 = 500 000). Véhicule 15 % × 600 000 = 90 000. Total 490 000." },
    fecha: F,
    entrada: { ...base, loyer: 800000, vehicule: 600000 },
    esperado: { logement: 400000, vehicule: 90000, total: 490000 },
  },
  {
    nombre: "Logement plafonné à 25 % de la rémunération fixe",
    origen: { tipo: "recalculado", url: CDI, detalle: "50 % × 1 500 000 = 750 000, plafonné à 25 % × 2 000 000 = 500 000. Téléphone 15 % × 100 000 = 15 000. Total 515 000." },
    fecha: F,
    entrada: { ...base, loyer: 1500000, telephone: 100000 },
    esperado: { logement: 500000, telephone: 15000, total: 515000 },
  },
  {
    nombre: "Retenue sur salaire pour le logement",
    origen: { tipo: "recalculado", url: CDI, detalle: "400 000 − 100 000 de retenue = 300 000." },
    fecha: F,
    entrada: { ...base, loyer: 800000, retenues: 100000 },
    esperado: { total: 300000 },
  },
]);
