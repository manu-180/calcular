import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

export default definirCasos(calculadora, [
  {
    nombre: "Adulte, année complète : plafond de 15 jours",
    origen: { tipo: "recalculado", detalle: "12 × 1 = 12 jours, sous le plafond de 15." },
    fecha: "2026-10-24",
    entrada: { mois: 12, age: "adulte" },
    esperado: { jours: 12 },
  },
  {
    nombre: "Moins de 18 ans, année complète",
    origen: { tipo: "recalculado", detalle: "12 × 2 = 24 jours, sous le plafond de 30." },
    fecha: "2026-10-24",
    entrada: { mois: 12, age: "mineur" },
    esperado: { jours: 24 },
  },
  {
    nombre: "De 18 à 20 ans, 6 mois",
    origen: { tipo: "recalculado", detalle: "6 × 1,5 = 9 jours." },
    fecha: "2026-10-24",
    entrada: { mois: 6, age: "jeune" },
    esperado: { jours: 9 },
  },
]);
