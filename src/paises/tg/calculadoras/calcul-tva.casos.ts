import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 000 F HT",
    origen: { tipo: "recalculado", detalle: "18 % de 100 000 = 18 000 ; TTC 118 000." },
    fecha: F,
    entrada: { operation: "ht-ttc", montant: 100000 },
    esperado: { taux: 18, tva: 18000, ttc: 118000 },
  },
  {
    nombre: "59 000 F TTC",
    origen: { tipo: "recalculado", detalle: "59 000 ÷ 1,18 = 50 000 HT ; TVA 9 000." },
    fecha: F,
    entrada: { operation: "ttc-ht", montant: 59000 },
    esperado: { ht: 50000, tva: 9000 },
  },
]);
