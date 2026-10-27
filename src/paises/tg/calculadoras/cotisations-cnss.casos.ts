import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnss";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F bruts",
    origen: {
      tipo: "recalculado",
      detalle: "Travailleur : 4 % = 8 000 et AMU 5 % = 10 000. Employeur : 12,5 % = 25 000, 3 % = 6 000, 2 % = 4 000, AMU 5 % = 10 000. Total 18 000 + 45 000 = 63 000.",
    },
    fecha: F,
    entrada: { brut: 200000 },
    esperado: { totalSalarie: 18000, pensionEmployeur: 25000, totalEmployeur: 45000, total: 63000 },
  },
  {
    nombre: "Rémunération sous le SMIG",
    origen: {
      tipo: "recalculado",
      detalle: "Assiette 52 500. Travailleur 2 100 + 2 625 = 4 725. Employeur 6 563 + 1 575 + 1 050 + 2 625 = 11 813.",
    },
    fecha: F,
    entrada: { brut: 40000 },
    esperado: { assiette: 52500, totalSalarie: 4725, totalEmployeur: 11813, total: 16538 },
  },
  {
    nombre: "Rémunération nulle",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 0 },
    esperaError: true,
  },
]);
