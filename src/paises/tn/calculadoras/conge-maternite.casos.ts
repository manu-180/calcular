import { definirCasos } from "@/motor/calculo";
import calculadora from "./conge-maternite";

export default definirCasos(calculadora, [
  {
    nombre: "Naissance le 15 novembre, sans congé postnatal",
    origen: { tipo: "recalculado", detalle: "Loi n° 2024-44 : 15 jours avant, 3 mois après (92 jours), paternité 7 jours dans les 30 jours, allaitement 9 mois après la reprise." },
    fecha: "2026-10-24",
    entrada: { naissance: "2026-11-15", cas: "normal", postnatal: 0 },
    esperado: {
      debutPrenatal: "2026-10-31",
      finNaissance: "2027-02-15",
      reprise: "2027-02-15",
      joursMaternite: 107,
      paternite: 7,
      limitePaternite: "2026-12-15",
      allaitement: "2027-11-15",
    },
  },
  {
    nombre: "Jumeaux le 10 mars, deux mois de congé postnatal",
    origen: { tipo: "recalculado", detalle: "4 mois de naissance + 2 mois postnatal : reprise le 10 septembre ; paternité 10 jours ; allaitement jusqu'au premier anniversaire." },
    fecha: "2026-10-24",
    entrada: { naissance: "2026-03-10", cas: "renforce", postnatal: 2 },
    esperado: { finNaissance: "2026-07-10", reprise: "2026-09-10", joursMaternite: 199, paternite: 10, limitePaternite: "2026-04-09", allaitement: "2027-03-10" },
  },
  {
    nombre: "Enfant mort-né",
    origen: { tipo: "recalculado", detalle: "Un mois de congé pour la mère, trois jours pour le père." },
    fecha: "2026-10-24",
    entrada: { naissance: "2026-06-01", cas: "mort-ne", postnatal: null },
    esperado: { reprise: "2026-07-01", joursMaternite: 45, paternite: 3, allaitement: null },
  },
]);
