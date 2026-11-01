import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "45 000 F pour 40 heures",
    origen: { tipo: "recalculado", detalle: "À la durée légale, le minimum est le SMIG mensuel : 45 000. Salaire horaire 45 000 / 173,33 = 259,62 F." },
    fecha: F,
    entrada: { salaire: 45000, heures: 40 },
    esperado: { horaire: 259.62, minimumDu: 45000, manque: 0, verdict: "Le salaire atteint au moins le SMIG." },
  },
  {
    nombre: "40 000 F pour 40 heures",
    origen: { tipo: "recalculado", detalle: "Minimum 45 000 pour 40 heures. Il manque 5 000 F." },
    fecha: F,
    entrada: { salaire: 40000, heures: 40 },
    esperado: { manque: 5000, verdict: "Le salaire est inférieur au SMIG." },
  },
  {
    nombre: "Temps partiel : 25 000 F pour 20 heures",
    origen: { tipo: "recalculado", detalle: "Minimum 45 000 × 20 / 40 = 22 500. 20 × 52 / 12 = 86,67 heures ; 25 000 / 86,67 = 288,46 F de l'heure." },
    fecha: F,
    entrada: { salaire: 25000, heures: 20 },
    esperado: { minimumDu: 22500, horaire: 288.46, manque: 0 },
  },
]);
