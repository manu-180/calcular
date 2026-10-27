import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

export default definirCasos(calculadora, [
  {
    nombre: "Payé au mois",
    origen: { tipo: "recalculado", detalle: "Article L.41 : 1 mois ; indemnité 150 000." },
    fecha: "2026-10-27",
    entrada: { categorie: "mensuel", salaire: 150000 },
    esperado: { mois: 1, jours: 0, duree: "1 mois", indemnite: 150000 },
  },
  {
    nombre: "Payé à la journée",
    origen: { tipo: "recalculado", detalle: "8 jours ; 150 000 / 30 × 8 = 40 000." },
    fecha: "2026-10-27",
    entrada: { categorie: "journalier", salaire: 150000 },
    esperado: { jours: 8, duree: "8 jours", indemnite: 40000 },
  },
  {
    nombre: "Agent de maîtrise",
    origen: { tipo: "recalculado", detalle: "2 mois." },
    fecha: "2026-10-27",
    entrada: { categorie: "maitrise", salaire: 300000 },
    esperado: { mois: 2, indemnite: 600000 },
  },
  {
    nombre: "Cadre",
    origen: { tipo: "recalculado", detalle: "3 mois ; 3 × 500 000 = 1 500 000." },
    fecha: "2026-10-27",
    entrada: { categorie: "cadre", salaire: 500000 },
    esperado: { mois: 3, duree: "3 mois", indemnite: 1500000 },
  },
]);
