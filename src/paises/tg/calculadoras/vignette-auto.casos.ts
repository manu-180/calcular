import { definirCasos } from "@/motor/calculo";
import calculadora from "./vignette-auto";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Voiture de 8 à 11 CV",
    origen: { tipo: "recalculado", detalle: "Article 162 : 15 000 F par an." },
    fecha: F,
    entrada: { vehicule: "p", puissance: "8-11", transporteurTpu: false },
    esperado: { montant: 15000 },
  },
  {
    nombre: "Camion de 16 à 20 CV d'un transporteur à la TPU",
    origen: { tipo: "recalculado", detalle: "Article 162 : 50 000 F réduits de 50 %, soit 25 000 F." },
    fecha: F,
    entrada: { vehicule: "m", puissance: "16-20", transporteurTpu: true },
    esperado: { tarif: 50000, reduction: 25000, montant: 25000 },
  },
  {
    nombre: "Motocyclette à trois roues",
    origen: { tipo: "recalculado", detalle: "Article 162 : 40 000 F." },
    fecha: F,
    entrada: { vehicule: "moto-3-roues", puissance: null, transporteurTpu: null },
    esperado: { montant: 40000 },
  },
  {
    nombre: "Voiture de plus de 20 CV",
    origen: { tipo: "recalculado", detalle: "Article 162 : 40 000 F." },
    fecha: F,
    entrada: { vehicule: "p", puissance: "plus-20", transporteurTpu: false },
    esperado: { montant: 40000 },
  },
]);
