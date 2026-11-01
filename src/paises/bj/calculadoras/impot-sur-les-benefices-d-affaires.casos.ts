import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-benefices-d-affaires";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Entreprise individuelle, bénéfice de 8 millions",
    origen: { tipo: "recalculado", detalle: "Art. 63 : 30 % de 8 000 000 = 2 400 000 ; minimum 1,5 % de 60 000 000 = 900 000 ; impôt 2 400 000 plus 4 000." },
    fecha: F,
    entrada: { benefice: 8000000, produits: 60000000, activite: "general", secteur: "general" },
    esperado: { calcule: 2400000, minimumProduits: 900000, impot: 2400000, total: 2404000 },
  },
  {
    nombre: "Bénéfice faible : minimum de 1,5 %",
    origen: { tipo: "recalculado", detalle: "30 % de 500 000 = 150 000 ; 1,5 % de 40 000 000 = 600 000 ; art. 64 : minimum retenu." },
    fecha: F,
    entrada: { benefice: 500000, produits: 40000000, activite: "general", secteur: "general" },
    esperado: { impot: 600000, total: 604000, minimumApplique: "Oui, le minimum sur les produits encaissables s'applique." },
  },
  {
    nombre: "École privée sans bénéfice",
    origen: { tipo: "recalculado", detalle: "1,5 % de 10 000 000 = 150 000, relevé au plancher de 250 000 (art. 64, paragraphe 3 a) ; taux enseignement 25 %." },
    fecha: F,
    entrada: { benefice: 0, produits: 10000000, activite: "enseignement", secteur: "general" },
    esperado: { impot: 250000, taux: 25, total: 254000 },
  },
]);
