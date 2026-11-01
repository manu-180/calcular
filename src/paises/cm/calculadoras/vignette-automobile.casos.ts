import { definirCasos } from "@/motor/calculo";
import calculadora from "./vignette-automobile";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Voiture de 8 CV",
    origen: { tipo: "recalculado", detalle: "Article 597, B : de 8 à 13 CV, 50 000 F." },
    fecha: F,
    entrada: { type: "autre", cv: 8 },
    esperado: { droit: 50000 },
  },
  {
    nombre: "Voiture de 7 CV",
    origen: { tipo: "recalculado", detalle: "Article 597, B : de 2 à 7 CV, 30 000 F." },
    fecha: F,
    entrada: { type: "autre", cv: 7 },
    esperado: { droit: 30000 },
  },
  {
    nombre: "4x4 de 22 CV",
    origen: { tipo: "recalculado", detalle: "Article 597, B : plus de 20 CV, 200 000 F." },
    fecha: F,
    entrada: { type: "autre", cv: 22 },
    esperado: { droit: 200000 },
  },
  {
    nombre: "Car de transport de 16 CV",
    origen: { tipo: "recalculado", detalle: "Article 597, A : de 14 à 20 CV, 50 000 F." },
    fecha: F,
    entrada: { type: "transport", cv: 16 },
    esperado: { droit: 50000 },
  },
  {
    nombre: "Moto à deux roues de 1 CV",
    origen: { tipo: "recalculado", detalle: "Article 598 ter : 10 000 F." },
    fecha: F,
    entrada: { type: "moto-2-roues", cv: 1 },
    esperado: { droit: 10000 },
  },
  {
    nombre: "Moto de 3 CV : tarif des véhicules",
    origen: { tipo: "recalculado", detalle: "Article 598 quinquies : 2 CV ou plus, tarif des véhicules, 30 000 F." },
    fecha: F,
    entrada: { type: "moto-2-roues", cv: 3 },
    esperado: { droit: 30000 },
  },
]);
