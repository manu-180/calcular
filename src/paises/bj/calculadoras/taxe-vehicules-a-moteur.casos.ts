import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-vehicules-a-moteur";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Voiture privée de 9 CV",
    origen: { tipo: "recalculado", detalle: "Art. 168, paragraphe 1 : 8 à 10 CV = 30 000 F." },
    fecha: F,
    entrada: { categorie: "prive", puissancePrive: "8-10", nombre: 1, puissanceSociete: null, places: null, tonnage: null },
    esperado: { total: 30000, parVehicule: 30000 },
  },
  {
    nombre: "Deux voitures d'une société de 12 CV",
    origen: { tipo: "recalculado", detalle: "Art. 168, paragraphe 4 : plus de 7 CV = 200 000 F, deux véhicules = 400 000 F." },
    fecha: F,
    entrada: { categorie: "societe", puissanceSociete: "plus-7", nombre: 2, puissancePrive: null, places: null, tonnage: null },
    esperado: { total: 400000, parVehicule: 200000 },
  },
  {
    nombre: "Camion de 8 tonnes",
    origen: { tipo: "recalculado", detalle: "Art. 168, paragraphe 2 : 5,01 à 10 tonnes = 86 800 F." },
    fecha: F,
    entrada: { categorie: "public-marchandises", tonnage: "5-10", nombre: 1, puissancePrive: null, puissanceSociete: null, places: null },
    esperado: { total: 86800 },
  },
  {
    nombre: "Tricycle",
    origen: { tipo: "recalculado", detalle: "Art. 168, paragraphe 3 : 15 000 F par véhicule à trois roues." },
    fecha: F,
    entrada: { categorie: "trois-roues", nombre: 3, puissancePrive: null, puissanceSociete: null, places: null, tonnage: null },
    esperado: { total: 45000 },
  },
]);
