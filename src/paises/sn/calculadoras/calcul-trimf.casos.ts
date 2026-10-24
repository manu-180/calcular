import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-trimf";

export default definirCasos(calculadora, [
  {
    nombre: "Salaire de 300 000 par mois",
    origen: { tipo: "recalculado", detalle: "3 600 000 par an, tranche de 2 000 000 à 6 999 999 : 12 000." },
    fecha: "2026-10-18",
    entrada: { salaire: 300000 },
    esperado: { annuel: 12000, mensuel: 1000 },
  },
]);
