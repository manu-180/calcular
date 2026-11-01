import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-general-synthetique";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "8 000 000 F de chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "Article C 40 : de 5 à 10 millions, 300 000 F par an, soit 75 000 F par trimestre." },
    fecha: F,
    entrada: { chiffreAffaires: 8000000, activite: "commercial", cga: false },
    esperado: { tarif: 300000, igs: 300000, trimestre: 75000 },
  },
  {
    nombre: "15 000 000 F avec un centre de gestion agréé",
    origen: { tipo: "recalculado", detalle: "Tranche de 10 à 20 millions : 500 000 F, réduits de moitié = 250 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 15000000, activite: "commercial", cga: true },
    esperado: { tarif: 500000, reduction: 250000, igs: 250000 },
  },
  {
    nombre: "Borne : 500 000 F exactement",
    origen: { tipo: "recalculado", detalle: "« Égal ou supérieur à 500 mille et inférieur à 1 million » : 30 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 500000, activite: "commercial", cga: false },
    esperado: { igs: 30000 },
  },
  {
    nombre: "Chiffre d'affaires nul",
    origen: { tipo: "recalculado", detalle: "Inférieur à 500 000 F : 20 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 0, activite: "commercial", cga: false },
    esperado: { igs: 20000 },
  },
  {
    nombre: "Profession libérale à 30 000 000 F : régime du réel",
    origen: { tipo: "recalculado", detalle: "Article C 39 : seuil de 30 millions pour les professions libérales." },
    fecha: F,
    entrada: { chiffreAffaires: 30000000, activite: "liberal", cga: false },
    esperado: { igs: null, tarif: null },
  },
]);
