import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Salaire de 50 000 F",
    origen: { tipo: "recalculado", detalle: "SMIG 52 500 F : il manque 2 500 F. Horaire 52 500 × 12 ÷ 52 ÷ 40 = 302,88 F." },
    fecha: F,
    entrada: { salaire: 50000 },
    esperado: { smig: 52500, manque: 2500, horaire: 302.88, smigAnnuel: 630000, enSmig: 0.95, verdict: "Le salaire est inférieur au SMIG." },
  },
  {
    nombre: "Salaire de 105 000 F",
    origen: { tipo: "recalculado", detalle: "105 000 ÷ 52 500 = 2 SMIG." },
    fecha: F,
    entrada: { salaire: 105000 },
    esperado: { manque: 0, enSmig: 2, verdict: "Le salaire atteint au moins le SMIG." },
  },
]);
