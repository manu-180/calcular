import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 F HT au taux normal",
    origen: { tipo: "recalculado", detalle: "18 % × 100 000 = 18 000. TTC 118 000." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 100000, taux: "normal" },
    esperado: { taux: 18, tva: 18000, ttc: 118000 },
  },
  {
    nombre: "118 000 F TTC au taux normal",
    origen: { tipo: "recalculado", detalle: "HT 118 000 / 1,18 = 100 000. TVA 18 000." },
    fecha: F,
    entrada: { operation: "ttc-ht", montant: 118000, taux: "normal" },
    esperado: { ht: 100000, tva: 18000 },
  },
  {
    nombre: "Nuit d'hôtel de 25 005 F HT au taux réduit",
    origen: { tipo: "recalculado", detalle: "10 % × 25 005 = 2 500,5, arrondi au franc inférieur : 2 500. TTC 27 505." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 25005, taux: "reduit" },
    esperado: { taux: 10, tva: 2500, ttc: 27505 },
  },
]);
