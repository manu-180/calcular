import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Sept ans de présence, 300 000 F",
    origen: { tipo: "recalculado", detalle: "5 × 35 % + 2 × 40 % = 255 % ; 300 000 × 2,55 = 765 000." },
    fecha: F,
    entrada: { salaire: 300000, annees: 7, mois: 0, motif: "personnel" },
    esperado: { pourcentage: 255, indemnite: 765000, total: 765000 },
  },
  {
    nombre: "Douze ans de présence et quatre mois",
    origen: { tipo: "recalculado", detalle: "5 × 35 % + 5 × 40 % + 2 × 45 % = 465 % ; 300 000 × 4,65 = 1 395 000. Les mois ne comptent pas." },
    fecha: F,
    entrada: { salaire: 300000, annees: 12, mois: 4, motif: "personnel" },
    esperado: { pourcentage: 465, indemnite: 1395000 },
  },
  {
    nombre: "Licenciement économique après trois ans",
    origen: { tipo: "recalculado", detalle: "3 × 35 % = 105 % : 315 000, plus un mois de salaire (300 000) : 615 000." },
    fecha: F,
    entrada: { salaire: 300000, annees: 3, mois: 0, motif: "economique" },
    esperado: { indemnite: 315000, accompagnement: 300000, total: 615000 },
  },
  {
    nombre: "Onze mois d'ancienneté",
    origen: { tipo: "recalculado", detalle: "Moins de 12 mois : pas d'indemnité." },
    fecha: F,
    entrada: { salaire: 300000, annees: 0, mois: 11, motif: "personnel" },
    esperado: { indemnite: 0, total: 0 },
  },
  {
    nombre: "Faute grave",
    origen: { tipo: "recalculado", detalle: "Article 97 : pas d'indemnité en cas de faute grave ou lourde." },
    fecha: F,
    entrada: { salaire: 300000, annees: 9, mois: 0, motif: "faute" },
    esperado: { indemnite: 0, total: 0 },
  },
]);
