import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

export default definirCasos(calculadora, [
  {
    nombre: "20 % ajoutée à 1 000 DH",
    origen: { tipo: "recalculado", detalle: "1 000 × 20 % = 200 ; TTC 1 200." },
    fecha: "2026-10-16",
    entrada: { montant: 1000, sens: "ajouter", taux: "normal" },
    esperado: { tva: 200, ht: 1000, ttc: 1200, taux: 20 },
  },
  {
    nombre: "10 % retirée de 550 DH TTC",
    origen: { tipo: "recalculado", detalle: "550 / 1,10 = 500 ; TVA 50." },
    fecha: "2026-10-16",
    entrada: { montant: 550, sens: "retirer", taux: "reduit" },
    esperado: { tva: 50, ht: 500, ttc: 550, taux: 10 },
  },
  {
    nombre: "20 % retirée de 1 999 DH TTC",
    origen: { tipo: "recalculado", detalle: "1 999 / 1,20 = 1 665,8333 → 1 665,83 ; TVA 333,17." },
    fecha: "2026-10-16",
    entrada: { montant: 1999, sens: "retirer", taux: "normal" },
    esperado: { ht: 1665.83, tva: 333.17 },
  },
]);
