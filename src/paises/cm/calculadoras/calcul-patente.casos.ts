import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-patente";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Moyenne entreprise, 300 millions",
    origen: { tipo: "recalculado", detalle: "Article C 13 : 0,283 % × 300 000 000 = 849 000 F, entre 141 500 et 4 500 000." },
    fecha: F,
    entrada: { chiffreAffaires: 300000000, categorie: "moyenne", nouvelle: false },
    esperado: { brute: 849000, patente: 849000 },
  },
  {
    nombre: "Petite entreprise au minimum",
    origen: { tipo: "recalculado", detalle: "0,494 % × 5 000 000 = 24 700 F, relevé au minimum de 50 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 5000000, categorie: "petite", nouvelle: false },
    esperado: { brute: 24700, patente: 50000 },
  },
  {
    nombre: "Petite entreprise au maximum",
    origen: { tipo: "recalculado", detalle: "0,494 % × 40 000 000 = 197 600 F, plafonné à 140 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 40000000, categorie: "petite", nouvelle: false },
    esperado: { patente: 140000 },
  },
  {
    nombre: "Grande entreprise, 10 milliards",
    origen: { tipo: "recalculado", detalle: "0,159 % × 10 000 000 000 = 15 900 000 F." },
    fecha: F,
    entrada: { chiffreAffaires: 10000000000, categorie: "grande", nouvelle: false },
    esperado: { patente: 15900000 },
  },
  {
    nombre: "Entreprise nouvelle exonérée",
    origen: { tipo: "recalculado", detalle: "Article C 12 : exonération de douze mois." },
    fecha: F,
    entrada: { chiffreAffaires: 300000000, categorie: "moyenne", nouvelle: true },
    esperado: { patente: 0 },
  },
]);
