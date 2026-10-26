import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

export default definirCasos(calculadora, [
  {
    nombre: "Salaire de 60 000 F, sous le SMIG",
    origen: { tipo: "recalculado", detalle: "SMIG 75 000 depuis le 1er janvier 2023. Il manque 15 000 F, soit 0,8 SMIG." },
    fecha: "2026-10-23",
    entrada: { salaire: 60000 },
    esperado: { smig: 75000, manque: 15000, enSmig: 0.8, smigAnnuel: 900000, verdict: "Le salaire est inférieur au SMIG." },
  },
  {
    nombre: "Salaire égal au SMIG",
    origen: { tipo: "recalculado", detalle: "75 000 = 1 SMIG." },
    fecha: "2023-01-01",
    entrada: { salaire: 75000 },
    esperado: { manque: 0, enSmig: 1, verdict: "Le salaire atteint au moins le SMIG." },
  },
]);
