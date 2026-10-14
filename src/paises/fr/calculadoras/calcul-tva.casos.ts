import { definirCasos } from "@/motor/calculo";
import calculTva from "./calcul-tva";

export default definirCasos(calculTva, [
  {
    nombre: "100 € HT au taux normal",
    origen: { tipo: "recalculado", detalle: "100 × 20 % = 20 ; TTC 120." },
    fecha: "2026-10-14",
    entrada: { operation: "ht-ttc", montant: 100, taux: "normal" },
    esperado: { taux: 20, ht: 100, tva: 20, ttc: 120 },
  },
  {
    nombre: "120 € TTC au taux normal",
    origen: { tipo: "recalculado", detalle: "120 ÷ 1,20 = 100 HT ; TVA 20." },
    fecha: "2026-10-14",
    entrada: { operation: "ttc-ht", montant: 120, taux: "normal" },
    esperado: { ht: 100, tva: 20 },
  },
  {
    nombre: "Restaurant à 10 %",
    origen: { tipo: "recalculado", detalle: "45 € TTC ÷ 1,10 = 40,909 → 40,91 HT ; TVA 4,09." },
    fecha: "2026-10-14",
    entrada: { operation: "ttc-ht", montant: 45, taux: "intermediaire" },
    esperado: { taux: 10, ht: 40.91, tva: 4.09, ttc: 45 },
  },
  {
    nombre: "Alimentation à 5,5 %",
    origen: { tipo: "recalculado", detalle: "80 × 5,5 % = 4,40 ; TTC 84,40." },
    fecha: "2026-10-14",
    entrada: { operation: "ht-ttc", montant: 80, taux: "reduit" },
    esperado: { taux: 5.5, tva: 4.4, ttc: 84.4 },
  },
  {
    nombre: "Médicament remboursé à 2,1 %",
    origen: { tipo: "recalculado", detalle: "10,21 TTC ÷ 1,021 = 10,00 HT ; TVA 0,21." },
    fecha: "2026-10-14",
    entrada: { operation: "ttc-ht", montant: 10.21, taux: "particulier" },
    esperado: { taux: 2.1, ht: 10, tva: 0.21 },
  },
  {
    nombre: "Prix négatif",
    origen: { tipo: "recalculado", detalle: "Un prix négatif n'a pas de sens." },
    fecha: "2026-10-14",
    entrada: { operation: "ht-ttc", montant: -5, taux: "normal" },
    esperaError: true,
  },
]);
