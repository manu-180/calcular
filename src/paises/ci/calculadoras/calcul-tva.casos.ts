import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-23";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 F HT au taux de 18 %",
    origen: { tipo: "recalculado", detalle: "100 000 × 18 % = 18 000. TTC 118 000." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 100000, taux: "normal" },
    esperado: { taux: 18, tva: 18000, ttc: 118000 },
  },
  {
    nombre: "118 000 F TTC vers HT",
    origen: { tipo: "recalculado", detalle: "118 000 / 1,18 = 100 000. TVA 18 000." },
    fecha: F,
    entrada: { operation: "ttc-ht", montant: 118000, taux: "normal" },
    esperado: { ht: 100000, tva: 18000 },
  },
  {
    nombre: "100 000 F HT au taux réduit de 9 %",
    origen: { tipo: "recalculado", detalle: "100 000 × 9 % = 9 000." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 100000, taux: "reduit" },
    esperado: { taux: 9, tva: 9000, ttc: 109000 },
  },
]);
