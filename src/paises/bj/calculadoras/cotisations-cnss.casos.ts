import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnss";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F sans taux risques professionnels",
    origen: {
      tipo: "recalculado",
      detalle: "Décret n° 94-258 : salarié 3,6 % = 10 800 ; pension employeur 6,4 % = 19 200 ; prestations familiales 9 % = 27 000. Total 57 000.",
    },
    fecha: F,
    entrada: { brut: 300000, tauxRisques: 0 },
    esperado: { salarie: 10800, pensionEmployeur: 19200, prestationsFamiliales: 27000, employeur: 46200, total: 57000 },
  },
  {
    nombre: "500 000 F avec un taux risques professionnels de 2 %",
    origen: { tipo: "recalculado", detalle: "18 000 + 32 000 + 45 000 + 2 % × 500 000 = 10 000. Part employeur 87 000, total 105 000." },
    fecha: F,
    entrada: { brut: 500000, tauxRisques: 2 },
    esperado: { salarie: 18000, risquesProfessionnels: 10000, employeur: 87000, total: 105000 },
  },
  {
    nombre: "Taux risques professionnels hors limites",
    origen: { tipo: "recalculado", detalle: "Saisie refusée au-delà de 20 %." },
    fecha: F,
    entrada: { brut: 300000, tauxRisques: 25 },
    esperaError: true,
  },
]);
