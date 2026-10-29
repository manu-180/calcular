import { definirCasos } from "@/motor/calculo";
import droitsConservationFonciere from "./droits-conservation-fonciere";

const F = "2026-10-29";

export default definirCasos(droitsConservationFonciere, [
  {
    nombre: "Mutation totale sur un terrain à 10 000 000 F",
    origen: { tipo: "recalculado", detalle: "1 % × 10 000 000 = 100 000." },
    fecha: F,
    entrada: { operation: "mutation-totale", montant: 10000000 },
    esperado: { droit: 100000, taux: 1 },
  },
  {
    nombre: "Immatriculation en zone d'habitat, 8 000 000 F",
    origen: { tipo: "recalculado", detalle: "2 % × 8 000 000 = 160 000." },
    fecha: F,
    entrada: { operation: "immatriculation-habitat", montant: 8000000 },
    esperado: { droit: 160000, taux: 2 },
  },
  {
    nombre: "Immatriculation en zone industrielle, 8 000 000 F",
    origen: { tipo: "recalculado", detalle: "3 % × 8 000 000 = 240 000." },
    fecha: F,
    entrada: { operation: "immatriculation-activite", montant: 8000000 },
    esperado: { droit: 240000, taux: 3 },
  },
  {
    nombre: "Hypothèque de 20 000 000 F",
    origen: { tipo: "recalculado", detalle: "1,5 % × 20 000 000 = 300 000." },
    fecha: F,
    entrada: { operation: "hypotheque", montant: 20000000 },
    esperado: { droit: 300000, taux: 1.5 },
  },
  {
    nombre: "Droit de superficie, mise en valeur de 3 000 000 F",
    origen: { tipo: "recalculado", detalle: "0,5 % × 3 000 000 = 15 000." },
    fecha: F,
    entrada: { operation: "superficie", montant: 3000000 },
    esperado: { droit: 15000, taux: 0.5 },
  },
  {
    nombre: "Mainlevée d'hypothèque",
    origen: { tipo: "recalculado", detalle: "Droit fixe de 50 000 F." },
    fecha: F,
    entrada: { operation: "mainlevee", montant: null },
    esperado: { droit: 50000 },
  },
  {
    nombre: "Certificat de propriété sur imprimé",
    origen: { tipo: "recalculado", detalle: "Droit fixe de 10 000 F." },
    fecha: F,
    entrada: { operation: "certificat", montant: null },
    esperado: { droit: 10000 },
  },
  {
    nombre: "Mutation sans montant",
    origen: { tipo: "recalculado", detalle: "La base est obligatoire pour un droit proportionnel." },
    fecha: F,
    entrada: { operation: "mutation-totale", montant: 0 },
    esperaError: true,
  },
]);
