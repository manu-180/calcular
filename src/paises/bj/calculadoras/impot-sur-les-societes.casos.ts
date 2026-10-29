import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Société commerciale, bénéfice de 30 millions",
    origen: { tipo: "recalculado", detalle: "Art. 46 : 30 % de 30 000 000 = 9 000 000 ; minimum 1 % de 200 000 000 = 2 000 000 ; impôt 9 000 000 + 4 000 de redevance." },
    fecha: F,
    entrada: { benefice: 30000000, produits: 200000000, activite: "general", secteur: "general" },
    esperado: { impot: 9000000, total: 9004000, taux: 30 },
  },
  {
    nombre: "Industrie, bénéfice faible : minimum sur les produits",
    origen: { tipo: "recalculado", detalle: "25 % de 1 000 000 = 250 000 ; 1 % de 100 000 000 = 1 000 000 ; art. 47 : minimum retenu 1 000 000, plus 4 000." },
    fecha: F,
    entrada: { benefice: 1000000, produits: 100000000, activite: "industrie-enseignement", secteur: "general" },
    esperado: { calcule: 250000, minimumProduits: 1000000, impot: 1000000, total: 1004000, minimumApplique: "Oui, le minimum sur les produits encaissables s'applique." },
  },
  {
    nombre: "Petite société déficitaire : plancher de 250 000 F",
    origen: { tipo: "recalculado", detalle: "Art. 47, paragraphe 3 : 1 % de 5 000 000 = 50 000, relevé à 250 000 ; plus 4 000." },
    fecha: F,
    entrada: { benefice: 0, produits: 5000000, activite: "general", secteur: "general" },
    esperado: { impot: 250000, total: 254000, minimumApplique: "Oui, le plancher de 250 000 F s'applique." },
  },
  {
    nombre: "BTP : minimum de 3 %",
    origen: { tipo: "recalculado", detalle: "3 % de 100 000 000 = 3 000 000 ; 30 % de 2 000 000 = 600 000 ; minimum retenu." },
    fecha: F,
    entrada: { benefice: 2000000, produits: 100000000, activite: "general", secteur: "btp" },
    esperado: { impot: 3000000, minimumProduits: 3000000 },
  },
]);
