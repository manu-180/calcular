import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-impot-sur-le-revenu";

export default definirCasos(calculadora, [
  {
    nombre: "Marié, 2 enfants, conjoint avec revenus, 500 000 par mois",
    origen: { tipo: "recalculado", detalle: "6 000 000 - 900 000 = 5 100 000 ; barème 174 000 + 750 000 + 385 000 = 1 309 000 ; 2,5 parts : 20 % = 261 800, porté au minimum 300 000 ; impôt 1 009 000 ; TRIMF 12 000." },
    fecha: "2026-10-18",
    entrada: { salaire: 500000, situation: "marie", enfants: 2, conjointSansRevenu: false },
    esperado: { mensuel: 84083, annuel: 1009000, trimf: 12000, trimfMensuel: 1000, parts: 2.5, imposable: 5100000, reduction: 300000 },
  },
  {
    nombre: "Célibataire, 1 enfant, 200 000 par mois",
    origen: { tipo: "recalculado", detalle: "2 400 000 - 720 000 = 1 680 000 ; barème 174 000 + 54 000 = 228 000 ; 1,5 part : 10 % = 22 800, porté au minimum 100 000 ; impôt 128 000." },
    fecha: "2026-10-18",
    entrada: { salaire: 200000, situation: "celibataire", enfants: 1, conjointSansRevenu: null },
    esperado: { annuel: 128000, parts: 1.5, imposable: 1680000 },
  },
]);
