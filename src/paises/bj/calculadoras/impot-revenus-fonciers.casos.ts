import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-revenus-fonciers";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "150 000 F par mois sans retenue",
    origen: { tipo: "recalculado", detalle: "Art. 103 et 104 : loyers 1 800 000 ; impôt 12 % = 216 000 ; redevance 4 000 ; reste 220 000." },
    fecha: F,
    entrada: { loyer: 150000, mois: 12, retenue: "aucune" },
    esperado: { brut: 1800000, impot: 216000, du: 220000, netProprietaire: 1580000 },
  },
  {
    nombre: "Loyer retenu à 12 % par le locataire",
    origen: { tipo: "recalculado", detalle: "Art. 106 : retenue 12 % de 1 800 000 = 216 000, imputée sur l'impôt ; reste la redevance de 4 000." },
    fecha: F,
    entrada: { loyer: 150000, mois: 12, retenue: "general" },
    esperado: { retenue: 216000, du: 4000 },
  },
  {
    nombre: "Bailleur société, retenue à 10 %, 6 mois",
    origen: { tipo: "recalculado", detalle: "Loyers 6 × 400 000 = 2 400 000 ; impôt 288 000 ; retenue 10 % = 240 000 ; reste 288 000 + 4 000 - 240 000 = 52 000." },
    fecha: F,
    entrada: { loyer: 400000, mois: 6, retenue: "bailleur-entreprise" },
    esperado: { brut: 2400000, impot: 288000, retenue: 240000, du: 52000 },
  },
]);
