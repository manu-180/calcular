import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

export default definirCasos(calculadora, [
  {
    nombre: "35 000 F en 2026",
    origen: { tipo: "recalculado", detalle: "SMIG de 40 000 F depuis le 1er janvier 2016 : écart de −5 000." },
    fecha: "2026-10-27",
    entrada: { salaire: 35000, heures: 0 },
    esperado: { minimum: 40000, ecart: -5000, verdict: "Inférieur au SMIG" },
  },
  {
    nombre: "35 000 F en 2015",
    origen: { tipo: "recalculado", detalle: "Le SMIG était de 35 000 F en 2015." },
    fecha: "2015-12-31",
    entrada: { salaire: 35000, heures: 0 },
    esperado: { minimum: 35000, ecart: 0, verdict: "Au moins égal au SMIG" },
  },
  {
    nombre: "Temps partiel de 80 heures",
    origen: { tipo: "recalculado", detalle: "230,77 × 80 = 18 461,6, arrondi à 18 462." },
    fecha: "2026-10-27",
    entrada: { salaire: 20000, heures: 80 },
    esperado: { minimum: 18462, ecart: 1538, horaire: 230.77 },
  },
]);
