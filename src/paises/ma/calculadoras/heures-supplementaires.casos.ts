import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

const CT = "https://adala.justice.gov.ma/api/uploads/2024/04/30/code%20du%20travail-1714463246806.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "6 000 DH, 4 heures de jour et 2 heures de nuit",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "Horaire 6 000 × 12 ÷ 2 288 = 31,47. Jour : 4 × 31,47 = 125,88 + 25 % = 31,47. Nuit : 2 × 31,47 = 62,94 + 50 % = 31,47. Total 251,76.",
    },
    fecha: "2026-10-16",
    entrada: { mensuel: 6000, jour: 4, nuit: 2, reposJour: 0, reposNuit: 0 },
    esperado: { horaire: 31.47, base: 188.82, majoration: 62.94, total: 251.76 },
  },
  {
    nombre: "Jour de repos : 50 % de jour, 100 % de nuit",
    origen: { tipo: "recalculado", url: CT, detalle: "Horaire 31,47. Repos jour 2 h : 62,94 + 31,47. Repos nuit 1 h : 31,47 + 31,47. Total 157,35." },
    fecha: "2026-10-16",
    entrada: { mensuel: 6000, jour: 0, nuit: 0, reposJour: 2, reposNuit: 1 },
    esperado: { majoration: 62.94, total: 157.35 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-16",
    entrada: { mensuel: 0, jour: 1, nuit: 0, reposJour: 0, reposNuit: 0 },
    esperaError: true,
  },
]);
