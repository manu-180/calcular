import { definirCasos } from "@/motor/calculo";
import calculadora from "./smig";

export default definirCasos(calculadora, [
  {
    nombre: "SMIG general, 40 horas",
    origen: {
      tipo: "recalculado",
      detalle: "Decreto 2026-064: 28,846 MRU la hora. 28,846 x 40 x 52 / 12 = 4.999,97 por mes. 8 horas = 230,77.",
    },
    fecha: "2026-10-29",
    entrada: { secteur: "general", heures: 40, salaire: null },
    esperado: { horaire: 28.846, mensuel: 4999.97, journalier: 230.77, hebdomadaire: 1153.84 },
  },
  {
    nombre: "Agrícola con sueldo por debajo",
    origen: { tipo: "recalculado", detalle: "25 MRU la hora x 40 x 52 / 12 = 4.333,33. Sueldo 4.000: diferencia -333,33." },
    fecha: "2026-10-29",
    entrada: { secteur: "agricole", heures: 40, salaire: 4000 },
    esperado: { mensuel: 4333.33, ecart: -333.33 },
  },
  {
    nombre: "Media jornada",
    origen: { tipo: "recalculado", detalle: "28,846 x 20 x 52 / 12 = 2.499,99." },
    fecha: "2026-10-29",
    entrada: { secteur: "general", heures: 20, salaire: null },
    esperado: { mensuel: 2499.99 },
  },
  {
    nombre: "Fórmula con otro valor horario",
    origen: { tipo: "recalculado", detalle: "Con valores dados: 20 x 40 x 52 / 12 = 3.466,67." },
    fecha: "2026-10-29",
    entrada: { secteur: "general", heures: 40, salaire: null },
    valores: { "mr.smig-horaire": 20 },
    esperado: { mensuel: 3466.67 },
  },
]);
