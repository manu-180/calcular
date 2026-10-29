import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

export default definirCasos(calculadora, [
  {
    nombre: "45 000 F en 2026",
    origen: { tipo: "recalculado", detalle: "Décret n° 2022-692 : SMIG de 52 000 F depuis le 1er janvier 2023. Manque 7 000 F." },
    fecha: "2026-10-27",
    entrada: { salaire: 45000 },
    esperado: { smig: 52000, manque: 7000, enSmig: 0.87, smigAnnuel: 624000, verdict: "Le salaire est inférieur au SMIG." },
  },
  {
    nombre: "Le 1er janvier 2023, jour du relèvement",
    origen: { tipo: "recalculado", detalle: "52 000 F atteint exactement le nouveau SMIG." },
    fecha: "2023-01-01",
    entrada: { salaire: 52000 },
    esperado: { manque: 0, enSmig: 1, verdict: "Le salaire atteint au moins le SMIG." },
  },
]);
