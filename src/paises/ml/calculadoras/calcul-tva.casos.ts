import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 F HT au taux normal",
    origen: { tipo: "recalculado", detalle: "100 000 × 18 % = 18 000 ; TTC 118 000." },
    fecha: "2026-10-27",
    entrada: { sens: "ht", montant: 100000, taux: "normal" },
    esperado: { tva: 18000, ttc: 118000, taux: 18 },
  },
  {
    nombre: "118 000 F TTC au taux normal",
    origen: { tipo: "recalculado", detalle: "118 000 / 1,18 = 100 000 HT ; TVA 18 000." },
    fecha: "2026-10-27",
    entrada: { sens: "ttc", montant: 118000, taux: "normal" },
    esperado: { ht: 100000, tva: 18000 },
  },
  {
    nombre: "Ordinateur au taux réduit",
    origen: { tipo: "recalculado", detalle: "300 000 × 5 % = 15 000 ; TTC 315 000." },
    fecha: "2026-10-27",
    entrada: { sens: "ht", montant: 300000, taux: "reduit" },
    esperado: { tva: 15000, ttc: 315000, taux: 5 },
  },
]);
