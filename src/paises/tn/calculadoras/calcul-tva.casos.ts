import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

export default definirCasos(calculadora, [
  {
    nombre: "19 % ajoutée à 100 DT",
    origen: { tipo: "recalculado", detalle: "100 × 19 % = 19 ; TTC 119." },
    fecha: "2026-10-24",
    entrada: { montant: 100, sens: "ajouter", taux: "normal" },
    esperado: { tva: 19, ht: 100, ttc: 119, taux: 19 },
  },
  {
    nombre: "13 % retirée de 113 DT TTC",
    origen: { tipo: "recalculado", detalle: "113 ÷ 1,13 = 100 ; TVA 13." },
    fecha: "2026-10-24",
    entrada: { montant: 113, sens: "retirer", taux: "intermediaire" },
    esperado: { tva: 13, ht: 100, taux: 13 },
  },
  {
    nombre: "7 % retirée de 50 DT TTC, arrondi au millime",
    origen: { tipo: "recalculado", detalle: "50 ÷ 1,07 = 46,7289... → 46,729 ; TVA 3,271." },
    fecha: "2026-10-24",
    entrada: { montant: 50, sens: "retirer", taux: "reduit" },
    esperado: { ht: 46.729, tva: 3.271, ttc: 50 },
  },
]);
