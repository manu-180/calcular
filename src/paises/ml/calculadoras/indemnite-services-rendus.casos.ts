import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-services-rendus";

export default definirCasos(calculadora, [
  {
    nombre: "Démission après 12 ans",
    origen: { tipo: "recalculado", detalle: "Mêmes bases que l'article L.53 : 285 % ; 570 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 12, mois: 0 },
    esperado: { pourcentage: 285, indemnite: 570000 },
  },
  {
    nombre: "Démission après 9 ans : pas d'indemnité",
    origen: { tipo: "recalculado", detalle: "Article L.54 : au moins dix années de services continus." },
    fecha: "2026-10-27",
    entrada: { salaire: 200000, annees: 9, mois: 11 },
    esperado: { indemnite: 0 },
  },
]);
