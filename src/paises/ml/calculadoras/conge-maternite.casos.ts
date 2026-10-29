import { definirCasos } from "@/motor/calculo";
import calculadora from "./conge-maternite";

export default definirCasos(calculadora, [
  {
    nombre: "Terme au 15 décembre 2026",
    origen: { tipo: "recalculado", detalle: "6 semaines avant : 3 novembre 2026 ; 14 semaines (98 jours) : jusqu'au 8 février 2027 inclus." },
    fecha: "2026-10-27",
    entrada: { terme: "2026-12-15", maladie: false },
    esperado: { debut: "2026-11-03", fin: "2027-02-08", semaines: 14 },
  },
  {
    nombre: "Avec prolongation pour maladie",
    origen: { tipo: "recalculado", detalle: "17 semaines (119 jours) depuis le 3 novembre 2026 : jusqu'au 1er mars 2027." },
    fecha: "2026-10-27",
    entrada: { terme: "2026-12-15", maladie: true },
    esperado: { debut: "2026-11-03", fin: "2027-03-01", semaines: 17 },
  },
]);
