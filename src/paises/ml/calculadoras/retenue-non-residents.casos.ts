import { definirCasos } from "@/motor/calculo";
import calculadora from "./retenue-non-residents";

export default definirCasos(calculadora, [
  {
    nombre: "Prestation d'assistance technique de 10 millions",
    origen: { tipo: "recalculado", detalle: "Déduction de 50 % : base 5 000 000 × 30 % = 1 500 000, soit 15 % du brut." },
    fecha: "2026-10-27",
    entrada: {"montant": 10000000, "nature": "prestations"},
    esperado: {"base": 5000000, "retenue": 1500000, "tauxEffectif": 15},
  },
  {
    nombre: "Marché de fournitures de 10 millions",
    origen: { tipo: "recalculado", detalle: "Déduction de 90 % : base 1 000 000 × 30 % = 300 000, soit 3 %." },
    fecha: "2026-10-27",
    entrada: {"montant": 10000000, "nature": "marches"},
    esperado: {"retenue": 300000, "tauxEffectif": 3},
  },
]);
