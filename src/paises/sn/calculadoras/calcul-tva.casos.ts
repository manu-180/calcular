import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 HT au taux normal",
    origen: { tipo: "recalculado", detalle: "100 000 × 18 % = 18 000." },
    fecha: "2026-10-18",
    entrada: { operation: "ajouter", montant: 100000, taux: "normal" },
    esperado: { ttc: 118000, ht: 100000, tva: 18000 },
  },
  {
    nombre: "118 000 TTC au taux normal",
    origen: { tipo: "recalculado", detalle: "118 000 / 1,18 = 100 000." },
    fecha: "2026-10-18",
    entrada: { operation: "retirer", montant: 118000, taux: "normal" },
    esperado: { ht: 100000, tva: 18000 },
  },
]);
